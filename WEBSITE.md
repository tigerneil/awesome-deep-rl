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

The September 17, 2026 research update adds twelve source-linked notes. The homepage briefing opens `2026.md`; its embodied-RL shortcut selects the eight notes under `2026 · Embodied RL`. Agent RL and adjacent embodied context have separate catalog categories. Rebuild `assets/catalog.js` after editing the notes or README so search and in-page reading reflect the source files.
