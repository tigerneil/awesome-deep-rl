# Deep RL Atlas

A static explorer for the entire Markdown collection, with a rotating 3D canvas graph, topic and full-text search, local reading list, grid/list views, and an in-page research reader.

Run locally from the repository root:

```sh
python3 scripts/build-catalog.py
python3 -m http.server 8000
```

Open http://localhost:8000. No package installation or build tool is needed. Re-run the catalog script after editing research Markdown. Deploy the repository as static files, including `index.html` and `assets/`.

The reading list is stored in this browser. The graph is illustrative, not a measured citation network. Motion respects the operating system's reduced-motion setting and can be paused. Google Fonts are optional; system fonts are the fallback. Original Markdown and external resources remain accessible from the reader.

Validation: Python compilation, JavaScript syntax checks, complete Markdown indexing, desktop/mobile browser rendering, search, empty state, bookmarks, note reader, frontier guide, load more, motion control, and console-error checks.

The Research labs section (`#labs`) contains a curated, unranked directory of 16 industry, academic, and nonprofit groups. Search names, locations, and topics; combine LLM/RL, organization, and region filters. Six entries appear initially, with an option to show all matching labs. Each card links to an official source reviewed on September 17, 2026. Edit the records in `assets/labs.js` to maintain the directory; verify the linked source before changing research descriptions. Region tags describe the locations listed, not every global office.

The November 7, 2026 research update expands the 2026 coverage to 46 source-linked notes across NeurIPS 2026, ICML 2026, ICLR 2026, CoRL 2026, RSS 2026, and AAAI 2026: 24 in `2026 · Embodied RL`, 7 in `2026 · Agent RL`, 6 in `2026 · Conference RL`, and 9 in `2026 · Embodied context`. The homepage briefing opens `2026.md`, while dedicated shortcuts filter directly to `2026 · Embodied RL` and `2026 · Conference RL`. Rebuild `assets/catalog.js` after editing the notes or README so search and in-page reading reflect the source files.

### Automatic online update on page open

When `index.html` opens in the browser, `assets/app.js` immediately renders the curated static catalog (`window.RL_CATALOG`) and automatically runs `syncLiveOnline()` in the background:

1. **Instant local cache + live online fetch**: Reads any cached live preprints from `localStorage` (`rl-atlas-live-v1`) and concurrently fetches `assets/live-feed.json` alongside public CORS-enabled research feeds (`huggingface.co/api/daily_papers` and topic searches for embodied, VLA, and agentic reinforcement learning).
2. **Deduplication & evidence boundary**: Extracts all arXiv IDs and titles already present in curated Markdown notes so curated notes are never overwritten or duplicated. Newly discovered preprints are classified into `2026 · Embodied RL`, `2026 · Agent RL`, `2026 · Conference RL`, or `2026 · Embodied context` and clearly badged with their conference venue or `LIVE ARXIV · <YYYY-MM-DD>` alongside an explicit evidence-boundary section in the in-page reader.
3. **Repository-side feed refresh**: Run `python3 -B scripts/update-live-feed.py` (automated daily via `.github/workflows/auto-update.yml`) to refresh `assets/live-feed.json` from arXiv and Hugging Face APIs.

