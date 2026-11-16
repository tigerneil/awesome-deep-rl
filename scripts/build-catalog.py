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
ARXIV_RE = re.compile(r"\b(\d{4}\.\d{4,5})\b")
VENUE_LINE_RE = re.compile(
    r"Conference venue:\s*([^\n]+?)\.(?:\s|$)|"
    r"status:\s*paper;\s*arxiv record lists\s*(RSS 2026)|"
    r"\b(NeurIPS 202[56](?:\s+Oral|\s+Spotlight)?|"
    r"ICML 202[56](?:\s+Oral|\s+Spotlight)?|"
    r"ICLR 202[56](?:\s+Oral|\s+Spotlight)?|"
    r"CoRL 202[56](?:\s+Oral)?|"
    r"RSS 202[56](?:\s+Award)?|"
    r"IJCAI 202[56]|IROS 202[56]|"
    r"AAAI 202[56](?:\s+Oral)?)\b",
    re.I,
)
META_PREFIX_RE = re.compile(
    r"^(First public date:|Reviewed:|Authors:|Classification:|Status:|Abstract$|Back to )",
    re.I,
)


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

    # Track inline $ spans so we never leave an unclosed $
    spans: list[tuple[int, int]] = [m.span() for m in re.finditer(r"(?<!\\)\$[^$\n]+?(?<!\\)\$", text)]
    cutoff = max_len
    for start, end in spans:
        if start < cutoff < end:
            cutoff = end if end <= max_len + 36 else start
            break

    sliced = text[:cutoff].rstrip(" ,;:-")
    space_idx = sliced.rfind(" ")
    if space_idx > max_len - 35 and not sliced.endswith("$"):
        # Avoid cutting mid-word unless right after a math span
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
        # Skip short author-only lines at top of classic notes
        if not kept_lines and not is_overview and len(line) < 95 and not line.endswith("."):
            continue
        kept_lines.append(line)
        if sum(len(x) for x in kept_lines) >= 320:
            break

    summary = " ".join(kept_lines)
    if not summary:
        return "Explore the original research note, mathematical formulation, and linked resources."
    return safe_truncate_preserving_math(summary, 225)


def extract_metadata(stem: str, body: str) -> tuple[str, str, str]:
    """Extract (publishedAt, venue, arxivId) from a Markdown research note."""
    if stem in {"2026", "README", "WEBSITE"}:
        return "", "", ""
    date_match = DATE_RE.search(body)
    published_at = date_match.group(1) if date_match else ""

    venue_match = VENUE_LINE_RE.search(body)
    venue = ""
    if venue_match:
        raw_venue = venue_match.group(1) or venue_match.group(2) or venue_match.group(3) or ""
        venue = re.sub(r"\s*\([^)]*\)", "", raw_venue).strip()

    arxiv_match = ARXIV_RE.search(body)
    arxiv_id = arxiv_match.group(1) if arxiv_match else ""
    return published_at, venue, arxiv_id


def parse_readme_index(readme_text: str) -> tuple[dict[str, tuple[str, str]], list[dict]]:
    """Map local .md files to categories/titles and collect external resources from README.md."""
    category = "Overview"
    mapping: dict[str, tuple[str, str]] = {}
    external: list[dict] = []

    for line in readme_text.splitlines():
        if line.startswith("## "):
            category = line[3:].strip()
            continue
        if not line.startswith("* "):
            continue
        links = LINK_RE.findall(line)
        for title, url in links:
            if url.endswith(".md") and (url not in mapping or not mapping[url][0].startswith("2026 ·")):
                mapping[url] = (category, title)
        if links and not any(url.endswith(".md") for _, url in links):
            title, url = links[0]
            if title.lower() in ("arxiv", "paper", "repo"):
                title = line[2 : line.index("[")].strip(" -—:") or title
            if url.startswith(("https://", "http://")):
                desc = LINK_RE.sub(r"\1", line[2:]).strip()
                external.append(
                    {
                        "id": f"external-{len(external)}",
                        "title": title,
                        "category": category,
                        "description": safe_truncate_preserving_math(desc, 225),
                        "publishedAt": "",
                        "venue": "",
                        "arxivId": "",
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
        cat, title = mapping.get(path.name, (default_cat, path.stem))
        if path.stem == "README":
            cat, title = "Overview", "The complete Deep RL collection"
        elif path.stem == "2026":
            cat, title = "Frontier guide", "2026 Deep RL Frontier Briefing"

        published_at, venue, arxiv_id = extract_metadata(path.stem, body)
        has_math = detect_has_math(body)
        if has_math:
            math_count += 1
        description = extract_clean_description(body, is_overview=path.stem in {"README", "2026", "WEBSITE"})

        items.append(
            {
                "id": path.stem,
                "title": title,
                "category": cat,
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
    print(
        f"Indexed {len(items)} local documents ({math_count} with formal LaTeX math) "
        f"and {len(external)} external resources."
    )


if __name__ == "__main__":
    build_catalog()
