# Deep RL Atlas — Architecture & Developer Guide

Deep RL Atlas is a static, zero-build, real-time updating scientific field guide for the complete landscape of deep reinforcement learning (`1992–2026`). It combines a 3-mode numerical RL simulator (`Bellman V(s)`, `HJB Phase (θ, θ̇)`, and `Complete 2015–2026 Lineage Graph`), an interactive **12-Domain Landscape & Guided Curricula Explorer**, a **Real-Time Research Radar** with continuous 5-minute online preprint synchronization, an interactive **Canonical Equations & Analytical Operator Plots** lab, KaTeX mathematical typesetting, an instant `⌘K` Command Palette, BibTeX/Markdown export, and shareable deep-linking.

Run locally from the repository root:

```sh
python3 -B scripts/update-live-feed.py
python3 -B scripts/build-catalog.py
python3 -m http.server 8000
```

Open `http://localhost:8000`. No package installation or bundler is required. Re-run `scripts/build-catalog.py` after editing any Markdown research note or `README.md`. Deploy the repository directly as static files (`index.html` and `assets/`).

## Modular Frontend Architecture

* `index.html` — Semantic single-page scientific layout with early theme hydration, KaTeX `0.16.11` hooks, 3-mode Hero RL Instrument (`FIG. 001`), Real-Time Research Radar stream (`#frontier-section`), Interactive 3D Deep RL Evolution Dynamics (`#dynamics-3d`, `FIG. 002 · 3D`), 12-Domain Landscape & Guided Curricula (`#landscape`), Canonical Equations & Operator Plots (`#equations-section`), searchable Library (`#library`), Research Labs directory (`#labs`), Scientific Reader (`#reader`), and `⌘K` Command Palette (`#cmd-palette`).
* `assets/style.css` — Modular Vanilla CSS design system defining two calibrated HSL palettes: **Obsidian Telemetry** (`:root`, default dark mode) and **Alabaster Instrument** (`[data-theme="light"]`), tactile SVG fractal-noise micro-grain, responsive breakpoints, and mathematical display containers.
* `assets/landscape-data.js` — Defines `window.RL_LANDSCAPE`: the **12 Canonical Deep RL Domains** (`01 · Value & TD Control` through `12 · Embodied & VLA RL`) with governing LaTeX operators and landmark note IDs, **4 Guided 8-Step Learning Roadmaps**, and runtime `inferDomain(item)` classification.
* `assets/live-radar.js` — Real-time online synchronization engine (`window.RLLiveRadar`): hydrates `<5ms` from `localStorage` (`rl-atlas-live-v2`), queries `assets/live-feed.json` and 7 CORS-enabled Hugging Face paper feeds in parallel with `10s` `AbortController` timeouts, deduplicates against curated notes, tracks unseen `NEW` arrivals (`rl-atlas-seen-live-v1`), and polls continuously every 5 minutes while visible (`visibilitychange` & `online` aware).
* `assets/math-markdown.js` — Scientific Markdown and LaTeX typesetting engine (`window.RLMathMarkdown`). Parses headings, display equations (`$$...$$`, `\[...\]`), inline math (`$...$`, `\(...\)`), GFM pipe tables, lists, blockquotes, code blocks, and internal `.md` cross-references with offline Unicode fallback.
* `assets/network-canvas.js` — Real-time 3-mode scientific RL simulator (`window.initRLNetworkCanvas`): (1) **Soft-Bellman 3D Value Iteration** over $\mathcal{S} = [-1,1]^2$ with 2D policy quiver $\pi_k(a\mid s)$; (2) **Underactuated Pendulum HJB Phase Portrait** $(\theta, \dot{\theta})$ with RK4 swing-up trajectories; and (3) **Complete 2015–2026 Lineage Graph** across 6 domain lanes.
* `assets/dynamics-3d.js` — Zero-dependency HiDPI perspective 3D observatory (`window.initRLDynamics3D`, `FIG. 002 · 3D`) illustrating the evolving dynamics of Deep RL (`1992–2026`) across 3 smoothly morphing 3D lenses (**Spacetime Terrain**, **Capability Phase Space**, and **Paradigm Orbital**), inertial drag-orbit camera, temporal epoch scrubber & playback, 60+ animated cross-domain lineage transfer flows, live radar synchronization, and a telemetry inspector linked directly to the Reader and Library.
* `assets/equation-plots.js` — Analytical operator diagnostic plots (`window.RLEquationPlots`) paired with parameter sliders ($\gamma, \lambda, \epsilon, \tau, \alpha, \beta$) across 6 core paradigms.
* `assets/app.js` — Application state controller managing theme persistence, URL hash deep-linking (`#note=<ID>`, `#domain=<slug>`), 12-Domain Landscape & Roadmaps, Library domain/track/era filtering, Reading List `.md` export, Reader progress/history/TOC/BibTeX/related notes, and the `⌘K` Command Palette.
* `assets/labs.js` — Curated, unranked directory of 16 industry, academic, and nonprofit research groups with organization, region, and LLM/RL focus filters.

## Catalog Build & Real-Time Edge Pipeline

1. **`scripts/build-catalog.py`**: Indexes all 228 root `*.md` documents and 38 external resources into `assets/catalog.js` (`window.RL_CATALOG`), assigning deterministic `domain` slugs across the 12 canonical domains, `year`, `authors`, `publishedAt`, `venue`, `arxivId`, `hasMath`, and math-safe `description` snippets.
2. **`scripts/update-live-feed.py` & `.github/workflows/auto-update.yml`**: Runs every **6 hours** (`cron: '0 */6 * * *'`) on GitHub Actions to fetch, deduplicate, and classify up to **36** fresh preprints from Hugging Face and arXiv APIs into `assets/live-feed.json`.
