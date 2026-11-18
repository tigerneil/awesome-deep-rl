"""Rebuild the browser catalog (assets/catalog.js) from the repository's Markdown sources."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
README_PATH = ROOT / "README.md"
OUT_PATH = ROOT / "assets" / "catalog.js"

LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
IMAGE_OR_LINK_RE = re.compile(r"!?\[([^\]]*)\]\([^)]+\)")
FENCED_CODE_RE = re.compile(r"```[\s\S]*?```")
DISPLAY_MATH_RE = re.compile(r"\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]")
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
INLINE_MATH_RE = re.compile(r"(?<!\\)\$(?!\$)([^$\n]+?)(?<!\\)\$|\\\(([^\n]+?)\\\)")
DATE_RE = re.compile(r"\b(20[12][0-9]-\d{2}-\d{2})\b")
YEAR_RE = re.compile(r"\b(199[0-9]|20[0-2][0-9])\b")
ARXIV_RE = re.compile(r"\b(\d{4}\.\d{4,5})\b")
AUTHORS_LINE_RE = re.compile(r"^Authors:\s*(.+?)\.?\s*$", re.M | re.I)
VENUE_LINE_RE = re.compile(
    r"Conference venue:\s*([^\n]+?)\.(?:\s|$)|"
    r"status:\s*paper;\s*arxiv record lists\s*(RSS 2026)|"
    r"\b(NeurIPS 202[0-6](?:\s+Oral|\s+Spotlight)?|"
    r"ICML 202[0-6](?:\s+Oral|\s+Spotlight)?|"
    r"ICLR 202[0-6](?:\s+Oral|\s+Spotlight)?|"
    r"CoRL 202[0-6](?:\s+Oral)?|"
    r"RSS 202[0-6](?:\s+Award)?|"
    r"CVPR 202[0-6]|IJCAI 202[0-6]|IROS 202[0-6]|"
    r"AAAI 202[0-6](?:\s+Oral)?)\b",
    re.I,
)
META_PREFIX_RE = re.compile(
    r"^(First public date:|Reviewed:|Authors:|Classification:|Status:|Abstract$|Back to )",
    re.I,
)

LANDMARK_YEARS: dict[str, int] = {
    "DQN": 2015,
    "TRPO": 2015,
    "GAE": 2016,
    "DDQN": 2016,
    "Dueling": 2016,
    "PER": 2016,
    "DDPG": 2016,
    "A3C": 2016,
    "GAIL": 2016,
    "UNREAL": 2017,
    "ACER": 2017,
    "REACTOR": 2017,
    "PPO": 2017,
    "DPPO": 2017,
    "QPROP": 2017,
    "DEBP": 2017,
    "PGSQL": 2017,
    "PCL": 2017,
    "PGQ": 2017,
    "C51": 2017,
    "QR-DQN": 2018,
    "Rainbow": 2018,
    "DQfD": 2018,
    "NoisyNet": 2018,
    "UBE": 2018,
    "I2As": 2017,
    "AlphaZero": 2017,
    "World-Models": 2018,
    "IMPALA": 2018,
    "TD3": 2018,
    "SAC": 2018,
    "QMIX": 2018,
    "IQN": 2018,
    "D4PG": 2018,
    "MPO": 2018,
    "COMA": 2018,
    "MADDPG": 2017,
    "LOLA": 2018,
    "Distral": 2017,
    "NEC": 2017,
    "MSRL": 2018,
    "PEARL": 2019,
    "HIRO": 2018,
    "MuZero": 2020,
    "PPG": 2020,
    "CQL": 2020,
    "IQL": 2021,
    "Decision-Transformer": 2021,
    "MAPPO": 2022,
    "RLHF-InstructGPT": 2022,
    "DreamerV3": 2023,
    "Diffusion-Policy": 2023,
    "DPO": 2023,
    "TD-MPC2": 2024,
    "HILP": 2024,
    "OpenVLA": 2024,
    "Pi0-Flow-VLA": 2024,
    "GRPO-DeepSeek-R1": 2025,
    "README": 2026,
    "2026": 2026,
    "WEBSITE": 2026,
}

DOMAIN_BY_ID: dict[str, str] = {
    # 01. Value Operators & TD Control
    "DQN": "value-td",
    "DDQN": "value-td",
    "Dueling": "value-td",
    "PER": "value-td",
    "Rainbow": "value-td",
    "DQfD": "value-td",
    "LipschitzQ": "value-td",
    "GNLBE": "value-td",
    "MSRL": "value-td",
    "Relative-Value-Learning": "value-td",
    "p10": "value-td",
    "reproducing": "value-td",
    "RayInterference": "value-td",
    "ChallengesRealWorldRL": "value-td",
    "README": "value-td",
    "WEBSITE": "value-td",
    # 02. Policy Gradients & Actor-Critic
    "TRPO": "policy-trust",
    "PPO": "policy-trust",
    "DPPO": "policy-trust",
    "PPO-CMA": "policy-trust",
    "PPG": "policy-trust",
    "GAE": "policy-trust",
    "A3C": "policy-trust",
    "DDPG": "policy-trust",
    "TD3": "policy-trust",
    "ACER": "policy-trust",
    "IMPALA": "policy-trust",
    "REACTOR": "policy-trust",
    "UNREAL": "policy-trust",
    "QPROP": "policy-trust",
    "IPG": "policy-trust",
    "EPG": "policy-trust",
    "CAPG": "policy-trust",
    "SPU": "policy-trust",
    "DirPG": "policy-trust",
    "OVPG": "policy-trust",
    "Geoff-PAC": "policy-trust",
    "COF-PAC": "policy-trust",
    "MCGE": "policy-trust",
    "PTR-CRL": "policy-trust",
    "RLTUNER": "policy-trust",
    # 03. Distributional & MaxEnt RL
    "C51": "dist-maxent",
    "C51-analysis": "dist-maxent",
    "QR-DQN": "dist-maxent",
    "IQN": "dist-maxent",
    "D4PG": "dist-maxent",
    "GANQL": "dist-maxent",
    "GTD": "dist-maxent",
    "SAC": "dist-maxent",
    "MPO": "dist-maxent",
    "Distral": "dist-maxent",
    "DEBP": "dist-maxent",
    "PGSQL": "dist-maxent",
    "PCL": "dist-maxent",
    "PGQ": "dist-maxent",
    # 04. World Models & Tree Search
    "AlphaZero": "world-planning",
    "MuZero": "world-planning",
    "World-Models": "world-planning",
    "DreamerV3": "world-planning",
    "TD-MPC2": "world-planning",
    "I2As": "world-planning",
    "IBP": "world-planning",
    "MBDQN": "world-planning",
    "parametric": "world-planning",
    "sc": "world-planning",
    "SoRB": "world-planning",
    "PGS": "world-planning",
    "SVRL": "world-planning",
    "K-PWM": "world-planning",
    "WorldSample": "world-planning",
    "RLA-WM": "world-planning",
    "HaWMPO": "world-planning",
    "WM-Nav": "world-planning",
    "WoVR-Plus": "world-planning",
    # 05. Offline, Sequence & Flow RL
    "CQL": "offline-generative",
    "IQL": "offline-generative",
    "Decision-Transformer": "offline-generative",
    "Diffusion-Policy": "offline-generative",
    "MEND": "offline-generative",
    "bdope": "offline-generative",
    # 06. Exploration & Intrinsic Skills
    "NoisyNet": "exploration-intrinsic",
    "UBE": "exploration-intrinsic",
    "NDM": "exploration-intrinsic",
    "PhiEB": "exploration-intrinsic",
    "QEnsemble": "exploration-intrinsic",
    "MMRB": "exploration-intrinsic",
    "EX2": "exploration-intrinsic",
    "incentivizing": "exploration-intrinsic",
    "MBIE-EB": "exploration-intrinsic",
    "Disagreement": "exploration-intrinsic",
    "EDDICT": "exploration-intrinsic",
    "VISR": "exploration-intrinsic",
    "ST-DIM": "exploration-intrinsic",
    "Coinrun": "exploration-intrinsic",
    "SRL": "exploration-intrinsic",
    "BSRL": "exploration-intrinsic",
    "RECUR": "exploration-intrinsic",
    # 07. Hierarchical, Memory & Meta-RL
    "HIRO": "hierarchical-meta",
    "HAL": "hierarchical-meta",
    "VALOR": "hierarchical-meta",
    "LFOD": "hierarchical-meta",
    "PEARL": "hierarchical-meta",
    "MGRL": "hierarchical-meta",
    "ProMP": "hierarchical-meta",
    "UML": "hierarchical-meta",
    "E2": "hierarchical-meta",
    "MetaSS": "hierarchical-meta",
    "GVF": "hierarchical-meta",
    "ZSTG": "hierarchical-meta",
    "NEC": "hierarchical-meta",
    "RVF": "hierarchical-meta",
    "GenerativeBelief": "hierarchical-meta",
    "Intervaltime": "hierarchical-meta",
    "PEB": "hierarchical-meta",
    "LEARN": "hierarchical-meta",
    "RLNL": "hierarchical-meta",
    # 08. Multi-Agent & Game Equilibria
    "QMIX": "multi-agent",
    "MAPPO": "multi-agent",
    "MADDPG": "multi-agent",
    "COMA": "multi-agent",
    "LOLA": "multi-agent",
    "SGA": "multi-agent",
    "SOM": "multi-agent",
    "ISMCI": "multi-agent",
    "bad": "multi-agent",
    "MRL": "multi-agent",
    "NashDQN": "multi-agent",
    "ROMMEO": "multi-agent",
    "MERL": "multi-agent",
    "OPRE": "multi-agent",
    "Dip": "multi-agent",
    "RoboSumo": "multi-agent",
    "BiCNet": "multi-agent",
    "Phi-Actor-Critic": "multi-agent",
    "FMAPPO": "multi-agent",
    "Reciprocity": "multi-agent",
    "DualMDP": "multi-agent",
    # 09. Imitation, IRL & Safe Control
    "GAIL": "imitation-irl-safety",
    "OP-GAIL": "imitation-irl-safety",
    "LQR+GAIfO": "imitation-irl-safety",
    "GVG": "imitation-irl-safety",
    "GANAC": "imitation-irl-safety",
    "Distributional-IRL": "imitation-irl-safety",
    "Parallel-Safe-RL": "imitation-irl-safety",
    "HIRL": "imitation-irl-safety",
    "Viper": "imitation-irl-safety",
    "VICE": "imitation-irl-safety",
    "RLCRC": "imitation-irl-safety",
    "OLRL": "imitation-irl-safety",
    # 10. LLM Alignment & Reasoning RL
    "RLHF-InstructGPT": "llm-alignment-reasoning",
    "DPO": "llm-alignment-reasoning",
    "GRPO-DeepSeek-R1": "llm-alignment-reasoning",
    "NOPO": "llm-alignment-reasoning",
    "VEPO": "llm-alignment-reasoning",
    "SDPO": "llm-alignment-reasoning",
    "LGPO": "llm-alignment-reasoning",
    "Reward-Budgeting": "llm-alignment-reasoning",
    "SHAPO": "llm-alignment-reasoning",
    "Regularized-Score-Centering": "llm-alignment-reasoning",
    "LARBRID": "llm-alignment-reasoning",
    "RL-Token": "llm-alignment-reasoning",
    # 11. Tool-Using & Agentic RL
    "TACA": "agentic-tool-rl",
    "LoongRL": "agentic-tool-rl",
    "T3-Belief-RL": "agentic-tool-rl",
    "HyperSkill": "agentic-tool-rl",
    "SkillRL": "agentic-tool-rl",
    "MemRL": "agentic-tool-rl",
    "AtomicRL": "agentic-tool-rl",
    "FIND": "agentic-tool-rl",
    "USER-RL": "agentic-tool-rl",
    "eRLT": "agentic-tool-rl",
    "EnvACE": "agentic-tool-rl",
    "SALA": "agentic-tool-rl",
    # 12. Embodied Robotics & VLA Policies
    "OpenVLA": "embodied-vla",
    "Pi0-Flow-VLA": "embodied-vla",
    "ScaleVLA": "embodied-vla",
    "Heave-Ho": "embodied-vla",
    "JEPA4R": "embodied-vla",
    "ViRA": "embodied-vla",
    "Latent-Policy-Steering": "embodied-vla",
    "NSPG": "embodied-vla",
    "Excursion-Policies": "embodied-vla",
    "HeMeR": "embodied-vla",
    "HILP": "embodied-vla",
    "dmimic": "embodied-vla",
    "2026": "embodied-vla",
}

CATEGORY_TO_DOMAIN: dict[str, str] = {
    "Value based": "value-td",
    "Foundations and theory": "value-td",
    "Unifying": "value-td",
    "Policy gradient": "policy-trust",
    "Actor-Critic": "policy-trust",
    "PAC": "policy-trust",
    "New design": "policy-trust",
    "Distributional": "dist-maxent",
    "Connecting value and policy methods": "dist-maxent",
    "Model-based": "world-planning",
    "Model-free + Model-based": "world-planning",
    "Planning": "world-planning",
    "Offline": "offline-generative",
    "Explorations": "exploration-intrinsic",
    "Unsupervised": "exploration-intrinsic",
    "No reward RL": "exploration-intrinsic",
    "Generative and contrastive representation learning": "exploration-intrinsic",
    "Hierarchical": "hierarchical-meta",
    "Option": "hierarchical-meta",
    "Meta Learning": "hierarchical-meta",
    "Multitask": "hierarchical-meta",
    "Faster DRL": "hierarchical-meta",
    "Belief": "hierarchical-meta",
    "Time": "hierarchical-meta",
    "Use Natural Language": "hierarchical-meta",
    "Multi-agent": "multi-agent",
    "Safety": "imitation-irl-safety",
    "Inverse RL": "imitation-irl-safety",
    "Adversarial learning": "imitation-irl-safety",
    "Connection with other methods": "imitation-irl-safety",
    "Reward design": "imitation-irl-safety",
    "Observational Learning": "imitation-irl-safety",
    "2026 · Agent RL": "agentic-tool-rl",
    "2026 · Embodied RL": "embodied-vla",
    "2026 · Embodied context": "embodied-vla",
    "Generalist policies": "embodied-vla",
}


def normalize_tex_delimiters(text: str) -> str:
    """Normalize \\(...\\) and \\[...\\] to $...$ and $$...$$ outside code spans."""
    text = re.sub(r"\\\[([\s\S]+?)\\\]", lambda m: f"$$\n{m.group(1).strip()}\n$$", text)
    text = re.sub(r"\\\(([^\n]+?)\\\)", lambda m: f"${m.group(1).strip()}$", text)
    return text


def detect_has_math(markdown: str) -> bool:
    """Return True when a Markdown document contains display or inline LaTeX math."""
    stripped = FENCED_CODE_RE.sub("", markdown)
    stripped = INLINE_CODE_RE.sub("", stripped)
    if DISPLAY_MATH_RE.search(stripped):
        return True
    return bool(INLINE_MATH_RE.search(stripped))


def safe_truncate_preserving_math(text: str, max_len: int = 225) -> str:
    """Truncate prose without slicing inside an inline $...$ expression."""
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= max_len:
        return text

    spans: list[tuple[int, int]] = [m.span() for m in re.finditer(r"(?<!\\)\$[^$\n]+?(?<!\\)\$", text)]
    cutoff = max_len
    for start, end in spans:
        if start < cutoff < end:
            cutoff = end if end <= max_len + 36 else start
            break

    sliced = text[:cutoff].rstrip(" ,;:-")
    space_idx = sliced.rfind(" ")
    if space_idx > max_len - 35 and not sliced.endswith("$"):
        candidate = sliced[:space_idx].rstrip(" ,;:-")
        if candidate.count("$") % 2 == 0:
            sliced = candidate
    return sliced + "…"


def extract_clean_description(body: str, is_overview: bool = False) -> str:
    """Extract a concise, readable summary from a research note while preserving inline math."""
    cleaned = FENCED_CODE_RE.sub(" ", body)
    cleaned = DISPLAY_MATH_RE.sub(" ", cleaned)
    cleaned = IMAGE_OR_LINK_RE.sub(r"\1", cleaned)
    cleaned = cleaned.replace("**", "")

    kept_lines: list[str] = []
    skip_first_nonempty = not body.lstrip().startswith("#")

    for raw in cleaned.splitlines():
        line = raw.strip()
        if not line or line.startswith(("!", "|", "---", "===", "http://", "https://", "{")):
            continue
        if skip_first_nonempty:
            skip_first_nonempty = False
            continue
        if line.startswith("#"):
            continue
        line = re.sub(r"^(?:>\s*|\*\s+|-\s+|\d+\.\s+)", "", line).strip()
        if not line or META_PREFIX_RE.match(line):
            continue
        if "@" in line and len(line.split()) <= 4:
            continue
        if not kept_lines and not is_overview and len(line) < 95 and not line.endswith("."):
            continue
        kept_lines.append(line)
        if sum(len(x) for x in kept_lines) >= 320:
            break

    summary = " ".join(kept_lines)
    if not summary:
        return "Explore the original research note, mathematical formulation, and linked resources."
    return safe_truncate_preserving_math(summary, 225)


def extract_heading_title(body: str, fallback: str) -> str:
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            heading = stripped[2:].strip()
            if heading:
                return heading
    return fallback


def extract_metadata(stem: str, body: str) -> tuple[str, str, str, str]:
    """Extract (publishedAt, venue, arxivId, authors) from a Markdown research note."""
    if stem in {"2026", "README", "WEBSITE"}:
        return "", "", "", ""
    date_match = DATE_RE.search(body)
    published_at = date_match.group(1) if date_match else ""

    venue_match = VENUE_LINE_RE.search(body)
    venue = ""
    if venue_match:
        raw_venue = venue_match.group(1) or venue_match.group(2) or venue_match.group(3) or ""
        venue = re.sub(r"\s*\([^)]*\)", "", raw_venue).strip()

    arxiv_match = ARXIV_RE.search(body)
    arxiv_id = arxiv_match.group(1) if arxiv_match else ""

    authors_match = AUTHORS_LINE_RE.search(body)
    authors = authors_match.group(1).strip() if authors_match else ""
    return published_at, venue, arxiv_id, authors


def infer_domain(stem: str, title: str, category: str, body: str) -> str:
    if stem in DOMAIN_BY_ID:
        return DOMAIN_BY_ID[stem]
    if category in CATEGORY_TO_DOMAIN:
        return CATEGORY_TO_DOMAIN[category]

    blob = f"{title} {category} {body[:1200]}".lower()
    if any(k in blob for k in ("vision-language-action", "vla", "humanoid", "dexterous", "locomotion", "mujoco", "brax", "robot", "manipulation")):
        return "embodied-vla"
    if any(k in blob for k in ("tool-use", "tool use", "web agent", "coding agent", "gui agent", "multi-turn agent", "agentic")):
        return "agentic-tool-rl"
    if any(k in blob for k in ("rlhf", "dpo", "grpo", "preference optimization", "language model", "reasoning post-training", "verifier")):
        return "llm-alignment-reasoning"
    if any(k in blob for k in ("offline", "d4rl", "conservative q", "decision transformer", "diffusion policy", "off-policy evaluation")):
        return "offline-generative"
    if any(k in blob for k in ("world model", "muzero", "alphazero", "dreamer", "tree search", "mcts", "model-based")):
        return "world-planning"
    if any(k in blob for k in ("multi-agent", "multiagent", "starcraft", "nash", "equilibrium", "cooperative")):
        return "multi-agent"
    if any(k in blob for k in ("inverse rl", "imitation", "safe", "constrained", "adversarial")):
        return "imitation-irl-safety"
    if any(k in blob for k in ("distributional", "quantile", "maximum entropy", "soft actor-critic")):
        return "dist-maxent"
    if any(k in blob for k in ("exploration", "curiosity", "intrinsic", "unsupervised", "count-based")):
        return "exploration-intrinsic"
    if any(k in blob for k in ("hierarchical", "option", "meta-learning", "meta-rl", "episodic")):
        return "hierarchical-meta"
    if any(k in blob for k in ("policy gradient", "actor-critic", "ppo", "trpo")):
        return "policy-trust"
    return "value-td"


def infer_year(stem: str, published_at: str, arxiv_id: str, category: str, readme_year: int | None) -> int:
    if stem in LANDMARK_YEARS:
        return LANDMARK_YEARS[stem]
    if published_at and len(published_at) >= 4 and published_at[:4].isdigit():
        return int(published_at[:4])
    if category.startswith("2026"):
        return 2026
    if arxiv_id and len(arxiv_id) >= 4 and arxiv_id[:2].isdigit():
        yy = int(arxiv_id[:2])
        return 2000 + yy if yy <= 40 else 1900 + yy
    if readme_year:
        return readme_year
    return 2018


def parse_readme_index(readme_text: str) -> tuple[dict[str, tuple[str, str, int | None]], list[dict]]:
    """Map local .md files to (category, title, year) and collect external resources from README.md."""
    category = "Overview"
    mapping: dict[str, tuple[str, str, int | None]] = {}
    external: list[dict] = []

    for line in readme_text.splitlines():
        if line.startswith("## "):
            category = line[3:].strip()
            continue
        if not line.startswith("* "):
            continue
        links = LINK_RE.findall(line)
        ym = YEAR_RE.search(line)
        line_year = int(ym.group(1)) if ym else (int(category) if category.isdigit() else None)

        for title, url in links:
            if url.endswith(".md") and (url not in mapping or not mapping[url][0].startswith("2026 ·")):
                mapping[url] = (category, title, line_year)

        if links and not any(url.endswith(".md") for _, url in links):
            title, url = links[0]
            if title.lower() in ("arxiv", "paper", "repo", "pdf"):
                title = line[2 : line.index("[")].strip(" -—:") or title
            if url.startswith(("https://", "http://")):
                desc = LINK_RE.sub(r"\1", line[2:]).strip()
                am = ARXIV_RE.search(line)
                ext_arxiv = am.group(1) if am else ""
                ext_id = f"external-{len(external)}"
                ext_year = infer_year(ext_id, "", ext_arxiv, category, line_year)
                ext_domain = infer_domain(ext_id, title, category, desc)
                external.append(
                    {
                        "id": ext_id,
                        "title": title,
                        "category": category,
                        "domain": ext_domain,
                        "year": ext_year,
                        "authors": "",
                        "description": safe_truncate_preserving_math(desc, 225),
                        "publishedAt": "",
                        "venue": "",
                        "arxivId": ext_arxiv,
                        "hasMath": detect_has_math(desc),
                        "url": url,
                        "file": "",
                        "body": "",
                    }
                )
    return mapping, external


def build_catalog() -> None:
    readme_text = README_PATH.read_text(encoding="utf-8")
    mapping, external = parse_readme_index(readme_text)

    items: list[dict] = []
    math_count = 0
    for path in sorted(ROOT.glob("*.md")):
        body = normalize_tex_delimiters(path.read_text(encoding="utf-8"))
        default_cat = "Frontier guide" if path.stem == "2026" else "Research notes"
        fallback_title = extract_heading_title(body, path.stem)
        cat, title, readme_year = mapping.get(path.name, (default_cat, fallback_title, None))
        if path.stem == "README":
            cat, title = "Overview", "The complete Deep RL collection"
        elif path.stem == "2026":
            cat, title = "Frontier guide", "2026 Deep RL Frontier Briefing"
        elif path.stem == "WEBSITE":
            cat, title = "Overview", "Deep RL Atlas — Architecture & Developer Guide"

        published_at, venue, arxiv_id, authors = extract_metadata(path.stem, body)
        year = infer_year(path.stem, published_at, arxiv_id, cat, readme_year)
        domain = infer_domain(path.stem, title, cat, body)
        has_math = detect_has_math(body)
        if has_math:
            math_count += 1
        description = extract_clean_description(body, is_overview=path.stem in {"README", "2026", "WEBSITE"})

        items.append(
            {
                "id": path.stem,
                "title": title,
                "category": cat,
                "domain": domain,
                "year": year,
                "authors": authors,
                "description": description,
                "publishedAt": published_at,
                "venue": venue,
                "arxivId": arxiv_id,
                "hasMath": has_math,
                "file": path.name,
                "url": path.name,
                "body": body,
            }
        )

    all_entries = items + external
    OUT_PATH.write_text(
        "window.RL_CATALOG = " + json.dumps(all_entries, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    domain_counts: dict[str, int] = {}
    for entry in all_entries:
        dom = entry["domain"]
        domain_counts[dom] = domain_counts.get(dom, 0) + 1
    print(
        f"Indexed {len(items)} local documents ({math_count} with formal LaTeX math) "
        f"and {len(external)} external resources across {len(domain_counts)} canonical domains."
    )


if __name__ == "__main__":
    build_catalog()
