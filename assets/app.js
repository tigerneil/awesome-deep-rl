'use strict';

(() => {
  const MM = window.RLMathMarkdown;
  const LS = window.RL_LANDSCAPE || { DOMAINS: [], DOMAIN_MAP: new Map(), LEARNING_PATHS: [], inferDomain: () => 'value-td' };
  const $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const CANONICAL_EQUATIONS = [
    {
      id: 'bellman',
      era: '1989–2026 · Value Foundations',
      title: 'Bellman Optimality & Decoupled Backups',
      symbol: '𝒯*Q = r + γ max Q',
      tex: String.raw`(\mathcal{T}^* Q)(s, a) = \mathbb{E}_{s' \sim P(\cdot \mid s, a)}\!\left[r(s, a) + \gamma \max_{a' \in \mathcal{A}} Q(s', a')\right], \qquad Y_t^{\text{DDQN}} = r_t + \gamma Q_{\theta^-}\!\Big(s_{t+1},\, \arg\max_{a'} Q_\theta(s_{t+1}, a')\Big)`,
      intuition:
        'Dynamic programming compressed into sample transitions: optimal action-values satisfy a contraction fixed point, while target-network decoupling, twin critics, and pairwise relative differences eliminate overestimation and drifting reward bias.',
      notes: ['DQN', 'DDQN', 'Dueling', 'Rainbow', 'TD3', 'Relative-Value-Learning']
    },
    {
      id: 'pg-gae',
      era: '1999–2026 · Policy Gradient & Credit',
      title: 'Score-Function Gradient & GAE(γ, λ)',
      symbol: '∇θ J(πθ)',
      tex: String.raw`\nabla_\theta J(\pi_\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\!\left[\sum_{t=0}^{\infty} \nabla_\theta \log \pi_\theta(a_t \mid s_t)\,\hat{A}_t^{\text{GAE}(\gamma,\lambda)}\right], \qquad \hat{A}_t^{\text{GAE}} = \sum_{l=0}^{\infty} (\gamma\lambda)^l \big(r_{t+l} + \gamma V_\phi(s_{t+l+1}) - V_\phi(s_{t+l})\big)`,
      intuition:
        'Differentiates expected trajectory returns without an environment model by weighting log-likelihood gradients with exponentially λ-blended temporal-difference residuals—extended in 2026 with transition-aware tool projections and belief stopping times.',
      notes: ['TRPO', 'GAE', 'A3C', 'PPO', 'IMPALA', 'TACA', 'T3-Belief-RL']
    },
    {
      id: 'trust-grpo',
      era: '2017–2026 · Proximal & Group-Relative RL',
      title: 'Clipped Surrogates & Critic-Free GRPO',
      symbol: 'L^CLIP · GRPO',
      tex: String.raw`\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{x,\, \{y_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}}\!\left[\frac{1}{G}\sum_{i=1}^G \min\!\Big(\rho_i(\theta)\hat{A}_i,\, \operatorname{clip}\big(\rho_i(\theta), 1-\epsilon, 1+\epsilon\big)\hat{A}_i\Big) - \beta D_{\text{KL}}\!\big(\pi_\theta \,\|\, \pi_{\text{ref}}\big)\right], \quad \hat{A}_i = \frac{R_i - \mu_R}{\sigma_R + \delta}`,
      intuition:
        'Replaces learned value critics with Monte Carlo prompt-group baselines while bounding importance-ratio drift—powering reasoning post-training, regularized score centering, Lyapunov stability, and compute-budgeted verification.',
      notes: ['PPO', 'GRPO-DeepSeek-R1', 'Regularized-Score-Centering', 'LGPO', 'Reward-Budgeting', 'LoongRL']
    },
    {
      id: 'dist-maxent',
      era: '2017–2026 · Distributional & MaxEnt RL',
      title: 'Distributional Bellman & Soft Maximum Entropy',
      symbol: '𝒯^π Z · Soft-Q',
      tex: String.raw`\mathcal{T}^\pi Z(s, a) \stackrel{D}{=} R(s, a) + \gamma Z(S', A'), \qquad q^*(a \mid s) \propto \pi_{\text{ref}}(a \mid s)\exp\!\left(\frac{Q^\pi(s, a)}{\alpha}\right)`,
      intuition:
        'Propagates full random-return distributions and risk quantiles rather than scalar means, while maximum-entropy duals and implicit expectile backups solve KL-regularized policy improvement in closed form.',
      notes: ['C51', 'IQN', 'SAC', 'MPO', 'IQL', 'DPO', 'Distributional-IRL']
    },
    {
      id: 'flow-steering',
      era: '2023–2026 · Generative & VLA Robot Policies',
      title: 'Denoising Flows & Latent Policy Steering',
      symbol: 'Gψ(s, μθ(s))',
      tex: String.raw`a_t = G_\psi\big(s_t, \mu_\theta(s_t)\big), \qquad \nabla_\theta \mathcal{J}_{\text{LPS}}(\theta) = \mathbb{E}_{s \sim \mathcal{D}}\!\left[\nabla_\theta \mu_\theta(s)^\top \left(\frac{\partial G_\psi(s, z)}{\partial z}\right)_{\!z=\mu_\theta(s)}^\top \nabla_a Q_\phi(s, a)\Big|_{a = G_\psi(s, \mu_\theta(s))}\right]`,
      intuition:
        'Keeps expressive Diffusion Policy, π0 flow-matching, and VLA action priors strictly inside behavioral support while steering trajectories via action-space critics, excursion backups, or whole-body contact RL.',
      notes: ['Diffusion-Policy', 'Pi0-Flow-VLA', 'Latent-Policy-Steering', 'Excursion-Policies', 'ScaleVLA', 'Heave-Ho']
    },
    {
      id: 'frontier-2026',
      era: '2026 · Asymmetric & Self-Distilled RL',
      title: 'One-Sided Verifiers & Rich-Feedback Distillation',
      symbol: 'NOPO · SDPO · VEPO',
      tex: String.raw`\mathcal{L}_{\text{NOPO}}(\theta) = \mathbb{E}_{x}\!\left[\phi\!\big(\hat{p}_{\text{nf}}(x)\big)\frac{1}{G}\sum_{y_i \in \mathcal{N}(x)} \log\!\left(1 + \exp\!\left(\beta \log \frac{\pi_\theta(y_i \mid x)}{\pi_{\text{ref}}(y_i \mid x)}\right)\right)\right], \qquad \mathcal{H}_{\text{eff}} = S_{\text{top-}k} \cdot \left(1 - \frac{H_{\text{top-}k}}{\log k}\right)`,
      intuition:
        'Breaks beyond symmetric scalar rewards: suppresses trusted falsifications without rewarding false-positive shortcuts, controls effective vocalized entropy, and distills rich runtime feedback token-by-token.',
      notes: ['NOPO', 'VEPO', 'SDPO', 'SALA', 'JEPA4R', '2026']
    }
  ];

  // Normalize static catalog items with domain, year, authors, venue, and hasMath
  const baseCatalog = (window.RL_CATALOG || []).map(item => {
    const blob = `${item.description || ''} ${item.body || ''}`;
    const dm = !item.publishedAt ? blob.match(/\b(20[12][0-9]-\d{2}-\d{2})\b/) : null;
    const publishedAt = item.publishedAt || (dm ? dm[1] : '');
    const year =
      Number(item.year) ||
      (publishedAt ? Number(publishedAt.slice(0, 4)) : String(item.category || '').startsWith('2026') ? 2026 : 2018);
    const hasMath = typeof item.hasMath === 'boolean' ? item.hasMath : MM.hasFormalMath(blob);
    const domain = item.domain && LS.DOMAIN_MAP.has(item.domain) ? item.domain : LS.inferDomain(item);
    return Object.assign({}, item, {
      publishedAt,
      year,
      domain,
      hasMath,
      venue: item.venue || '',
      authors: item.authors || ''
    });
  });

  let catalog = baseCatalog.slice();
  let liveItemsCache = [];
  let currentReaderItem = null;
  let readerHistory = [];

  const normTitle = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  const curatedArxivIds = new Set();
  const curatedTitles = new Set();
  baseCatalog.forEach(item => {
    curatedTitles.add(normTitle(item.title));
    const text = `${item.title || ''} ${item.description || ''} ${item.body || ''} ${item.url || ''}`;
    for (const m of text.matchAll(/\b(\d{4}\.\d{4,5})\b/g)) curatedArxivIds.add(m[1]);
  });

  // Persisted reading list
  let saved;
  try {
    const stored = JSON.parse(localStorage.getItem('rl-atlas-saved') || '[]');
    saved = new Set(
      Array.isArray(stored)
        ? stored.filter(
            id => typeof id === 'string' && (id.startsWith('live-') || baseCatalog.some(item => item.id === id))
          )
        : []
    );
  } catch {
    saved = new Set();
  }

  // Library & Explorer UI state
  let taxonomyMode = 'domains'; // 'domains' | 'tracks'
  let activeDomain = 'all'; // 'all' or one of 12 domain slugs
  let activeCategory = 'All resources'; // 'All resources' or granular README category
  let activeEra = 'all'; // 'all' | 'live' | '2026' | 'modern' | 'canon'
  let activeRoadmapIds = null; // null or Set of note IDs
  let activeRoadmapTitle = '';
  let limit = 12;
  let savedOnly = false;
  let mathOnly = false;
  let activeEquationId = CANONICAL_EQUATIONS[0].id;
  let activePathId = LS.LEARNING_PATHS[0] ? LS.LEARNING_PATHS[0].id : 'core-foundations';

  // Command Palette state
  let cmdMatches = [];
  let cmdSelectedIdx = 0;

  const baseFeatured = [
    '2026', 'Heave-Ho', 'Regularized-Score-Centering', 'JEPA4R', 'ScaleVLA', 'SALA', 'ViRA',
    'NOPO', 'HeMeR', 'VEPO', 'LGPO', 'HyperSkill', 'Excursion-Policies', 'K-PWM', 'TACA',
    'SDPO', 'Distributional-IRL', 'LoongRL', 'T3-Belief-RL', 'Latent-Policy-Steering',
    'GRPO-DeepSeek-R1', 'Pi0-Flow-VLA', 'OpenVLA', 'TD-MPC2', 'DPO', 'Diffusion-Policy',
    'DreamerV3', 'RLHF-InstructGPT', 'IQL', 'Decision-Transformer', 'CQL', 'MuZero',
    'SAC', 'TD3', 'PPO', 'AlphaZero', 'World-Models', 'C51', 'GAE', 'TRPO', 'DQN'
  ];
  let featured = baseFeatured.slice();

  function toast(message) {
    const el = $('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 2500);
  }

  function smoothScrollTo(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
  }

  /* ------------------------------------------------------------------------
     Theme Controller (Obsidian Dark <-> Alabaster Light)
     ------------------------------------------------------------------------ */
  function applyTheme(theme, persist = false) {
    const mode = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = mode;
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', mode === 'light' ? '#f7f5f0' : '#090c10');
    const btn = $('theme-toggle');
    if (btn) {
      btn.textContent = mode === 'light' ? '☾ Dark' : '☀ Light';
      btn.setAttribute(
        'aria-label',
        mode === 'light' ? 'Switch to Obsidian dark theme' : 'Switch to Alabaster light theme'
      );
      btn.setAttribute('aria-pressed', String(mode === 'light'));
    }
    if (persist) {
      try {
        localStorage.setItem('rl-atlas-theme', mode);
      } catch {}
    }
    if (window.RLNetworkCanvas && typeof window.RLNetworkCanvas.redraw === 'function') {
      window.RLNetworkCanvas.redraw();
    }
    if (window.RLEquationPlotActive && typeof window.RLEquationPlotActive.redraw === 'function') {
      window.RLEquationPlotActive.redraw();
    }
  }

  /* ------------------------------------------------------------------------
     URL Hash Deep-Linking (#note=ID or #domain=slug)
     ------------------------------------------------------------------------ */
  function syncUrlHashForState() {
    if ($('reader') && $('reader').open && currentReaderItem) {
      const nextHash = `#note=${encodeURIComponent(currentReaderItem.id)}`;
      if (location.hash !== nextHash) {
        try {
          history.replaceState(null, '', nextHash);
        } catch {}
      }
      return;
    }
    if (activeDomain !== 'all') {
      const nextHash = `#domain=${encodeURIComponent(activeDomain)}`;
      if (location.hash !== nextHash) {
        try {
          history.replaceState(null, '', nextHash);
        } catch {}
      }
    } else if (location.hash.startsWith('#note=') || location.hash.startsWith('#domain=')) {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch {}
    }
  }

  function applyHashRoute() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return;
    if (raw.startsWith('note=')) {
      const targetId = decodeURIComponent(raw.slice(5));
      const found = catalog.find(i => i.id.toLowerCase() === targetId.toLowerCase());
      if (found && (found.file || found.body)) {
        openNote(found, { pushHistory: false });
      }
    } else if (raw.startsWith('domain=')) {
      const slug = decodeURIComponent(raw.slice(7));
      if (LS.DOMAIN_MAP.has(slug)) {
        filterLibraryByDomain(slug, true);
      }
    }
  }

  /* ------------------------------------------------------------------------
     12-Domain Complete Landscape & Guided Learning Roadmaps
     ------------------------------------------------------------------------ */
  function filterLibraryByDomain(domainSlug, scroll = true) {
    taxonomyMode = 'domains';
    activeDomain = domainSlug;
    activeCategory = 'All resources';
    activeEra = 'all';
    activeRoadmapIds = null;
    savedOnly = false;
    limit = 18;
    if ($('search')) $('search').value = '';
    syncTaxonomySwitchButtons();
    syncEraButtons();
    render();
    syncUrlHashForState();
    if (scroll) smoothScrollTo($('library'));
  }

  function renderLandscape() {
    const grid = $('landscape-grid');
    if (!grid || !LS.DOMAINS.length) return;
    grid.replaceChildren();

    LS.DOMAINS.forEach(dom => {
      const count = catalog.filter(item => item.domain === dom.id).length;
      const card = document.createElement('article');
      card.className = 'domain-card';
      card.id = `domain-card-${dom.id}`;

      const top = document.createElement('div');
      top.className = 'domain-top';
      const coord = document.createElement('span');
      coord.className = 'domain-coord';
      const idxEl = document.createElement('span');
      idxEl.className = 'domain-index';
      idxEl.textContent = `${dom.index} //`;
      const eraEl = document.createElement('span');
      eraEl.textContent = dom.era;
      coord.append(idxEl, eraEl);

      const countBtn = document.createElement('button');
      countBtn.type = 'button';
      countBtn.className = 'domain-count-btn';
      countBtn.id = `domain-filter-${dom.id}`;
      countBtn.textContent = `${count} papers →`;
      countBtn.addEventListener('click', () => filterLibraryByDomain(dom.id, true));
      top.append(coord, countBtn);

      const h3 = document.createElement('h3');
      h3.textContent = dom.title;

      const summary = document.createElement('p');
      summary.className = 'domain-summary';
      summary.textContent = dom.summary;

      const formula = document.createElement('div');
      formula.className = 'domain-formula';
      formula.append(MM.renderMathElement(dom.formulaTex, false));

      const landmarks = document.createElement('div');
      landmarks.className = 'domain-landmarks';
      dom.landmarks.forEach(noteId => {
        const target = catalog.find(i => i.id === noteId);
        if (!target) return;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'landmark-chip';
        chip.textContent = noteId === 'GRPO-DeepSeek-R1' ? 'GRPO / R1 ↗' : `${noteId} ↗`;
        chip.title = target.title;
        chip.addEventListener('click', () => openNote(target));
        landmarks.append(chip);
      });

      card.append(top, h3, summary, formula, landmarks);
      grid.append(card);
    });
  }

  function renderRoadmaps() {
    const tabsEl = $('roadmap-tabs');
    const stageEl = $('roadmap-stage');
    if (!tabsEl || !stageEl || !LS.LEARNING_PATHS.length) return;

    tabsEl.replaceChildren();
    LS.LEARNING_PATHS.forEach(path => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadmap-tab';
      btn.id = `roadmap-tab-${path.id}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(path.id === activePathId));
      btn.textContent = `${path.code} · ${path.title}`;
      btn.addEventListener('click', () => {
        activePathId = path.id;
        renderRoadmaps();
      });
      tabsEl.append(btn);
    });

    const current = LS.LEARNING_PATHS.find(p => p.id === activePathId) || LS.LEARNING_PATHS[0];
    stageEl.replaceChildren();

    const savedInTrack = current.steps.filter(id => saved.has(id)).length;
    const metaBar = document.createElement('div');
    metaBar.className = 'roadmap-meta-bar';

    const subtitle = document.createElement('p');
    subtitle.textContent = current.subtitle;

    const actions = document.createElement('div');
    actions.className = 'roadmap-meta-actions';
    const progressText = document.createElement('span');
    progressText.textContent = `${savedInTrack}/${current.steps.length} in reading list`;

    const saveTrackBtn = document.createElement('button');
    saveTrackBtn.type = 'button';
    saveTrackBtn.className = 'domain-count-btn';
    saveTrackBtn.id = 'save-active-roadmap';
    saveTrackBtn.textContent = savedInTrack === current.steps.length ? '▰ Saved track' : '▱ Save all 8';
    saveTrackBtn.addEventListener('click', () => {
      current.steps.forEach(id => saved.add(id));
      persistSaved();
      renderRoadmaps();
      render();
      toast(`Added ${current.title} (8 papers) to reading list.`);
    });

    const filterTrackBtn = document.createElement('button');
    filterTrackBtn.type = 'button';
    filterTrackBtn.className = 'domain-count-btn';
    filterTrackBtn.id = 'filter-active-roadmap';
    filterTrackBtn.textContent = 'Load in library ↓';
    filterTrackBtn.addEventListener('click', () => {
      activeDomain = 'all';
      activeCategory = 'All resources';
      activeEra = 'all';
      savedOnly = false;
      mathOnly = false;
      activeRoadmapIds = new Set(current.steps);
      activeRoadmapTitle = current.title;
      if ($('search')) $('search').value = '';
      syncEraButtons();
      render();
      smoothScrollTo($('library'));
    });

    actions.append(progressText, saveTrackBtn, filterTrackBtn);
    metaBar.append(subtitle, actions);

    const stepsGrid = document.createElement('div');
    stepsGrid.className = 'roadmap-steps';
    current.steps.forEach((stepId, idx) => {
      const item = catalog.find(i => i.id === stepId);
      if (!item) return;
      const stepBtn = document.createElement('button');
      stepBtn.type = 'button';
      stepBtn.className = saved.has(stepId) ? 'roadmap-step is-saved' : 'roadmap-step';

      const stepTop = document.createElement('div');
      stepTop.className = 'roadmap-step-top';
      const stepNum = document.createElement('span');
      stepNum.textContent = `${saved.has(stepId) ? '▰ ' : ''}STEP 0${idx + 1}`;
      const stepYr = document.createElement('span');
      stepYr.textContent = String(item.year || '');
      stepTop.append(stepNum, stepYr);

      const stepName = document.createElement('span');
      stepName.className = 'roadmap-step-id';
      stepName.textContent = `${stepId} ↗`;

      const stepSub = document.createElement('span');
      stepSub.className = 'roadmap-step-sub';
      MM.renderInlineInto(stepSub, item.title, { inlineOnly: true });

      stepBtn.append(stepTop, stepName, stepSub);
      stepBtn.addEventListener('click', () => openNote(item));
      stepsGrid.append(stepBtn);
    });

    stageEl.append(metaBar, stepsGrid);
  }

  /* ------------------------------------------------------------------------
     Real-Time Live Stream Strip (#live-stream-strip)
     ------------------------------------------------------------------------ */
  function renderLiveStreamStrip(items) {
    const strip = $('live-stream-strip');
    if (!strip) return;
    strip.replaceChildren();

    const list = (items || []).slice(0, 14);
    if (!list.length) {
      const fallback = catalog
        .filter(i => i.file && i.year >= 2026 && i.id !== '2026' && i.id !== 'README' && i.id !== 'WEBSITE')
        .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
        .slice(0, 8);
      fallback.forEach(item => strip.append(createStreamCard(item)));
      return;
    }

    list.forEach(item => strip.append(createStreamCard(item)));
  }

  function createStreamCard(item) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'stream-card';

    const meta = document.createElement('div');
    meta.className = 'stream-meta';
    const leftMeta = document.createElement('span');
    leftMeta.textContent = item.arxivId
      ? `arXiv:${item.arxivId} · ${item.publishedAt || '2026'}`
      : item.publishedAt || '2026';
    meta.append(leftMeta);

    if (item.isNew) {
      const newBadge = document.createElement('span');
      newBadge.className = 'new-delta-pill';
      newBadge.textContent = 'NEW';
      meta.append(newBadge);
    }

    const title = document.createElement('div');
    title.className = 'stream-title';
    MM.renderInlineInto(title, item.title, { inlineOnly: true });

    const foot = document.createElement('div');
    foot.className = 'stream-foot';
    const domObj = LS.DOMAIN_MAP.get(item.domain);
    const leftFoot = document.createElement('span');
    leftFoot.textContent = item.venue || (domObj ? domObj.shortTitle : item.category);
    const rightFoot = document.createElement('span');
    rightFoot.textContent = 'Read ↗';
    foot.append(leftFoot, rightFoot);

    btn.append(meta, title, foot);
    btn.addEventListener('click', () => openNote(item));
    return btn;
  }

  /* ------------------------------------------------------------------------
     Canonical Equations & 2026 Operators Explorer
     ------------------------------------------------------------------------ */
  function renderEquationsExplorer() {
    const tabsEl = $('equation-tabs');
    const stageEl = $('equation-stage');
    if (!tabsEl || !stageEl) return;

    tabsEl.replaceChildren();
    CANONICAL_EQUATIONS.forEach(eq => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'equation-tab';
      btn.id = `eq-tab-${eq.id}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(eq.id === activeEquationId));
      const era = document.createElement('span');
      era.className = 'equation-tab-era';
      era.textContent = eq.era;
      const title = document.createElement('span');
      title.className = 'equation-tab-title';
      title.textContent = eq.title;
      btn.append(era, title);
      btn.addEventListener('click', () => {
        activeEquationId = eq.id;
        renderEquationsExplorer();
      });
      tabsEl.append(btn);
    });

    const current = CANONICAL_EQUATIONS.find(e => e.id === activeEquationId) || CANONICAL_EQUATIONS[0];
    stageEl.replaceChildren();

    const top = document.createElement('div');
    top.className = 'equation-stage-top';
    const h3 = document.createElement('h3');
    h3.textContent = current.title;
    const sym = document.createElement('span');
    sym.className = 'equation-symbol-tag';
    sym.textContent = current.symbol;
    top.append(h3, sym);

    const display = document.createElement('div');
    display.className = 'equation-display';
    display.append(MM.renderMathElement(current.tex, true));

    const intuition = document.createElement('p');
    intuition.className = 'equation-intuition';
    intuition.textContent = current.intuition;

    const linksRow = document.createElement('div');
    linksRow.className = 'equation-links';
    const label = document.createElement('span');
    label.className = 'equation-links-label';
    label.textContent = 'Explore notes →';
    linksRow.append(label);

    current.notes.forEach(noteId => {
      const target = catalog.find(i => i.id === noteId);
      if (!target) return;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'equation-note-chip';
      chip.textContent =
        noteId === '2026'
          ? '2026 Frontier Guide ↗'
          : noteId === 'GRPO-DeepSeek-R1'
            ? 'GRPO / R1 ↗'
            : `${noteId} ↗`;
      chip.addEventListener('click', () => openNote(target));
      linksRow.append(chip);
    });

    stageEl.append(top, display);
    if (window.RLEquationPlots && typeof window.RLEquationPlots.mountEquationLab === 'function') {
      window.RLEquationPlots.mountEquationLab(stageEl, current.id);
    }
    stageEl.append(intuition, linksRow);
  }

  /* ------------------------------------------------------------------------
     Library Taxonomy Sidebar, Era Filters, Search & Cards
     ------------------------------------------------------------------------ */
  function syncTaxonomySwitchButtons() {
    if ($('tax-mode-domains')) {
      $('tax-mode-domains').setAttribute('aria-pressed', String(taxonomyMode === 'domains'));
    }
    if ($('tax-mode-tracks')) {
      $('tax-mode-tracks').setAttribute('aria-pressed', String(taxonomyMode === 'tracks'));
    }
  }

  function syncEraButtons() {
    document.querySelectorAll('.era-pill').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.era === activeEra));
    });
  }

  function renderSidebarTaxonomy() {
    const mathTotal = catalog.filter(item => item.hasMath).length;
    const liveTotal = catalog.filter(item => item.live).length;

    if ($('resource-count')) $('resource-count').textContent = String(catalog.length);
    if ($('domain-stat')) $('domain-stat').textContent = String(LS.DOMAINS.length || 12);
    if ($('math-total-stat')) $('math-total-stat').textContent = String(mathTotal);
    if ($('live-stat-count')) {
      $('live-stat-count').textContent = liveTotal ? `${liveTotal} live` : 'Live sync';
    }
    if ($('math-filter')) {
      $('math-filter').setAttribute('aria-pressed', String(mathOnly));
      $('math-filter').textContent = `∑ Formal math (${mathTotal})`;
    }
    if ($('era-live')) {
      $('era-live').textContent = liveTotal ? `● Live stream (${liveTotal})` : '● Live stream';
    }

    const container = $('categories');
    if (!container) return;
    container.replaceChildren();

    if (taxonomyMode === 'domains' && LS.DOMAINS.length) {
      const allBtn = document.createElement('button');
      allBtn.type = 'button';
      allBtn.className = 'category';
      const allSelected = activeDomain === 'all' && !savedOnly && !activeRoadmapIds;
      allBtn.classList.toggle('active', allSelected);
      allBtn.setAttribute('aria-pressed', String(allSelected));
      allBtn.append(document.createTextNode('All 12 domains'));
      const allCount = document.createElement('span');
      allCount.textContent = String(catalog.length);
      allBtn.append(allCount);
      allBtn.addEventListener('click', () => {
        activeDomain = 'all';
        activeRoadmapIds = null;
        savedOnly = false;
        limit = 12;
        render();
        syncUrlHashForState();
      });
      container.append(allBtn);

      LS.DOMAINS.forEach(dom => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'category';
        const isSelected = activeDomain === dom.id && !savedOnly && !activeRoadmapIds;
        btn.classList.toggle('active', isSelected);
        btn.setAttribute('aria-pressed', String(isSelected));
        btn.append(document.createTextNode(dom.shortTitle));
        const cnt = document.createElement('span');
        cnt.textContent = String(catalog.filter(i => i.domain === dom.id).length);
        btn.append(cnt);
        btn.addEventListener('click', () => {
          activeDomain = dom.id;
          activeCategory = 'All resources';
          activeRoadmapIds = null;
          savedOnly = false;
          limit = 12;
          render();
          syncUrlHashForState();
        });
        container.append(btn);
      });
      return;
    }

    const groups = [...new Set(catalog.map(item => item.category))].sort();
    ['All resources', ...groups].forEach(category => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category';
      const isSelected = activeCategory === category && !savedOnly && !activeRoadmapIds;
      button.classList.toggle('active', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
      button.append(document.createTextNode(category));

      const count = document.createElement('span');
      count.textContent = String(
        category === 'All resources'
          ? catalog.length
          : catalog.filter(i => i.category === category).length
      );
      button.append(count);

      button.addEventListener('click', () => {
        activeCategory = category;
        activeDomain = 'all';
        activeRoadmapIds = null;
        savedOnly = false;
        limit = 12;
        render();
        syncUrlHashForState();
      });
      container.append(button);
    });
  }

  function persistSaved() {
    try {
      localStorage.setItem('rl-atlas-saved', JSON.stringify([...saved]));
    } catch {
      toast('Reading list is available for this session.');
    }
  }

  function toggleSave(item) {
    if (!item) return;
    if (saved.has(item.id)) saved.delete(item.id);
    else saved.add(item.id);
    persistSaved();
    syncReaderSaveButton();
    renderRoadmaps();
    render();
  }

  function matchesEra(item) {
    if (activeEra === 'all') return true;
    if (activeEra === 'live') return Boolean(item.live);
    if (activeEra === '2026') return (item.year || 0) >= 2026;
    if (activeEra === 'modern') return !item.live && item.year >= 2020 && item.year <= 2025;
    if (activeEra === 'canon') return !item.live && item.year <= 2019;
    return true;
  }

  function hasNonDefaultFilters(query) {
    return (
      Boolean(query) ||
      activeDomain !== 'all' ||
      activeCategory !== 'All resources' ||
      activeEra !== 'all' ||
      Boolean(activeRoadmapIds) ||
      savedOnly ||
      mathOnly
    );
  }

  function resetAllFilters() {
    activeDomain = 'all';
    activeCategory = 'All resources';
    activeEra = 'all';
    activeRoadmapIds = null;
    activeRoadmapTitle = '';
    savedOnly = false;
    mathOnly = false;
    limit = 12;
    if ($('search')) $('search').value = '';
    syncEraButtons();
    render();
    syncUrlHashForState();
  }

  function render() {
    const query = ($('search') ? $('search').value : '').trim().toLowerCase();
    const items = catalog.filter(i => {
      if (taxonomyMode === 'domains' && activeDomain !== 'all' && i.domain !== activeDomain) return false;
      if (taxonomyMode === 'tracks' && activeCategory !== 'All resources' && i.category !== activeCategory) return false;
      if (activeRoadmapIds && !activeRoadmapIds.has(i.id)) return false;
      if (savedOnly && !saved.has(i.id)) return false;
      if (mathOnly && !i.hasMath) return false;
      if (!matchesEra(i)) return false;
      if (!query) return true;
      const domObj = LS.DOMAIN_MAP.get(i.domain);
      const domText = domObj ? `${domObj.title} ${domObj.shortTitle}` : '';
      return `${i.title} ${i.id} ${i.category} ${domText} ${i.authors || ''} ${i.venue || ''} ${i.year || ''} ${i.description} ${i.body}`
        .toLowerCase()
        .includes(query);
    });

    const sort = $('sort') ? $('sort').value : 'featured';
    items.sort((a, b) => {
      if (activeRoadmapIds) {
        const current = LS.LEARNING_PATHS.find(p => p.title === activeRoadmapTitle);
        if (current) return current.steps.indexOf(a.id) - current.steps.indexOf(b.id);
      }
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'za') return b.title.localeCompare(a.title);
      if (sort === 'chronological') {
        return (a.year || 2018) - (b.year || 2018) || a.title.localeCompare(b.title);
      }
      if (sort === 'latest') {
        const da = a.publishedAt || `${a.year || 2018}-01-01`;
        const db = b.publishedAt || `${b.year || 2018}-01-01`;
        if (da !== db) return db.localeCompare(da);
        if (Boolean(a.live) !== Boolean(b.live)) return a.live ? -1 : 1;
      }
      return (
        (featured.includes(a.id) ? featured.indexOf(a.id) : 999) -
        (featured.includes(b.id) ? featured.indexOf(b.id) : 999)
      );
    });

    const qualifiers = [];
    if (savedOnly) qualifiers.push('saved');
    if (mathOnly) qualifiers.push('formal-math');
    if (activeEra !== 'all') qualifiers.push(activeEra === 'live' ? 'live' : activeEra);
    const qualText = qualifiers.length ? qualifiers.join(' · ') + ' ' : '';

    let scopeLabel = 'in the collection';
    if (activeRoadmapIds) {
      scopeLabel = `· ${activeRoadmapTitle}`;
    } else if (taxonomyMode === 'domains' && activeDomain !== 'all') {
      const d = LS.DOMAIN_MAP.get(activeDomain);
      scopeLabel = d ? `· ${d.title}` : '';
    } else if (taxonomyMode === 'tracks' && activeCategory !== 'All resources') {
      scopeLabel = `· ${activeCategory}`;
    }

    if ($('result-count')) {
      $('result-count').textContent = `${items.length} ${qualText}resources ${scopeLabel}`;
    }
    if ($('clear-active-filters')) {
      $('clear-active-filters').hidden = !hasNonDefaultFilters(query);
    }
    if ($('saved-count')) $('saved-count').textContent = String(saved.size);
    if ($('saved-top')) $('saved-top').setAttribute('aria-pressed', String(savedOnly));

    const cardsEl = $('cards');
    if (!cardsEl) return;
    cardsEl.replaceChildren();

    items.slice(0, limit).forEach((item, index) => {
      const hasNote = Boolean(item.file || item.body);
      const card = document.createElement('article');
      card.className = item.live ? 'resource is-live' : 'resource';

      const top = document.createElement('div');
      top.className = 'card-top';

      const badges = document.createElement('div');
      badges.className = 'card-badges';
      const idxSpan = document.createElement('span');
      idxSpan.className = 'resource-index';
      idxSpan.textContent = `#${String(index + 1).padStart(3, '0')}`;
      badges.append(idxSpan);

      if (item.isNew) {
        const newPill = document.createElement('span');
        newPill.className = 'new-delta-pill';
        newPill.textContent = 'NEW';
        badges.append(newPill);
      }

      if (item.hasMath) {
        const mathBadge = document.createElement('span');
        mathBadge.className = 'math-pill';
        mathBadge.textContent = '∑ FORMAL';
        mathBadge.title = 'Includes typeset mathematical equations';
        badges.append(mathBadge);
      }

      const bookmark = document.createElement('button');
      bookmark.type = 'button';
      bookmark.className = 'save';
      bookmark.textContent = saved.has(item.id) ? '▰' : '▱';
      bookmark.setAttribute('aria-label', `${saved.has(item.id) ? 'Remove' : 'Save'} ${item.title}`);
      bookmark.setAttribute('aria-pressed', String(saved.has(item.id)));
      bookmark.addEventListener('click', () => toggleSave(item));
      top.append(badges, bookmark);

      const domObj = LS.DOMAIN_MAP.get(item.domain);
      const tag = document.createElement('div');
      tag.className = 'tag';
      const baseTag = domObj ? domObj.shortTitle : item.category;
      tag.textContent = item.venue
        ? `${baseTag} · ${item.venue}`
        : item.year
          ? `${baseTag} · ${item.year}`
          : baseTag;

      const title = document.createElement('h3');
      MM.renderInlineInto(title, item.title, { inlineOnly: true });

      const description = document.createElement('p');
      description.className = 'description';
      MM.renderInlineInto(description, item.description, { inlineOnly: true });

      const bottom = document.createElement('div');
      bottom.className = 'card-bottom';
      const kind = document.createElement('span');
      kind.textContent = item.live
        ? item.venue
          ? `LIVE · ${item.venue.toUpperCase()}`
          : `LIVE ARXIV · ${item.publishedAt || '2026'}`
        : item.venue
          ? `${item.venue.toUpperCase()} · NOTE`
          : item.file
            ? 'RESEARCH NOTE'
            : 'EXTERNAL RESOURCE';
      if (item.live || item.venue) kind.className = 'live-badge';

      const open = document.createElement(hasNote ? 'button' : 'a');
      if (hasNote) open.type = 'button';
      open.className = 'open-resource';
      open.textContent = item.live
        ? 'Open live note ↗'
        : hasNote
          ? 'Open research note ↗'
          : 'Open external link ↗';

      if (hasNote) {
        open.addEventListener('click', () => openNote(item));
      } else {
        open.href = MM.safeURL(item.url);
        open.target = '_blank';
        open.rel = 'noopener noreferrer';
      }

      bottom.append(kind, open);
      card.append(top, tag, title, description, bottom);

      card.addEventListener('pointermove', event => {
        if (reduced.matches || event.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        const rx = -(event.clientY - r.top - r.height / 2) / 68;
        const ry = (event.clientX - r.left - r.width / 2) / 58;
        card.style.transform = `perspective(960px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });

      cardsEl.append(card);
    });

    if ($('empty')) $('empty').hidden = items.length > 0;
    if ($('load-more')) $('load-more').hidden = items.length <= limit;
    renderSidebarTaxonomy();
  }

  /* ------------------------------------------------------------------------
     Scientific Reader Modal (Progress, History, TOC, BibTeX, Related Notes)
     ------------------------------------------------------------------------ */
  function resolveLocalNote(filename) {
    return catalog.find(entry => entry.file && entry.file === filename) || null;
  }

  function syncReaderSaveButton() {
    const btn = $('reader-save');
    if (!btn || !currentReaderItem) return;
    const isSaved = saved.has(currentReaderItem.id);
    btn.textContent = isSaved ? '▰ Saved' : '▱ Save';
    btn.setAttribute('aria-pressed', String(isSaved));
  }

  function updateReaderProgress() {
    const dialog = $('reader');
    const fill = $('reader-progress');
    if (!dialog || !fill) return;
    const maxScroll = dialog.scrollHeight - dialog.clientHeight;
    const pct = maxScroll > 8 ? Math.min(100, Math.max(0, (dialog.scrollTop / maxScroll) * 100)) : 100;
    fill.style.width = `${pct.toFixed(1)}%`;
  }

  function buildBibtexForItem(item) {
    const cleanKey = String(item.id || 'deeprl').replace(/[^A-Za-z0-9]/g, '').toLowerCase() + (item.year || 2026);
    const cleanTitle = String(item.title || '').replace(/\$/g, '').replace(/[{}]/g, '');
    const authorStr = (item.authors || 'Deep RL Atlas Research Note')
      .replace(/\s+et al\.?$/i, ' and others')
      .replace(/,\s+/g, ' and ');
    const yr = item.year || 2026;
    const url = item.arxivId
      ? `https://arxiv.org/abs/${item.arxivId}`
      : item.url && item.url.startsWith('http')
        ? item.url
        : `https://tigerneil.github.io/awesome-deep-rl/#note=${encodeURIComponent(item.id)}`;

    if (item.venue) {
      return `@inproceedings{${cleanKey},\n  title = {${cleanTitle}},\n  author = {${authorStr}},\n  booktitle = {${item.venue}},\n  year = {${yr}},\n  url = {${url}}\n}`;
    }
    const journal = item.arxivId ? `arXiv preprint arXiv:${item.arxivId}` : 'Deep RL Atlas Curated Synthesis';
    return `@article{${cleanKey},\n  title = {${cleanTitle}},\n  author = {${authorStr}},\n  journal = {${journal}},\n  year = {${yr}},\n  url = {${url}}\n}`;
  }

  function findRelatedNotes(item) {
    const related = [];
    const seen = new Set([item.id, 'README', 'WEBSITE']);

    // 1. Explicit Markdown links to other notes
    const body = item.body || '';
    for (const m of body.matchAll(/\]\(([A-Za-z0-9_+-]+)\.md\)/g)) {
      const target = catalog.find(i => i.id === m[1]);
      if (target && !seen.has(target.id)) {
        seen.add(target.id);
        related.push(target);
      }
      if (related.length >= 4) return related;
    }

    // 2. Landmark notes in the same canonical domain
    const domObj = LS.DOMAIN_MAP.get(item.domain);
    if (domObj && Array.isArray(domObj.landmarks)) {
      for (const lmId of domObj.landmarks) {
        const target = catalog.find(i => i.id === lmId);
        if (target && !seen.has(target.id)) {
          seen.add(target.id);
          related.push(target);
        }
        if (related.length >= 4) return related;
      }
    }

    // 3. Other math-typeset notes in the same domain
    for (const cand of catalog) {
      if (cand.domain === item.domain && cand.file && !seen.has(cand.id)) {
        seen.add(cand.id);
        related.push(cand);
      }
      if (related.length >= 4) break;
    }
    return related;
  }

  function openNote(item, opts = {}) {
    if (!item) return;
    const pushHistory = opts.pushHistory !== false;
    if (pushHistory && currentReaderItem && currentReaderItem.id !== item.id && $('reader') && $('reader').open) {
      readerHistory.push(currentReaderItem);
    } else if (!$('reader') || !$('reader').open) {
      readerHistory = [];
    }

    currentReaderItem = item;
    if (liveRadar) {
      liveRadar.markItemSeen(item);
      renderLiveStreamStrip(liveItemsCache);
    }

    if ($('reader-back')) {
      $('reader-back').hidden = readerHistory.length === 0;
    }
    syncReaderSaveButton();

    const content = $('reader-content');
    content.replaceChildren();

    // Telemetry metadata strip
    const metaStrip = document.createElement('div');
    metaStrip.className = 'reader-meta-strip';

    const domObj = LS.DOMAIN_MAP.get(item.domain);
    if (domObj) {
      const domChip = document.createElement('span');
      domChip.className = 'reader-meta-chip accent';
      domChip.textContent = domObj.shortTitle;
      metaStrip.append(domChip);
    } else {
      const catChip = document.createElement('span');
      catChip.className = 'reader-meta-chip';
      catChip.textContent = item.category || 'Research note';
      metaStrip.append(catChip);
    }

    if (item.venue) {
      const venueChip = document.createElement('span');
      venueChip.className = 'reader-meta-chip signal';
      venueChip.textContent = item.venue;
      metaStrip.append(venueChip);
    }
    if (item.publishedAt || item.year) {
      const dateChip = document.createElement('span');
      dateChip.className = 'reader-meta-chip';
      dateChip.textContent = item.publishedAt || String(item.year);
      metaStrip.append(dateChip);
    }
    if (item.hasMath) {
      const mathChip = document.createElement('span');
      mathChip.className = 'reader-meta-chip accent';
      mathChip.textContent = '∑ Typeset LaTeX';
      metaStrip.append(mathChip);
    }
    content.append(metaStrip);

    // Note display heading (uses h2.reader-note-title so document keeps a single h1)
    const noteHeading = document.createElement('h2');
    noteHeading.className = 'reader-note-title';
    MM.renderInlineInto(noteHeading, item.title, { inlineOnly: true });
    content.append(noteHeading);

    // Source links bar
    const sourceRow = document.createElement('div');
    sourceRow.className = 'reader-source-row';

    const primaryLink = document.createElement('a');
    primaryLink.href = MM.safeURL(item.file || item.url);
    primaryLink.textContent = item.file
      ? `Raw Markdown (${item.file}) ↗`
      : `arXiv Abstract (${item.arxivId || 'online'}) ↗`;
    primaryLink.target = '_blank';
    primaryLink.rel = 'noopener noreferrer';
    sourceRow.append(primaryLink);

    if (item.arxivId) {
      if (item.file) {
        const arxivLink = document.createElement('a');
        arxivLink.href = `https://arxiv.org/abs/${item.arxivId}`;
        arxivLink.textContent = `arXiv:${item.arxivId} ↗`;
        arxivLink.target = '_blank';
        arxivLink.rel = 'noopener noreferrer';
        sourceRow.append(arxivLink);
      }
      const pdfLink = document.createElement('a');
      pdfLink.href = `https://arxiv.org/pdf/${item.arxivId}`;
      pdfLink.textContent = 'arXiv PDF ↗';
      pdfLink.target = '_blank';
      pdfLink.rel = 'noopener noreferrer';
      sourceRow.append(pdfLink);
    }

    if (domObj) {
      const domJump = document.createElement('button');
      domJump.type = 'button';
      domJump.className = 'reader-domain-jump';
      domJump.textContent = `Explore ${domObj.title} →`;
      domJump.addEventListener('click', () => {
        $('reader').close();
        filterLibraryByDomain(domObj.id, true);
      });
      sourceRow.append(domJump);
    }
    content.append(sourceRow);

    const tocPlaceholder = document.createElement('div');
    content.append(tocPlaceholder);

    // Render full scientific Markdown body with display & inline math
    MM.renderMarkdownInto(content, item.body || item.description || '', {
      skipLeadingH1: true,
      skipLeadingTitleText: item.title,
      resolveLocalNote,
      onOpenNote: nextItem => openNote(nextItem, { pushHistory: true })
    });

    // Build clickable Section Outline (TOC) if >= 2 h2 sections exist
    const h2List = [...content.querySelectorAll('h2:not(.reader-note-title)')];
    if (h2List.length >= 2 && h2List.length <= 16) {
      const toc = document.createElement('nav');
      toc.className = 'reader-toc';
      toc.setAttribute('aria-label', 'Note sections');
      const tocLabel = document.createElement('span');
      tocLabel.className = 'reader-toc-label';
      tocLabel.textContent = 'Sections';
      toc.append(tocLabel);

      h2List.forEach((sec, idxS) => {
        const secId = `note-sec-${idxS}`;
        sec.id = secId;
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'reader-toc-chip';
        chip.textContent = sec.textContent.slice(0, 38);
        chip.addEventListener('click', () => {
          sec.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
        });
        toc.append(chip);
      });
      tocPlaceholder.replaceWith(toc);
    } else {
      tocPlaceholder.remove();
    }

    // Connected in the Landscape footer
    const related = findRelatedNotes(item);
    if (related.length) {
      const relWrap = document.createElement('section');
      relWrap.className = 'reader-related';
      const relHead = document.createElement('div');
      relHead.className = 'reader-related-head';
      relHead.textContent = 'Connected in the Deep RL Landscape';
      const relGrid = document.createElement('div');
      relGrid.className = 'reader-related-grid';

      related.forEach(relItem => {
        const rBtn = document.createElement('button');
        rBtn.type = 'button';
        rBtn.className = 'reader-related-btn';
        const rMeta = document.createElement('span');
        const rDom = LS.DOMAIN_MAP.get(relItem.domain);
        rMeta.textContent = `${rDom ? rDom.shortTitle : relItem.category} · ${relItem.year || ''}`;
        const rTitle = document.createElement('strong');
        MM.renderInlineInto(rTitle, `${relItem.id} — ${relItem.title}`, { inlineOnly: true });
        rBtn.append(rMeta, rTitle);
        rBtn.addEventListener('click', () => openNote(relItem, { pushHistory: true }));
        relGrid.append(rBtn);
      });

      relWrap.append(relHead, relGrid);
      content.append(relWrap);
    }

    const dialog = $('reader');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    updateReaderProgress();
    syncUrlHashForState();
  }

  /* ------------------------------------------------------------------------
     Reading List Markdown Export
     ------------------------------------------------------------------------ */
  function exportReadingListMarkdown() {
    let targetItems = catalog.filter(i => saved.has(i.id));
    let headerNote = 'Personal Saved Reading List';
    if (!targetItems.length) {
      const defaultPath = LS.LEARNING_PATHS.find(p => p.id === activePathId) || LS.LEARNING_PATHS[0];
      targetItems = defaultPath
        ? defaultPath.steps.map(id => catalog.find(i => i.id === id)).filter(Boolean)
        : catalog.slice(0, 10);
      headerNote = defaultPath ? `${defaultPath.code}: ${defaultPath.title} (Starter Pack)` : 'Featured Pack';
    }

    const lines = [
      `# Deep RL Atlas — ${headerNote}`,
      '',
      `Exported on ${new Date().toISOString().slice(0, 10)} from https://tigerneil.github.io/awesome-deep-rl/`,
      ''
    ];
    targetItems.forEach((item, idx) => {
      const dom = LS.DOMAIN_MAP.get(item.domain);
      const url = item.arxivId
        ? `https://arxiv.org/abs/${item.arxivId}`
        : item.url && item.url.startsWith('http')
          ? item.url
          : `https://tigerneil.github.io/awesome-deep-rl/${item.file || ''}`;
      lines.push(`## ${idx + 1}. ${item.title}`);
      lines.push(`- **Domain**: ${dom ? dom.title : item.category} (${item.year || 'RL'})`);
      if (item.venue) lines.push(`- **Venue**: ${item.venue}`);
      lines.push(`- **Source**: ${url}`);
      lines.push(`- **Summary**: ${item.description}`);
      lines.push('');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const dlUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = dlUrl;
    a.download = 'deep-rl-reading-list.md';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(dlUrl), 1000);
    toast(
      saved.size
        ? `Exported ${targetItems.length} saved papers to deep-rl-reading-list.md.`
        : `Reading list was empty — exported ${headerNote} (8 papers).`
    );
  }

  /* ------------------------------------------------------------------------
     Instant ⌘K / Ctrl+K Command Palette
     ------------------------------------------------------------------------ */
  function openCommandPalette() {
    const dlg = $('cmd-palette');
    const input = $('cmd-input');
    if (!dlg || !input) return;
    if (!dlg.open) dlg.showModal();
    input.value = '';
    cmdSelectedIdx = 0;
    renderCommandResults('');
    input.focus();
  }

  function renderCommandResults(rawQuery) {
    const listEl = $('cmd-results');
    if (!listEl) return;
    listEl.replaceChildren();
    const q = String(rawQuery || '').trim().toLowerCase();

    const actions = [
      {
        group: 'Quick Actions',
        title: 'Sync live online research feeds now',
        sub: 'Fetch newest arXiv & Hugging Face RL preprints immediately',
        tag: 'LIVE SYNC',
        run: () => liveRadar && liveRadar.syncNow({ manual: true })
      },
      {
        group: 'Quick Actions',
        title: 'Open 2026 Deep RL Frontier Briefing',
        sub: 'Comprehensive synthesis of 74 conference & frontier RL notes',
        tag: 'GUIDE',
        run: () => openNote(catalog.find(i => i.id === '2026'))
      },
      {
        group: 'Quick Actions',
        title: 'Surprise me with a random research note',
        sub: 'Jump into a curated mathematical derivation or 2026 study',
        tag: 'RANDOM',
        run: () => {
          const notes = catalog.filter(i => (i.file || i.body) && i.id !== 'README');
          openNote(notes[Math.floor(Math.random() * notes.length)]);
        }
      },
      {
        group: 'Quick Actions',
        title: 'Export reading list as Markdown (.md)',
        sub: `${saved.size} saved resources ready to download`,
        tag: 'EXPORT',
        run: exportReadingListMarkdown
      },
      {
        group: 'Quick Actions',
        title: `Switch to ${document.documentElement.dataset.theme === 'light' ? 'Obsidian dark' : 'Alabaster light'} theme`,
        sub: 'Toggle scientific instrument color palette',
        tag: 'THEME',
        run: () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', true)
      }
    ];

    const domainEntries = LS.DOMAINS.map(d => ({
      group: '12 Canonical Domains',
      title: `${d.index} · ${d.title}`,
      sub: d.summary,
      tag: d.era,
      run: () => filterLibraryByDomain(d.id, true)
    }));

    const eqEntries = CANONICAL_EQUATIONS.map(eq => ({
      group: 'Mathematical Operators',
      title: eq.title,
      sub: eq.intuition,
      tag: eq.symbol,
      run: () => {
        activeEquationId = eq.id;
        renderEquationsExplorer();
        smoothScrollTo($('equations-section'));
      }
    }));

    const matched = [];
    if (!q) {
      matched.push(...actions.slice(0, 3), ...domainEntries.slice(0, 6));
      baseFeatured.slice(0, 10).forEach(fid => {
        const it = catalog.find(c => c.id === fid);
        if (it) {
          matched.push({
            group: 'Featured Research Notes',
            title: `${it.id} — ${it.title}`,
            sub: it.description,
            tag: it.venue || String(it.year || 'NOTE'),
            run: () => openNote(it)
          });
        }
      });
    } else {
      const matchEntry = e => `${e.title} ${e.sub} ${e.tag}`.toLowerCase().includes(q);
      matched.push(...actions.filter(matchEntry));
      matched.push(...domainEntries.filter(matchEntry));
      matched.push(...eqEntries.filter(matchEntry));

      const paperHits = catalog
        .filter(it =>
          `${it.id} ${it.title} ${it.category} ${it.venue || ''} ${it.authors || ''} ${it.year || ''} ${it.description}`
            .toLowerCase()
            .includes(q)
        )
        .slice(0, 18);

      paperHits.forEach(it => {
        matched.push({
          group: it.live ? 'Live Online Stream' : 'Research Corpus',
          title: it.file && it.id !== it.title ? `${it.id} — ${it.title}` : it.title,
          sub: it.description,
          tag: it.live ? `LIVE · ${it.publishedAt || '2026'}` : it.venue || String(it.year || 'NOTE'),
          run: () => {
            if (it.file || it.body) openNote(it);
            else window.open(MM.safeURL(it.url), '_blank', 'noopener,noreferrer');
          }
        });
      });
    }

    cmdMatches = matched;
    if (cmdSelectedIdx >= cmdMatches.length) cmdSelectedIdx = 0;

    if (!cmdMatches.length) {
      const empty = document.createElement('div');
      empty.className = 'cmd-empty';
      empty.textContent = 'No matching papers, domains, or operators found.';
      listEl.append(empty);
      return;
    }

    let lastGroup = '';
    cmdMatches.forEach((entry, idx) => {
      if (entry.group !== lastGroup) {
        lastGroup = entry.group;
        const gEl = document.createElement('div');
        gEl.className = 'cmd-group-label';
        gEl.textContent = entry.group;
        listEl.append(gEl);
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cmd-item';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', String(idx === cmdSelectedIdx));

      const main = document.createElement('div');
      main.className = 'cmd-item-main';
      const tEl = document.createElement('span');
      tEl.className = 'cmd-item-title';
      tEl.textContent = entry.title.replace(/\$/g, '');
      const sEl = document.createElement('span');
      sEl.className = 'cmd-item-sub';
      sEl.textContent = entry.sub.replace(/\$/g, '');
      main.append(tEl, sEl);

      const tagEl = document.createElement('span');
      tagEl.className = 'cmd-item-tag';
      tagEl.textContent = entry.tag;

      btn.append(main, tagEl);
      btn.addEventListener('mouseenter', () => {
        cmdSelectedIdx = idx;
        syncCmdSelection(false);
      });
      btn.addEventListener('click', () => {
        $('cmd-palette').close();
        entry.run();
      });
      listEl.append(btn);
    });
  }

  function syncCmdSelection(scrollIntoView = true) {
    const items = [...document.querySelectorAll('#cmd-results .cmd-item')];
    items.forEach((el, idx) => {
      const sel = idx === cmdSelectedIdx;
      el.setAttribute('aria-selected', String(sel));
      if (sel && scrollIntoView) el.scrollIntoView({ block: 'nearest' });
    });
  }

  /* ------------------------------------------------------------------------
     Real-Time Research Radar Initialization
     ------------------------------------------------------------------------ */
  const liveRadar =
    window.RLLiveRadar && typeof window.RLLiveRadar.createLiveRadar === 'function'
      ? window.RLLiveRadar.createLiveRadar({
          curatedArxivIds,
          curatedTitles,
          onItemsUpdated(items, latestDate, meta = {}) {
            liveItemsCache = items;
            catalog = [...baseCatalog, ...items];
            const liveIds = items.map(i => i.id);
            featured = [
              ...baseFeatured.slice(0, 12),
              ...liveIds.slice(0, 6),
              ...baseFeatured.slice(12),
              ...liveIds.slice(6)
            ];

            if ($('frontier-update-summary') && items.length) {
              const curated2026 = baseCatalog.filter(i => i.file && i.year >= 2026 && i.id !== 'README' && i.id !== 'WEBSITE' && i.id !== '2026').length;
              const newCount = items.filter(i => i.isNew).length;
              const deltaClause = newCount ? ` (${newCount} newly arrived)` : '';
              $('frontier-update-summary').textContent =
                `Streaming ${items.length} live auto-indexed preprints${deltaClause} through ${latestDate} alongside ${curated2026} curated 2026 conference & frontier syntheses across all 12 canonical Deep RL domains.`;
            }

            renderLiveStreamStrip(items);
            renderLandscape();
            render();

            if (meta.manual) {
              if (meta.source === 'unchanged') toast('Already up to date with latest public feeds.');
              else toast(`Synced ${items.length} live preprints through ${latestDate}.`);
            } else if (meta.source === 'network' && meta.newlyDiscoveredCount > 0) {
              toast(`+${meta.newlyDiscoveredCount} new RL preprints arrived in Live Radar.`);
            }
          },
          onStatusTick(state) {
            if ($('live-status')) $('live-status').textContent = state.statusText;
            if ($('radar-pulse-dot')) {
              $('radar-pulse-dot').classList.toggle('is-syncing', Boolean(state.syncing));
            }
            if ($('sync-live')) {
              $('sync-live').disabled = Boolean(state.syncing);
              $('sync-live').textContent = state.syncing ? '↻ Syncing…' : '↻ Sync now';
            }
            if ($('toggle-autosync')) {
              $('toggle-autosync').setAttribute('aria-pressed', String(state.autoSync));
              $('toggle-autosync').textContent = state.autoSync ? 'Auto-sync: ON' : 'Auto-sync: PAUSED';
            }
            if ($('live-stat-sub')) {
              $('live-stat-sub').textContent = state.autoSync
                ? `Auto-sync 5m · through ${state.latestDate}`
                : `Paused · through ${state.latestDate}`;
            }
          }
        })
      : null;

  /* ------------------------------------------------------------------------
     Event Wiring & Boot
     ------------------------------------------------------------------------ */
  if ($('theme-toggle')) {
    $('theme-toggle').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next, true);
    });
  }

  if ($('open-cmd-palette')) {
    $('open-cmd-palette').addEventListener('click', openCommandPalette);
  }
  if ($('close-cmd-palette')) {
    $('close-cmd-palette').addEventListener('click', () => $('cmd-palette').close());
  }
  if ($('cmd-input')) {
    $('cmd-input').addEventListener('input', e => {
      cmdSelectedIdx = 0;
      renderCommandResults(e.target.value);
    });
    $('cmd-input').addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (cmdMatches.length) {
          cmdSelectedIdx = (cmdSelectedIdx + 1) % cmdMatches.length;
          syncCmdSelection();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdMatches.length) {
          cmdSelectedIdx = (cmdSelectedIdx - 1 + cmdMatches.length) % cmdMatches.length;
          syncCmdSelection();
        }
      } else if (e.key === 'Enter' && cmdMatches[cmdSelectedIdx]) {
        e.preventDefault();
        const chosen = cmdMatches[cmdSelectedIdx];
        $('cmd-palette').close();
        chosen.run();
      }
    });
  }
  if ($('cmd-palette')) {
    $('cmd-palette').addEventListener('click', event => {
      if (event.target === $('cmd-palette')) {
        const r = $('cmd-palette').getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) {
          $('cmd-palette').close();
        }
      }
    });
  }

  if ($('reader')) {
    $('reader').addEventListener('scroll', updateReaderProgress, { passive: true });
    $('reader').addEventListener('close', () => {
      readerHistory = [];
      syncUrlHashForState();
    });
    $('reader').addEventListener('click', event => {
      if (event.target === $('reader')) {
        const r = $('reader').getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) {
          $('reader').close();
        }
      }
    });
  }

  if ($('close-reader')) $('close-reader').addEventListener('click', () => $('reader').close());
  if ($('reader-back')) {
    $('reader-back').addEventListener('click', () => {
      const prev = readerHistory.pop();
      if (prev) openNote(prev, { pushHistory: false });
    });
  }
  if ($('reader-save')) {
    $('reader-save').addEventListener('click', () => toggleSave(currentReaderItem));
  }

  if ($('copy-note-bibtex')) {
    $('copy-note-bibtex').addEventListener('click', async () => {
      if (!currentReaderItem) return;
      const bib = buildBibtexForItem(currentReaderItem);
      try {
        await navigator.clipboard.writeText(bib);
        toast('Copied BibTeX citation to clipboard.');
      } catch {
        toast('Clipboard copy unavailable in this context.');
      }
    });
  }

  if ($('copy-note-link')) {
    $('copy-note-link').addEventListener('click', async () => {
      if (!currentReaderItem) return;
      const shareUrl = `${location.origin}${location.pathname}#note=${encodeURIComponent(currentReaderItem.id)}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast('Copied shareable direct link to note.');
      } catch {
        toast('Clipboard copy unavailable in this context.');
      }
    });
  }

  if ($('copy-note-md')) {
    $('copy-note-md').addEventListener('click', async () => {
      if (!currentReaderItem) return;
      const text = currentReaderItem.body || `${currentReaderItem.title}\n${currentReaderItem.url}`;
      try {
        await navigator.clipboard.writeText(text);
        toast('Copied research note & LaTeX source.');
      } catch {
        toast('Clipboard copy unavailable in this context.');
      }
    });
  }

  if ($('tax-mode-domains')) {
    $('tax-mode-domains').addEventListener('click', () => {
      taxonomyMode = 'domains';
      activeCategory = 'All resources';
      syncTaxonomySwitchButtons();
      render();
    });
  }
  if ($('tax-mode-tracks')) {
    $('tax-mode-tracks').addEventListener('click', () => {
      taxonomyMode = 'tracks';
      activeDomain = 'all';
      syncTaxonomySwitchButtons();
      render();
      syncUrlHashForState();
    });
  }

  document.querySelectorAll('.era-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeEra = btn.dataset.era || 'all';
      limit = 12;
      syncEraButtons();
      render();
    });
  });

  if ($('search')) {
    $('search').addEventListener('input', () => {
      limit = 12;
      render();
    });
  }
  if ($('sort')) $('sort').addEventListener('change', render);
  if ($('load-more')) {
    $('load-more').addEventListener('click', () => {
      limit += 12;
      render();
    });
  }
  if ($('reset')) $('reset').addEventListener('click', resetAllFilters);
  if ($('clear-active-filters')) $('clear-active-filters').addEventListener('click', resetAllFilters);
  if ($('export-reading-list')) $('export-reading-list').addEventListener('click', exportReadingListMarkdown);

  if ($('saved-top')) {
    $('saved-top').addEventListener('click', () => {
      savedOnly = !savedOnly;
      activeDomain = 'all';
      activeCategory = 'All resources';
      activeRoadmapIds = null;
      if ($('search')) $('search').value = '';
      limit = 18;
      render();
      smoothScrollTo($('library'));
    });
  }
  if ($('math-filter')) {
    $('math-filter').addEventListener('click', () => {
      mathOnly = !mathOnly;
      limit = 12;
      render();
    });
  }
  if ($('view-toggle')) {
    $('view-toggle').addEventListener('click', () => {
      const list = $('cards').classList.toggle('list');
      $('view-toggle').textContent = list ? '⊞ Grid' : '☷ List';
      $('view-toggle').setAttribute('aria-label', list ? 'Switch to grid view' : 'Switch to list view');
    });
  }
  if ($('random')) {
    $('random').addEventListener('click', () => {
      const notes = catalog.filter(i => (i.file || i.body) && i.id !== 'README');
      openNote(notes[Math.floor(Math.random() * notes.length)]);
    });
  }

  if ($('view-corpus-graph')) {
    $('view-corpus-graph').addEventListener('click', () => {
      if (window.RLNetworkCanvas && typeof window.RLNetworkCanvas.setMode === 'function') {
        window.RLNetworkCanvas.setMode('corpus');
      }
      smoothScrollTo($('network'));
    });
  }

  if ($('latest-live-stream')) {
    $('latest-live-stream').addEventListener('click', () => {
      activeDomain = 'all';
      activeCategory = 'All resources';
      activeRoadmapIds = null;
      savedOnly = false;
      mathOnly = false;
      activeEra = 'live';
      limit = 24;
      if ($('search')) $('search').value = '';
      if ($('sort')) $('sort').value = 'latest';
      syncEraButtons();
      render();
      smoothScrollTo($('library'));
    });
  }
  if ($('latest-embodied')) {
    $('latest-embodied').addEventListener('click', () => {
      taxonomyMode = 'tracks';
      activeCategory = '2026 · Embodied RL';
      activeDomain = 'all';
      activeEra = 'all';
      activeRoadmapIds = null;
      savedOnly = false;
      mathOnly = false;
      limit = 24;
      if ($('search')) $('search').value = '';
      syncTaxonomySwitchButtons();
      syncEraButtons();
      render();
      smoothScrollTo($('library'));
    });
  }
  if ($('latest-conference')) {
    $('latest-conference').addEventListener('click', () => {
      taxonomyMode = 'tracks';
      activeCategory = '2026 · Conference RL';
      activeDomain = 'all';
      activeEra = 'all';
      activeRoadmapIds = null;
      savedOnly = false;
      mathOnly = false;
      limit = 18;
      if ($('search')) $('search').value = '';
      syncTaxonomySwitchButtons();
      syncEraButtons();
      render();
      smoothScrollTo($('library'));
    });
  }

  if ($('sync-live')) {
    $('sync-live').addEventListener('click', () => {
      if (liveRadar) liveRadar.syncNow({ manual: true });
    });
  }
  if ($('toggle-autosync')) {
    $('toggle-autosync').addEventListener('click', () => {
      if (!liveRadar) return;
      const next = !liveRadar.isAutoSync();
      liveRadar.setAutoSync(next);
      toast(next ? 'Enabled 5-minute background auto-sync.' : 'Paused background auto-sync.');
    });
  }

  for (const id of ['guide', 'read-frontier']) {
    const el = $(id);
    if (el) {
      el.addEventListener('click', event => {
        event.preventDefault();
        const guide = catalog.find(i => i.id === '2026');
        if (guide) openNote(guide);
      });
    }
  }

  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if ($('cmd-palette') && $('cmd-palette').open) $('cmd-palette').close();
      else openCommandPalette();
      return;
    }
    if (
      event.key === '/' &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) &&
      !($('reader') && $('reader').open) &&
      !($('cmd-palette') && $('cmd-palette').open)
    ) {
      event.preventDefault();
      $('search').focus();
      smoothScrollTo($('library'));
    }
  });

  window.addEventListener('hashchange', applyHashRoute);

  // Initialize theme, 3-mode scientific RL instrument, landscape, equations, catalog, and real-time radar
  applyTheme(document.documentElement.dataset.theme || 'dark', false);
  if (typeof window.initRLNetworkCanvas === 'function') {
    window.initRLNetworkCanvas($('network'), {
      motionBtn: $('motion'),
      perturbBtn: $('visual-perturb'),
      readoutEl: $('visual-readout'),
      onOpenNote: openNote
    });
  }
  renderLiveStreamStrip([]);
  renderLandscape();
  renderRoadmaps();
  renderEquationsExplorer();
  render();
  if (liveRadar) liveRadar.start();
  applyHashRoute();

  // Upgrade any pre-KaTeX math nodes as soon as KaTeX finishes loading
  window.onKaTeXReady = () => MM.upgradeMathIn(document);
  if (window.katex) MM.upgradeMathIn(document);
})();
