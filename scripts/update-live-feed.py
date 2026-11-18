"""Fetch the latest RL, World-Model, Reasoning, Agentic, and Embodied VLA papers from public APIs into assets/live-feed.json."""
from __future__ import annotations

import datetime as dt
import json
import re
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "assets" / "live-feed.json"
USER_AGENT = "DeepRLAtlas-AutoUpdater/2.0 (+https://tigerneil.github.io/awesome-deep-rl/)"

RL_TERMS = re.compile(
    r"\b(reinforcement learning|policy gradient|actor-critic|ppo|grpo|rlhf|rlaif|dpo|"
    r"q-learning|td-learning|markov decision|reward model|reward shaping|bellman|"
    r"offline rl|online rl|residual rl|policy optimization|advantage estimation|"
    r"preference optimization|post-training|trial-and-error|verifiable reward|rlvr)\b",
    re.I,
)
EMBODIED_TERMS = re.compile(
    r"\b(robot|robotic|robotics|embodied|manipulation|locomotion|humanoid|"
    r"dexterous|quadruped|bimanual|gripper|visuomotor|sim-to-real|"
    r"vision-language-action|vla|teleoperation|end-effector|"
    r"autonomous driving|aerial vehicle|uav|legged|physical ai|3d environments)\b",
    re.I,
)
AGENT_TERMS = re.compile(
    r"\b(agentic|llm agent|language agent|multi-agent|tool use|tool-use|"
    r"web agent|webrl|web task|gui agent|coding agent|software agent|"
    r"search agent|multi-turn reinforcement learning|reasoning agent|"
    r"agent workflow|computer use|repository-level)\b",
    re.I,
)
WEB_ONLY_TERMS = re.compile(r"\b(web agent|webrl|web task|browser|gui agent|coding agent|software agent)\b", re.I)
VLA_OR_WM_TERMS = re.compile(
    r"\b(vision-language-action|vla|world model|world simulation|embodied benchmark|"
    r"robotic manipulation|physical ai|embodied navigation|sim-to-real)\b",
    re.I,
)
REASONING_LLM_TERMS = re.compile(
    r"\b(grpo|rlhf|dpo|preference optimization|verifiable reward|rlvr|chain-of-thought|"
    r"reasoning model|language model post-training|math reasoning)\b",
    re.I,
)
WORLD_TERMS = re.compile(r"\b(world model|model-based|muzero|dreamer|tree search|mcts|latent dynamics)\b", re.I)
OFFLINE_FLOW_TERMS = re.compile(
    r"\b(offline reinforcement|diffusion policy|flow matching|decision transformer|in-sample|conservative q)\b",
    re.I,
)
MARL_TERMS = re.compile(r"\b(multi-agent|multiagent|nash|equilibrium|cooperative game|zero-sum)\b", re.I)

VENUE_RE = re.compile(
    r"\b(NeurIPS\s*202[56](?:\s+(?:Spotlight|Oral))?|"
    r"ICML\s*202[56](?:\s+(?:Spotlight|Oral))?|"
    r"ICLR\s*202[56](?:\s+(?:Spotlight|Oral))?|"
    r"CoRL\s*202[56](?:\s+Oral)?|"
    r"RSS\s*202[56]|CVPR\s*202[56]|"
    r"IJCAI\s*202[56]|IROS\s*202[56]|"
    r"AAAI\s*202[56](?:\s+Oral)?)\b",
    re.I,
)


def extract_venue(text: str) -> str:
    if re.search(r"workshop|symposium", text, re.I):
        return ""
    m = VENUE_RE.search(text or "")
    if not m:
        return ""
    raw = re.sub(r"\s+", " ", m.group(1)).upper()
    return (
        raw.replace("NEURIPS", "NeurIPS")
        .replace("CORL", "CoRL")
        .replace("SPOTLIGHT", "Spotlight")
        .replace("ORAL", "Oral")
    )


