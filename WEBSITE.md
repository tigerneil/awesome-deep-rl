# Deep RL Atlas — Architecture & Developer Guide

Deep RL Atlas is a static, zero-build scientific explorer for the entire Markdown collection, combining a real-time 3-mode reinforcement learning numerical simulator (`Bellman V(s)`, `HJB Phase (θ, θ̇)`, and `Empirical Corpus Graph`), an interactive Canonical Equations & Analytical Operator Plots Explorer, KaTeX mathematical typesetting, topic and full-text search, a `∑ Formal math` filter, local reading list, dark/light instrument themes, and live online preprint synchronization.

Run locally from the repository root:

```sh
python3 -B scripts/build-catalog.py
python3 -m http.server 8000
```

Open `http://localhost:8000`. No package installation or bundler is required. Re-run `scripts/build-catalog.py` after editing any Markdown research note or `README.md`. Deploy the repository directly as static files (`index.html` and `assets/`).

## Modular Frontend Architecture

* `index.html` — Semantic single-page scientific layout with early theme hydration, KaTeX `0.16.11` stylesheet/script hooks, 3-mode Hero RL Instrument (`FIG. 001`), Canonical Equations & Operator Plots Explorer (`#equations-section`), 2026 live telemetry briefing (`#frontier-section`), Research Labs directory (`#labs`), and searchable library (`#library`).
* `assets/style.css` — Modular Vanilla CSS design system defining two calibrated HSL palettes: **Obsidian Telemetry** (`:root`, default dark mode) and **Alabaster Instrument** (`[data-theme="light"]`), tactile SVG fractal-noise micro-grain, responsive breakpoints, and mathematical display containers (`.math-block`, `.equation-lab`, `.table-scroll`).
* `assets/math-markdown.js` — Dedicated scientific Markdown and LaTeX typesetting engine (`window.RLMathMarkdown`). Parses headings, display equations (`$$...$$`, `\[...\]`), inline math (`$...$`, `\(...\)`), GFM pipe tables, ordered/unordered lists, blockquotes, code blocks, and internal `.md` cross-references. Uses KaTeX when loaded and falls back deterministically to clean Unicode/HTML math when offline, upgrading nodes automatically once KaTeX finishes loading.
* `assets/network-canvas.js` — Real-time 3-mode scientific RL simulator (`window.initRLNetworkCanvas`): (1) **Soft-Bellman 3D Value Iteration** solving $V_{k+1}(s) = \tau \log \frac{1}{|\mathcal{A}|}\sum_a \exp((r(s,a)+\gamma\mathbb{E}V_k)/\tau)$ over $\mathcal{S} = [-1,1]^2$ with a 2D floor policy vector field $\pi_k(a\mid s)$ and Boltzmann streamlines; (2) **Underactuated Pendulum HJB Phase Portrait** $(\theta, \dot{\theta})$ solving torque-limited swing-up $|u| \le 2.2 < g/\ell$ with click-to-launch RK4 trajectories; and (3) **Empirical Corpus Lineage Graph** built directly from `window.RL_CATALOG` citation and operator couplings.
* `assets/equation-plots.js` — Analytical operator diagnostic plots (`window.RLEquationPlots`) paired with parameter sliders ($\gamma, \lambda, \epsilon, \tau, \alpha, \beta$) for Bellman contraction & Double-Q maximization bias, $\operatorname{GAE}(\gamma,\lambda)$ bias–variance decomposition, PPO/GRPO clipped vs KL surrogates, C51 Cramér projection & MaxEnt policy tilt, MeanFlow latent steering vs OOD critic traps, and NOPO/VEPO frontier operators.
* `assets/app.js` — Application state controller managing theme persistence (`rl-atlas-theme`), the Canonical Equations Explorer, category/search/formal-math/reading-list filtering, scientific reader modal (`#reader`), Markdown source copy, and live online preprint sync.
* `assets/labs.js` — Curated, unranked directory of 16 industry, academic, and nonprofit research groups with organization, region, and LLM/RL focus filters (sources reviewed September 17, 2026).

## Catalog Build & Mathematical Indexing

`scripts/build-catalog.py` indexes all root `*.md` documents and external links from `README.md` into `assets/catalog.js` (`window.RL_CATALOG`), extracting:

* `publishedAt`, `venue`, and `arxivId` metadata from note headers.
* `hasMath` (`bool`) detecting display or inline LaTeX formulas outside code blocks.
* Clean prose `description` snippets that strip boilerplate metadata headers and never slice mid-way through an inline `$...$` expression.

## Automatic Online Update on Page Open

When `index.html` opens in the browser, `assets/app.js` renders the static catalog immediately and runs `syncLiveOnline()` in the background:

1. **Instant local cache + live online fetch**: Hydrates cached preprints from `localStorage` (`rl-atlas-live-v1`) and concurrently queries `assets/live-feed.json` alongside public CORS-enabled Hugging Face paper feeds for embodied, VLA, and agentic reinforcement learning.
2. **Deduplication, LaTeX normalization & evidence boundary**: Deduplicates against all arXiv IDs and titles already in curated notes, normalizes `\(...\)` / `\[...\]` LaTeX delimiters for inline KaTeX rendering, and includes an explicit evidence-boundary section in every auto-indexed note.
3. **Scheduled feed refresh**: Run `python3 -B scripts/update-live-feed.py` (automated daily via `.github/workflows/auto-update.yml`) to refresh `assets/live-feed.json` from arXiv and Hugging Face APIs.
