"""Fetch the latest RL, Embodied RL, VLA, and Agentic RL papers from public APIs into assets/live-feed.json."""
from __future__ import annotations

import datetime as dt
import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "assets" / "live-feed.json"
USER_AGENT = "DeepRLAtlas-AutoUpdater/1.0 (+https://tigerneil.github.io/awesome-deep-rl/)"

RL_TERMS = re.compile(
    r"\b(reinforcement learning|policy gradient|actor-critic|ppo|grpo|rlhf|rlaif|"
    r"q-learning|td-learning|markov decision|reward model|reward shaping|"
    r"offline rl|online rl|residual rl|policy optimization|advantage estimation|"
    r"preference optimization|post-training|trial-and-error)\b",
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
    r"agent workflow|computer use)\b",
    re.I,
)
WEB_ONLY_TERMS = re.compile(r"\b(web agent|webrl|web task|browser|gui agent)\b", re.I)
VLA_OR_WM_TERMS = re.compile(
    r"\b(vision-language-action|vla|world model|world simulation|embodied benchmark|"
    r"robotic manipulation|physical ai|embodied navigation|sim-to-real)\b",
    re.I,
)


def norm_title(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", title.lower())


def load_existing_curated() -> tuple[set[str], set[str], str]:
    arxiv_ids: set[str] = set()
    titles: set[str] = set()
    latest_date = "2026-11-06"
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


def classify_paper(title: str, summary: str, keywords: list[str]) -> str | None:
    blob = f"{title} {summary} {' '.join(keywords)}"
    has_rl = bool(RL_TERMS.search(blob))
    has_embodied = bool(EMBODIED_TERMS.search(blob))
    has_agent = bool(AGENT_TERMS.search(blob))
    has_web_only = bool(WEB_ONLY_TERMS.search(blob))
    has_vla_wm = bool(VLA_OR_WM_TERMS.search(blob))

    if has_rl and has_web_only and not re.search(r"\b(robot|robotic|humanoid|manipulation|locomotion)\b", blob, re.I):
        return "2026 · Agent RL"
    if has_rl and has_embodied:
        return "2026 · Embodied RL"
    if has_rl and has_agent:
        return "2026 · Agent RL"
    if has_vla_wm and has_embodied:
        return "2026 · Embodied context"
    return None


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
                    "githubRepo": paper.get("githubRepo") or "",
                    "projectPage": paper.get("projectPage") or "",
                }
            )
    return candidates


def fetch_arxiv_candidates() -> list[dict]:
    query = (
        '(cat:cs.RO OR cat:cs.LG OR cat:cs.AI) AND '
        '(all:"reinforcement learning" OR all:"vision-language-action" OR all:"embodied agent")'
    )
    url = (
        "https://export.arxiv.org/api/query?search_query="
        + urllib.parse.quote(query)
        + "&sortBy=submittedDate&sortOrder=descending&max_results=50"
    )
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    candidates: list[dict] = []
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            xml_bytes = resp.read()
        root = ET.fromstring(xml_bytes)
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        for entry in root.findall("atom:entry", ns):
            id_text = entry.findtext("atom:id", default="", namespaces=ns)
            m = re.search(r"(\d{4}\.\d{4,5})", id_text)
            if not m:
                continue
            pid = m.group(1)
            title = re.sub(r"\s+", " ", entry.findtext("atom:title", default="", namespaces=ns).strip())
            summary = re.sub(r"\s+", " ", entry.findtext("atom:summary", default="", namespaces=ns).strip())
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
                    "githubRepo": "",
                    "projectPage": "",
                }
            )
    except Exception as exc:
        print(f"[warn] Failed to fetch arXiv API: {exc}")
    return candidates


def build_live_item(paper: dict, category: str) -> dict:
    pid = paper["arxivId"]
    title = paper["title"]
    pub = paper["publishedAt"]
    authors_list = paper["authors"]
    authors_str = ", ".join(authors_list[:8]) + (" et al" if len(authors_list) > 8 else "")
    if not authors_str:
        authors_str = "arXiv authors"

    short_summary = paper["aiSummary"] or paper["summary"]
    description = f"({pub}) — {short_summary}"[:230]
    arxiv_abs = f"https://arxiv.org/abs/{pid}"
    arxiv_pdf = f"https://arxiv.org/pdf/{pid}"

    links = [f"* Paper: [arXiv:{pid}]({arxiv_abs})", f"* PDF: [arXiv PDF]({arxiv_pdf})"]
    if paper.get("githubRepo"):
        links.append(f"* Code: [{paper['githubRepo']}]({paper['githubRepo']})")
    if paper.get("projectPage"):
        links.append(f"* Project page: [{paper['projectPage']}]({paper['projectPage']})")

    kw_line = ""
    if paper.get("keywords"):
        kw_line = f"\n\nKeywords: {', '.join(paper['keywords'][:8])}."

    body = (
        f"# {title}\n\n"
        f"First public date: {pub}.\n\n"
        f"Authors: {authors_str}.\n\n"
        f"Classification: {category} (live auto-indexed preprint).\n\n"
        f"## Abstract & key idea\n\n"
        f"{paper['summary']}{kw_line}\n\n"
        f"## Evidence boundary\n\n"
        f"This entry was automatically indexed from live public research feeds on {pub} and reflects the authors' "
        f"public preprint abstract (`arXiv:{pid}`). Separate reinforcement-learning training claims from purely "
        f"supervised or world-model components when comparing against manually curated notes.\n\n"
        f"## Sources and artifacts\n\n"
        + "\n".join(links)
    )

    return {
        "id": f"live-{pid}",
        "arxivId": pid,
        "title": title,
        "category": category,
        "description": description,
        "publishedAt": pub,
        "url": arxiv_abs,
        "file": "",
        "body": body,
        "live": True,
        "githubRepo": paper.get("githubRepo") or "",
        "projectPage": paper.get("projectPage") or "",
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
        category = classify_paper(cand["title"], cand["summary"], cand.get("keywords") or [])
        if not category:
            continue
        seen_ids.add(pid)
        curated_titles.add(nt)
        live_items.append(build_live_item(cand, category))

    live_items.sort(key=lambda x: (x["publishedAt"], x["arxivId"]), reverse=True)
    live_items = live_items[:24]

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
    print(f"Wrote {len(live_items)} live items to {OUT_PATH.relative_to(ROOT)} (latestDate={latest_date}).")


if __name__ == "__main__":
    main()