def norm_title(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", title.lower())


def load_existing_curated() -> tuple[set[str], set[str], str]:
    arxiv_ids: set[str] = set()
    titles: set[str] = set()
    latest_date = "2026-11-17"
    for md in ROOT.glob("*.md"):
        text = md.read_text(encoding="utf-8", errors="ignore")
        for match in re.findall(r"\b(\d{4}\.\d{4,5})\b", text):
            arxiv_ids.add(match)
        for dmatch in re.findall(r"\b(202[0-9]-\d{2}-\d{2})\b", text):
            if dmatch > latest_date:
                latest_date = dmatch
        first_line = text.splitlines()[0] if text.splitlines() else ""
        if first_line.startswith("# "):
            titles.add(norm_title(first_line[2:]))
    return arxiv_ids, titles, latest_date


def classify_paper(title: str, summary: str, keywords: list[str], venue: str = "") -> tuple[str, str] | None:
    """Return (category, domain_slug) or None if not a relevant RL / Embodied / Agentic paper."""
    blob = f"{title} {summary} {' '.join(keywords)}"
    has_rl = bool(RL_TERMS.search(blob))
    has_embodied = bool(EMBODIED_TERMS.search(blob))
    has_agent = bool(AGENT_TERMS.search(blob))
    has_web_only = bool(WEB_ONLY_TERMS.search(blob))
    has_vla_wm = bool(VLA_OR_WM_TERMS.search(blob))

    if has_rl and has_web_only and not re.search(r"\b(robot|robotic|humanoid|manipulation|locomotion)\b", blob, re.I):
        return "2026 · Agent RL", "agentic-tool-rl"
    if has_rl and has_embodied:
        dom = "world-planning" if WORLD_TERMS.search(title) and not re.search(r"\bvla\b", title, re.I) else "embodied-vla"
        return "2026 · Embodied RL", dom
    if has_rl and has_agent:
        dom = "multi-agent" if MARL_TERMS.search(blob) and not WEB_ONLY_TERMS.search(blob) else "agentic-tool-rl"
        return "2026 · Agent RL", dom
    if has_rl and venue:
        dom = infer_core_domain(blob)
        return "2026 · Conference RL", dom
    if has_vla_wm and has_embodied:
        return "2026 · Embodied context", "embodied-vla"
    if has_rl:
        dom = infer_core_domain(blob)
        return "2026 · Core & World RL", dom
    return None


def infer_core_domain(blob: str) -> str:
    if REASONING_LLM_TERMS.search(blob):
        return "llm-alignment-reasoning"
    if WORLD_TERMS.search(blob):
        return "world-planning"
    if OFFLINE_FLOW_TERMS.search(blob):
        return "offline-generative"
    if MARL_TERMS.search(blob):
        return "multi-agent"
    if re.search(r"\b(safe|constrained|inverse rl|imitation)\b", blob, re.I):
        return "imitation-irl-safety"
    if re.search(r"\b(distributional|quantile|maximum entropy)\b", blob, re.I):
        return "dist-maxent"
    if re.search(r"\b(exploration|curiosity|intrinsic)\b", blob, re.I):
        return "exploration-intrinsic"
    if re.search(r"\b(hierarchical|option|meta-rl|episodic)\b", blob, re.I):
        return "hierarchical-meta"
    if re.search(r"\b(q-learning|bellman|temporal-difference|td learning)\b", blob, re.I):
        return "value-td"
    return "policy-trust"


def fetch_json(url: str) -> list | dict | None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as exc:
        print(f"[warn] Failed to fetch {url}: {exc}")
        return None


def fetch_hf_candidates() -> list[dict]:
    urls = [
        "https://huggingface.co/api/daily_papers?limit=100",
        "https://huggingface.co/api/papers/search?q=embodied+reinforcement+learning",
        "https://huggingface.co/api/papers/search?q=VLA+reinforcement+learning",
        "https://huggingface.co/api/papers/search?q=agentic+reinforcement+learning",
        "https://huggingface.co/api/papers/search?q=robot+reinforcement+learning",
        "https://huggingface.co/api/papers/search?q=world+model+reinforcement+learning",
        "https://huggingface.co/api/papers/search?q=offline+reinforcement+learning",
        "https://huggingface.co/api/papers/search?q=policy+optimization+reinforcement+learning",
    ]
    candidates: list[dict] = []
    for url in urls:
        payload = fetch_json(url)
        if not isinstance(payload, list):
            continue
        for entry in payload:
            paper = entry.get("paper") if isinstance(entry, dict) and isinstance(entry.get("paper"), dict) else entry
            if not isinstance(paper, dict):
                continue
            pid = str(paper.get("id") or "").strip()
            if not re.match(r"^\d{4}\.\d{4,5}$", pid):
                continue
            title = re.sub(r"\s+", " ", str(paper.get("title") or "").strip())
            summary = re.sub(r"\s+", " ", str(paper.get("summary") or "").strip())
            ai_summary = re.sub(r"\s+", " ", str(paper.get("ai_summary") or "").strip())
            keywords = [str(k) for k in (paper.get("ai_keywords") or []) if k]
            pub = str(paper.get("publishedAt") or entry.get("publishedAt") or "")[:10]
            if not pub or not pub.startswith("202"):
                continue
            authors = [
                str(a.get("name")).strip()
                for a in (paper.get("authors") or [])
                if isinstance(a, dict) and a.get("name")
            ]
            candidates.append(
                {
                    "arxivId": pid,
                    "title": title,
                    "summary": summary,
                    "aiSummary": ai_summary,
                    "keywords": keywords,
                    "publishedAt": pub,
                    "authors": authors,
                    "venue": extract_venue(f"{title} {summary}"),
                    "githubRepo": paper.get("githubRepo") or "",
                    "projectPage": paper.get("projectPage") or "",
                }
            )
    return candidates


def fetch_arxiv_candidates() -> list[dict]:
    queries = [
        '(cat:cs.RO OR cat:cs.LG OR cat:cs.AI) AND '
        '(all:"reinforcement learning" OR all:"vision-language-action" OR all:"policy optimization")',
        '(co:"NeurIPS 2026" OR co:"ICML 2026" OR co:"ICLR 2026" OR co:"CoRL 2026" OR co:"RSS 2026" OR co:"AAAI 2026" OR co:"IJCAI 2026" OR co:"IROS 2026") AND '
        '(all:"reinforcement learning" OR all:"policy optimization" OR all:"world model" OR all:"vision-language-action")',
    ]
    candidates: list[dict] = []
    ns = {"atom": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}
    for idx_q, query in enumerate(queries):
        if idx_q > 0:
            time.sleep(3.2)
        url = (
            "https://export.arxiv.org/api/query?search_query="
            + urllib.parse.quote(query)
            + "&sortBy=submittedDate&sortOrder=descending&max_results=40"
        )
        xml_bytes: bytes | None = None
        for attempt in range(2):
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            try:
                with urllib.request.urlopen(req, timeout=20) as resp:
                    xml_bytes = resp.read()
                break
            except Exception as exc:
                if attempt == 0:
                    time.sleep(3.5)
                else:
                    print(f"[warn] Failed to fetch arXiv API: {exc}")
        if not xml_bytes:
            continue
        try:
            root = ET.fromstring(xml_bytes)
            for entry in root.findall("atom:entry", ns):
                id_text = entry.findtext("atom:id", default="", namespaces=ns)
                m = re.search(r"(\d{4}\.\d{4,5})", id_text)
                if not m:
                    continue
                pid = m.group(1)
                title = re.sub(r"\s+", " ", entry.findtext("atom:title", default="", namespaces=ns).strip())
                summary = re.sub(r"\s+", " ", entry.findtext("atom:summary", default="", namespaces=ns).strip())
                comment = re.sub(r"\s+", " ", entry.findtext("arxiv:comment", default="", namespaces=ns).strip())
                pub = entry.findtext("atom:published", default="", namespaces=ns)[:10]
                authors = [
                    a.findtext("atom:name", default="", namespaces=ns).strip()
                    for a in entry.findall("atom:author", ns)
                    if a.findtext("atom:name", default="", namespaces=ns)
                ]
                candidates.append(
                    {
                        "arxivId": pid,
                        "title": title,
                        "summary": summary,
                        "aiSummary": "",
                        "keywords": [],
                        "publishedAt": pub,
                        "authors": authors,
                        "venue": extract_venue(f"{comment} {summary}"),
                        "githubRepo": "",
                        "projectPage": "",
                    }
                )
        except Exception as exc:
            print(f"[warn] Failed to parse arXiv XML: {exc}")
    return candidates


def normalize_tex(text: str) -> str:
    text = re.sub(r"\\\[([\s\S]+?)\\\]", lambda m: f"$$ {m.group(1).strip()} $$", text or "")
    text = re.sub(r"\\\(([^\n]+?)\\\)", lambda m: f"${m.group(1).strip()}$", text)
    return text


def safe_truncate(text: str, max_len: int = 225) -> str:
    text = re.sub(r"\s+", " ", text or "").strip()
    if len(text) <= max_len:
        return text
    spans = [m.span() for m in re.finditer(r"(?<!\\)\$[^$\n]+?(?<!\\)\$", text)]
    cutoff = max_len
    for start, end in spans:
        if start < cutoff < end:
            cutoff = end if end <= max_len + 36 else start
            break
    sliced = text[:cutoff].rstrip(" ,;:-")
    return sliced + "…"


def build_live_item(paper: dict, category: str, domain: str) -> dict:
    pid = paper["arxivId"]
    title = normalize_tex(paper["title"])
    summary = normalize_tex(paper["summary"])
    ai_summary = normalize_tex(paper["aiSummary"])
    pub = paper["publishedAt"]
    year = int(pub[:4]) if pub and pub[:4].isdigit() else 2026
    venue = paper.get("venue") or ""
    authors_list = paper["authors"]
    authors_str = ", ".join(authors_list[:8]) + (" et al" if len(authors_list) > 8 else "")
    if not authors_str:
        authors_str = "arXiv authors"

    short_summary = ai_summary or summary
    venue_prefix = f"[{venue}] " if venue else ""
    description = safe_truncate(f"({pub}) — {venue_prefix}{short_summary}", 225)
    arxiv_abs = f"https://arxiv.org/abs/{pid}"
    arxiv_pdf = f"https://arxiv.org/pdf/{pid}"

    links = [f"* Paper: [arXiv:{pid}]({arxiv_abs})", f"* PDF: [arXiv PDF]({arxiv_pdf})"]
    github_repo = paper.get("githubRepo") or ""
    project_page = paper.get("projectPage") or ""
    if github_repo:
        links.append(f"* Code: [{github_repo}]({github_repo})")
    if project_page:
        links.append(f"* Project page: [{project_page}]({project_page})")

    kw_line = ""
    if paper.get("keywords"):
        kw_joined = ", ".join(paper["keywords"][:8])
        kw_line = f"\n\nKeywords: {kw_joined}."

    venue_line = f" Conference venue: {venue}." if venue else ""
    status_label = f"{venue} · live auto-indexed" if venue else "live auto-indexed preprint"
    body = (
        f"# {title}\n\n"
        f"First public date: {pub}.{venue_line}\n\n"
        f"Authors: {authors_str}.\n\n"
        f"Classification: {category} ({status_label}).\n\n"
        f"## Abstract & key idea\n\n"
        f"{summary}{kw_line}\n\n"
        f"## Evidence boundary\n\n"
        f"This entry was automatically indexed from live public research feeds on {pub} and reflects the authors' "
        f"public preprint abstract (`arXiv:{pid}`). Separate reinforcement-learning training claims from purely "
        f"supervised or world-model components when comparing against manually curated notes.\n\n"
        f"## Sources and artifacts\n\n"
        + "\n".join(links)
    )
    has_math = bool(re.search(r"(?<!\\)\$[^$\n]+?(?<!\\)\$|\$\$[\s\S]+?\$\$", f"{title} {summary}"))

    return {
        "id": f"live-{pid}",
        "arxivId": pid,
        "title": title,
        "category": category,
        "domain": domain,
        "year": year,
        "authors": authors_str,
        "description": description,
        "publishedAt": pub,
        "venue": venue,
        "hasMath": has_math,
        "url": arxiv_abs,
        "file": "",
        "body": body,
        "live": True,
        "githubRepo": github_repo,
        "projectPage": project_page,
    }


def main() -> None:
    curated_ids, curated_titles, latest_curated_date = load_existing_curated()
    raw_candidates = fetch_hf_candidates() + fetch_arxiv_candidates()

    seen_ids: set[str] = set()
    live_items: list[dict] = []

    for cand in raw_candidates:
        pid = cand["arxivId"]
        nt = norm_title(cand["title"])
        if not pid or pid in curated_ids or pid in seen_ids or nt in curated_titles:
            continue
        classified = classify_paper(cand["title"], cand["summary"], cand.get("keywords") or [], cand.get("venue") or "")
        if not classified:
            continue
        category, domain = classified
        seen_ids.add(pid)
        curated_titles.add(nt)
        live_items.append(build_live_item(cand, category, domain))

    live_items.sort(key=lambda x: (x["publishedAt"], x["arxivId"]), reverse=True)
    live_items = live_items[:36]

    latest_date = latest_curated_date
    for item in live_items:
        if item["publishedAt"] > latest_date:
            latest_date = item["publishedAt"]

    payload = {
        "updatedAt": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "latestDate": latest_date,
        "count": len(live_items),
        "items": live_items,
    }
    OUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    rel_out = OUT_PATH.relative_to(ROOT)
    print(f"Wrote {len(live_items)} live items to {rel_out} (latestDate={latest_date}).")


if __name__ == "__main__":
    main()
