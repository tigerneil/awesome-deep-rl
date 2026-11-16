'use strict';

(() => {
  const MM = window.RLMathMarkdown;
  const $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const VENUE_RE = /\b(NeurIPS\s*202[56](?:\s+Spotlight|\s+Oral)?|ICML\s*202[56](?:\s+Spotlight|\s+Oral)?|ICLR\s*202[56](?:\s+Spotlight|\s+Oral)?|CoRL\s*202[56](?:\s+Oral)?|RSS\s*202[56](?:\s+Award)?|CVPR\s*202[56]|IJCAI\s*202[56]|IROS\s*202[56]|AAAI\s*202[56](?:\s+Oral)?)\b/i;

  const CANONICAL_EQUATIONS = [
    {
      id: 'bellman',
      era: '1989–2026 · Value Foundations',
      title: 'Bellman Optimality & Decoupled Backups',
      symbol: '𝒯*Q = r + γ max Q',
      tex: String.raw`(\mathcal{T}^* Q)(s, a) = \mathbb{E}_{s' \sim P(\cdot \mid s, a)}\!\left[r(s, a) + \gamma \max_{a' \in \mathcal{A}} Q(s', a')\right], \qquad Y_t^{\text{DDQN}} = r_t + \gamma Q_{\theta^-}\!\Big(s_{t+1},\, \arg\max_{a'} Q_\theta(s_{t+1}, a')\Big)`,
      intuition:
        'Dynamic programming compressed into sample transitions: optimal action-values satisfy a contraction fixed point, while target-network decoupling and pairwise relative differences eliminate overestimation and drifting reward bias.',
      notes: ['DQN', 'DDQN', 'Dueling', 'PER', 'Relative-Value-Learning']
    },
    {
      id: 'pg-gae',
      era: '1999–2026 · Policy Gradient & Credit',
      title: 'Score-Function Gradient & GAE(γ, λ)',
      symbol: '∇θ J(πθ)',
      tex: String.raw`\nabla_\theta J(\pi_\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\!\left[\sum_{t=0}^{\infty} \nabla_\theta \log \pi_\theta(a_t \mid s_t)\,\hat{A}_t^{\text{GAE}(\gamma,\lambda)}\right], \qquad \hat{A}_t^{\text{GAE}} = \sum_{l=0}^{\infty} (\gamma\lambda)^l \big(r_{t+l} + \gamma V_\phi(s_{t+l+1}) - V_\phi(s_{t+l})\big)`,
      intuition:
        'Differentiates expected trajectory returns without an environment model by weighting log-likelihood gradients with exponentially λ-blended temporal-difference residuals—extended in 2026 with transition-aware tool projections and belief stopping times.',
      notes: ['TRPO', 'PPO', 'DDPG', 'ACER', 'TACA', 'T3-Belief-RL']
    },
    {
      id: 'trust-grpo',
      era: '2017–2026 · Proximal & Group-Relative RL',
      title: 'Clipped Surrogates & Critic-Free GRPO',
      symbol: 'L^CLIP · GRPO',
      tex: String.raw`\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{x,\, \{y_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}}\!\left[\frac{1}{G}\sum_{i=1}^G \min\!\Big(\rho_i(\theta)\hat{A}_i,\, \operatorname{clip}\big(\rho_i(\theta), 1-\epsilon, 1+\epsilon\big)\hat{A}_i\Big) - \beta D_{\text{KL}}\!\big(\pi_\theta \,\|\, \pi_{\text{ref}}\big)\right], \quad \hat{A}_i = \frac{R_i - \mu_R}{\sigma_R + \delta}`,
      intuition:
        'Replaces learned value critics with Monte Carlo prompt-group baselines while bounding importance-ratio drift—powering reasoning post-training, Lyapunov-guided stability, and compute-budgeted verification.',
      notes: ['PPO', 'LGPO', 'Reward-Budgeting', 'LoongRL', 'HyperSkill']
    },
    {
      id: 'dist-maxent',
      era: '2017–2026 · Distributional & MaxEnt RL',
      title: 'Distributional Bellman & Variational EM',
      symbol: '𝒯^π Z · KL-RL',
      tex: String.raw`\mathcal{T}^\pi Z(s, a) \stackrel{D}{=} R(s, a) + \gamma Z(S', A'), \qquad q^*(a \mid s) \propto \pi_{\text{ref}}(a \mid s)\exp\!\left(\frac{Q^\pi(s, a)}{\tau}\right)`,
      intuition:
        'Propagates full random-return distributions and risk quantiles rather than scalar means, while Expectation-Maximization duals solve KL-regularized policy improvement in closed form.',
      notes: ['C51', 'MPO', 'Distral', 'UBE', 'Distributional-IRL']
    },
    {
      id: 'flow-steering',
      era: '2025–2026 · Generative Embodied Policies',
      title: 'Latent Flow Steering & Noisy-Space Gradients',
      symbol: 'Gψ(s, μθ(s))',
      tex: String.raw`a_t = G_\psi\big(s_t, \mu_\theta(s_t)\big), \qquad \nabla_\theta \mathcal{J}_{\text{LPS}}(\theta) = \mathbb{E}_{s \sim \mathcal{D}}\!\left[\nabla_\theta \mu_\theta(s)^\top \left(\frac{\partial G_\psi(s, z)}{\partial z}\right)_{\!z=\mu_\theta(s)}^\top \nabla_a Q_\phi(s, a)\Big|_{a = G_\psi(s, \mu_\theta(s))}\right]`,
      intuition:
        'Keeps expressive diffusion, MeanFlow, and VLA action priors strictly inside behavioral support while steering trajectories via action-space critics, excursion backups, or proximal velocity targets without BPTT across denoising chains.',
      notes: ['Latent-Policy-Steering', 'NSPG', 'Excursion-Policies', 'MEND', 'K-PWM']
    },
    {
      id: 'frontier-2026',
      era: '2026 · Asymmetric & Self-Distilled RL',
      title: 'One-Sided Verifiers & Rich-Feedback Distillation',
      symbol: 'NOPO · SDPO · VEPO',
      tex: String.raw`\mathcal{L}_{\text{NOPO}}(\theta) = \mathbb{E}_{x}\!\left[\phi\!\big(\hat{p}_{\text{nf}}(x)\big)\frac{1}{G}\sum_{y_i \in \mathcal{N}(x)} \log\!\left(1 + \exp\!\left(\beta \log \frac{\pi_\theta(y_i \mid x)}{\pi_{\text{ref}}(y_i \mid x)}\right)\right)\right], \qquad \mathcal{H}_{\text{eff}} = S_{\text{top-}k} \cdot \left(1 - \frac{H_{\text{top-}k}}{\log k}\right)`,
      intuition:
        'Breaks beyond symmetric scalar rewards: suppresses trusted falsifications without rewarding false-positive shortcuts, controls effective vocalized entropy, and distills rich runtime feedback token-by-token.',
      notes: ['NOPO', 'VEPO', 'SDPO', 'LARBRID', '2026']
    }
  ];

  // Normalize static catalog items
  const baseCatalog = (window.RL_CATALOG || []).map(item => {
    const blob = `${item.description || ''} ${item.body || ''}`;
    const dm = !item.publishedAt ? blob.match(/\b(20[12][0-9]-\d{2}-\d{2})\b/) : null;
    const vm =
      !item.venue && item.id !== '2026' && item.id !== 'README'
        ? blob.match(
            /Conference venue:\s*([^\n]+?)\.(?:\s|$)|status:\s*paper;\s*arxiv record lists\s*(RSS 2026)|\b(NeurIPS 2026(?:\s+Oral|\s+Spotlight)?|ICML 2026(?:\s+Oral|\s+Spotlight)?|ICLR 2026(?:\s+Oral|\s+Spotlight)?|CoRL 2026|RSS 2026(?:\s+Award)?|IJCAI 2026|IROS 2026|AAAI 2026(?:\s+Oral)?)\b/i
          )
        : null;
    const venue =
      item.venue || (vm ? (vm[1] || vm[2] || vm[3] || '').replace(/\s*\([^)]*\)/g, '').trim() : '');
    const hasMath = typeof item.hasMath === 'boolean' ? item.hasMath : MM.hasFormalMath(blob);
    return Object.assign(
      {
        publishedAt: item.publishedAt || (dm ? dm[1] : ''),
        venue,
        hasMath
      },
      item
    );
  });

  let catalog = baseCatalog.slice();
  let currentReaderItem = null;

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

  let active = 'All resources';
  let limit = 12;
  let savedOnly = false;
  let mathOnly = false;
  let activeEquationId = CANONICAL_EQUATIONS[0].id;

  const baseFeatured = [
    '2026', 'NOPO', 'HeMeR', 'VEPO', 'LGPO', 'HyperSkill', 'Excursion-Policies',
    'K-PWM', 'TACA', 'HARP-Bench', 'UniLatent', 'MDF-Plus-Plus', 'LCVN',
    'NeuralActuator', 'SDPO', 'Distributional-IRL', 'LoongRL', 'T3-Belief-RL',
    'Latent-Policy-Steering', 'Rhythm', 'SkillRL', 'VLM-AR3L', 'Phi-Actor-Critic',
    'S2C', 'WM-Nav', 'LARBRID', 'Parallel-Safe-RL', 'PTR-CRL', 'Reward-Budgeting',
    'RcRL', 'BEAKER', 'HOI-DexRL', 'PolicyIK', 'ARPG', 'CRONOS', 'HLO-AMP', 'MESA',
    'RLiD', 'RAVEL', 'VLA-Stem', 'Physical-AI-RSI', 'AtomicRL', 'WoVR-Plus', 'ANTE',
    'DRIVE', 'MEND', 'eRLT', 'FIND', 'VLaRL', 'NSPG', 'Relative-Value-Learning',
    'OopsieVerse', 'SHAPO', 'RLA-WM', 'USER-RL', 'MemRL', 'Embodied-R1', 'FMAPPO',
    'HaWMPO', 'VLA-Precision', 'WorldSample', 'Object-Centric-Residual-RL',
    'RL-Token', 'RISE', 'TwinRL', 'EnvACE', 'PPO', 'DQN'
  ];
  let featured = baseFeatured.slice();

  function toast(message) {
    const el = $('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 2300);
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
      chip.textContent = noteId === '2026' ? '2026 Frontier Guide ↗' : `${noteId} ↗`;
      chip.addEventListener('click', () => openNote(target));
      linksRow.append(chip);
    });

    stageEl.append(top, display, intuition, linksRow);
  }

  /* ------------------------------------------------------------------------
     Library Categories, Search, Math Filter & Cards
     ------------------------------------------------------------------------ */
  function categories() {
    const groups = [...new Set(catalog.map(item => item.category))].sort();
    const mathTotal = catalog.filter(item => item.hasMath).length;

    if ($('resource-count')) $('resource-count').textContent = catalog.length;
    if ($('topic-count')) $('topic-count').textContent = groups.length;
    if ($('math-total-stat')) $('math-total-stat').textContent = mathTotal;
    if ($('math-filter')) {
      $('math-filter').setAttribute('aria-pressed', String(mathOnly));
      $('math-filter').textContent = `∑ Formal math (${mathTotal})`;
    }

    const container = $('categories');
    if (!container) return;
    container.replaceChildren();

    ['All resources', ...groups].forEach(category => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'category';
      const isSelected = active === category && !savedOnly;
      button.classList.toggle('active', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
      button.append(document.createTextNode(category));

      const count = document.createElement('span');
      count.textContent =
        category === 'All resources'
          ? catalog.length
          : catalog.filter(i => i.category === category).length;
      button.append(count);

      button.addEventListener('click', () => {
        active = category;
        savedOnly = false;
        limit = 12;
        render();
      });
      container.append(button);
    });
  }

  function save(item) {
    if (saved.has(item.id)) saved.delete(item.id);
    else saved.add(item.id);
    try {
      localStorage.setItem('rl-atlas-saved', JSON.stringify([...saved]));
    } catch {
      toast('Reading list is available for this session.');
    }
    render();
  }

  function render() {
    const query = ($('search') ? $('search').value : '').trim().toLowerCase();
    const items = catalog.filter(
      i =>
        (active === 'All resources' || i.category === active) &&
        (!savedOnly || saved.has(i.id)) &&
        (!mathOnly || i.hasMath) &&
        `${i.title} ${i.id} ${i.category} ${i.venue || ''} ${i.description} ${i.body}`
          .toLowerCase()
          .includes(query)
    );

    const sort = $('sort') ? $('sort').value : 'featured';
    items.sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'za') return b.title.localeCompare(a.title);
      if (sort === 'latest') {
        const da = a.publishedAt || '';
        const db = b.publishedAt || '';
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
    const qualText = qualifiers.length ? qualifiers.join(' · ') + ' ' : '';

    if ($('result-count')) {
      $('result-count').textContent = `${items.length} ${qualText}resources${
        active !== 'All resources' ? ' · ' + active : ' in the collection'
      }`;
    }
    if ($('saved-count')) $('saved-count').textContent = saved.size;
    if ($('saved-top')) $('saved-top').setAttribute('aria-pressed', String(savedOnly));

    const cardsEl = $('cards');
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
      bookmark.addEventListener('click', () => save(item));
      top.append(badges, bookmark);

      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.textContent = item.venue ? `${item.category} · ${item.venue}` : item.category;

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
    categories();
  }

  /* ------------------------------------------------------------------------
     Scientific Reader Modal (Full Markdown + KaTeX Typesetting)
     ------------------------------------------------------------------------ */
  function resolveLocalNote(filename) {
    return catalog.find(entry => entry.file && entry.file === filename) || null;
  }

  function openNote(item) {
    currentReaderItem = item;
    const content = $('reader-content');
    content.replaceChildren();

    // Telemetry metadata strip
    const metaStrip = document.createElement('div');
    metaStrip.className = 'reader-meta-strip';

    const catChip = document.createElement('span');
    catChip.className = 'reader-meta-chip';
    catChip.textContent = item.category || 'Research note';
    metaStrip.append(catChip);

    if (item.venue) {
      const venueChip = document.createElement('span');
      venueChip.className = 'reader-meta-chip accent';
      venueChip.textContent = item.venue;
      metaStrip.append(venueChip);
    }
    if (item.publishedAt) {
      const dateChip = document.createElement('span');
      dateChip.className = 'reader-meta-chip';
      dateChip.textContent = item.publishedAt;
      metaStrip.append(dateChip);
    }
    if (item.hasMath) {
      const mathChip = document.createElement('span');
      mathChip.className = 'reader-meta-chip accent';
      mathChip.textContent = '∑ Typeset LaTeX';
      metaStrip.append(mathChip);
    }
    content.append(metaStrip);

    // Primary note heading
    const h1 = document.createElement('h1');
    MM.renderInlineInto(h1, item.title, { inlineOnly: true });
    content.append(h1);

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

    if (item.arxivId && item.file) {
      const arxivLink = document.createElement('a');
      arxivLink.href = `https://arxiv.org/abs/${item.arxivId}`;
      arxivLink.textContent = `arXiv:${item.arxivId} ↗`;
      arxivLink.target = '_blank';
      arxivLink.rel = 'noopener noreferrer';
      sourceRow.append(arxivLink);
    }
    content.append(sourceRow);

    // Render full scientific Markdown body with display & inline math
    MM.renderMarkdownInto(content, item.body || item.description || '', {
      skipLeadingH1: true,
      skipLeadingTitleText: item.title,
      resolveLocalNote,
      onOpenNote: openNote
    });

    const dialog = $('reader');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }

  /* ------------------------------------------------------------------------
     Automatic Live Online Preprint Synchronization
     ------------------------------------------------------------------------ */
  const RL_RE = /\b(reinforcement learning|policy gradient|actor-critic|ppo|grpo|rlhf|rlaif|q-learning|td-learning|markov decision|reward model|reward shaping|offline rl|online rl|residual rl|policy optimization|advantage estimation|preference optimization|post-training|trial-and-error)\b/i;
  const EMBODIED_RE = /\b(robot|robotic|robotics|embodied|manipulation|locomotion|humanoid|dexterous|quadruped|bimanual|gripper|visuomotor|sim-to-real|vision-language-action|vla|teleoperation|end-effector|autonomous driving|aerial vehicle|uav|legged|physical ai|3d environments)\b/i;
  const AGENT_RE = /\b(agentic|llm agent|language agent|multi-agent|tool use|tool-use|web agent|webrl|web task|gui agent|coding agent|software agent|search agent|multi-turn reinforcement learning|reasoning agent|agent workflow|computer use)\b/i;
  const WEB_ONLY_RE = /\b(web agent|webrl|web task|browser|gui agent)\b/i;
  const VLA_WM_RE = /\b(vision-language-action|vla|world model|world simulation|embodied benchmark|robotic manipulation|physical ai|embodied navigation|sim-to-real)\b/i;

  function normalizeTexDelimiters(str) {
    return String(str || '')
      .replace(/\\\[([\s\S]+?)\\\]/g, (_, m) => `$$ ${m.trim()} $$`)
      .replace(/\\\(([^\n]+?)\\\)/g, (_, m) => `$${m.trim()}$`);
  }

  function safeSnippet(text, maxLen = 225) {
    const clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (clean.length <= maxLen) return clean;
    const regex = /(?<!\\)\$[^$\n]+?(?<!\\)\$/g;
    let cutoff = maxLen;
    let m;
    while ((m = regex.exec(clean)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      if (start < cutoff && cutoff < end) {
        cutoff = end <= maxLen + 36 ? end : start;
        break;
      }
    }
    return clean.slice(0, cutoff).replace(/[\s,;:-]+$/, '') + '…';
  }

  function classifyLivePaper(title, summary, keywords, venue) {
    const blob = `${title} ${summary} ${(keywords || []).join(' ')}`;
    const hasRL = RL_RE.test(blob);
    const hasEmbodied = EMBODIED_RE.test(blob);
    const hasAgent = AGENT_RE.test(blob);
    const hasWeb = WEB_ONLY_RE.test(blob);
    const hasVlaWm = VLA_WM_RE.test(blob);
    if (hasRL && hasWeb && !/\b(robot|robotic|humanoid|manipulation|locomotion)\b/i.test(blob)) {
      return '2026 · Agent RL';
    }
    if (hasRL && hasEmbodied) return '2026 · Embodied RL';
    if (hasRL && hasAgent) return '2026 · Agent RL';
    if (hasRL && venue) return '2026 · Conference RL';
    if (hasVlaWm && hasEmbodied) return '2026 · Embodied context';
    return null;
  }

  function buildLiveItem(raw) {
    if (raw && raw.id && raw.body && raw.category && raw.arxivId) {
      const hasMath =
        typeof raw.hasMath === 'boolean'
          ? raw.hasMath
          : MM.hasFormalMath(`${raw.title || ''} ${raw.body || ''}`);
      return Object.assign({ live: true, hasMath }, raw);
    }
    const p = raw && raw.paper && typeof raw.paper === 'object' ? raw.paper : raw;
    if (!p || typeof p !== 'object') return null;
    const pid = String(p.arxivId || p.id || '').trim();
    if (!/^\d{4}\.\d{4,5}$/.test(pid)) return null;
    const title = normalizeTexDelimiters(String(p.title || '').replace(/\s+/g, ' ').trim());
    const summary = normalizeTexDelimiters(String(p.summary || '').replace(/\s+/g, ' ').trim());
    const aiSummary = normalizeTexDelimiters(
      String(p.ai_summary || p.aiSummary || '').replace(/\s+/g, ' ').trim()
    );
    const keywords = Array.isArray(p.ai_keywords || p.keywords)
      ? (p.ai_keywords || p.keywords).map(String)
      : [];
    const pub = String(p.publishedAt || raw.publishedAt || '').slice(0, 10);
    if (!pub.startsWith('202')) return null;
    const vm = `${title} ${summary}`.match(VENUE_RE);
    const venue = p.venue || (vm && !/workshop|symposium/i.test(summary) ? vm[1] : '');
    const category = p.category || classifyLivePaper(title, summary, keywords, venue);
    if (!category) return null;

    const rawAuthors = Array.isArray(p.authors)
      ? p.authors.map(a => (typeof a === 'string' ? a : a && a.name ? a.name : '')).filter(Boolean)
      : [];
    const authorsStr = rawAuthors.length
      ? rawAuthors.slice(0, 8).join(', ') + (rawAuthors.length > 8 ? ' et al' : '')
      : 'arXiv authors';
    const absUrl = `https://arxiv.org/abs/${pid}`;
    const pdfUrl = `https://arxiv.org/pdf/${pid}`;
    const links = [`* Paper: [arXiv:${pid}](${absUrl})`, `* PDF: [arXiv PDF](${pdfUrl})`];
    if (p.githubRepo) links.push(`* Code: [${p.githubRepo}](${p.githubRepo})`);
    if (p.projectPage) links.push(`* Project page: [${p.projectPage}](${p.projectPage})`);
    const kwLine = keywords.length ? `\n\nKeywords: ${keywords.slice(0, 8).join(', ')}.` : '';
    const venueLine = venue ? ` Conference venue: ${venue}.` : '';
    const body = `# ${title}\n\nFirst public date: ${pub}.${venueLine}\n\nAuthors: ${authorsStr}.\n\nClassification: ${category} (${venue ? venue + ' · live auto-indexed' : 'live auto-indexed preprint'}).\n\n## Abstract & key idea\n\n${summary}${kwLine}\n\n## Evidence boundary\n\nThis entry was automatically indexed from live public research feeds on ${pub} and reflects the authors' public preprint abstract (\`arXiv:${pid}\`). Separate reinforcement-learning training claims from purely supervised or world-model components when comparing against manually curated notes.\n\n## Sources and artifacts\n\n${links.join('\n')}`;

    return {
      id: `live-${pid}`,
      arxivId: pid,
      title,
      category,
      description: safeSnippet(`(${pub}) — ${venue ? '[' + venue + '] ' : ''}${aiSummary || summary}`, 225),
      publishedAt: pub,
      venue,
      hasMath: MM.hasFormalMath(`${title} ${summary}`),
      url: absUrl,
      file: '',
      body,
      live: true,
      githubRepo: p.githubRepo || '',
      projectPage: p.projectPage || ''
    };
  }

  function applyLiveCatalog(candidates, latestHint) {
    const seenIds = new Set(curatedArxivIds);
    const seenTitles = new Set(curatedTitles);
    const accepted = [];
    for (const raw of candidates) {
      const item = buildLiveItem(raw);
      if (!item) continue;
      const nt = normTitle(item.title);
      if (seenIds.has(item.arxivId) || seenTitles.has(nt)) continue;
      seenIds.add(item.arxivId);
      seenTitles.add(nt);
      accepted.push(item);
    }
    accepted.sort(
      (a, b) =>
        (b.publishedAt || '').localeCompare(a.publishedAt || '') ||
        (b.arxivId || '').localeCompare(a.arxivId || '')
    );
    const liveItems = accepted.slice(0, 24);
    catalog = [...baseCatalog, ...liveItems];
    const liveIds = liveItems.map(i => i.id);
    featured = [
      ...baseFeatured.slice(0, 10),
      ...liveIds.slice(0, 6),
      ...baseFeatured.slice(10),
      ...liveIds.slice(6)
    ];

    let latestDate = latestHint || '2026-11-15';
    for (const item of liveItems) {
      if (item.publishedAt && item.publishedAt > latestDate) latestDate = item.publishedAt;
    }

    if ($('live-status')) {
      $('live-status').textContent = liveItems.length
        ? `02 // LIVE TELEMETRY · SYNCED THROUGH ${latestDate} · +${liveItems.length} AUTO-INDEXED PREPRINTS`
        : `02 // LIVE TELEMETRY · SYNCED THROUGH ${latestDate}`;
    }
    if ($('frontier-update-summary') && liveItems.length) {
      const embCount = catalog.filter(i => i.category === '2026 · Embodied RL').length;
      const agCount = catalog.filter(i => i.category === '2026 · Agent RL').length;
      const confCount = catalog.filter(i => i.category === '2026 · Conference RL').length;
      $('frontier-update-summary').textContent = `Explore ${embCount} embodied RL studies, ${agCount} agent RL notes, ${confCount} core conference RL notes (NeurIPS, ICML, ICLR, CoRL, RSS, IJCAI, AAAI 2026), and ${liveItems.length} live preprints synced automatically from online feeds with full LaTeX rendering.`;
    }
    render();
    return liveItems;
  }

  async function syncLiveOnline(manual = false) {
    if ($('sync-live')) {
      $('sync-live').disabled = true;
      $('sync-live').textContent = '↻ Syncing online…';
    }
    if (!manual) {
      try {
        const cached = JSON.parse(localStorage.getItem('rl-atlas-live-v1') || 'null');
        if (cached && Array.isArray(cached.items) && cached.items.length) {
          applyLiveCatalog(cached.items, cached.latestDate);
        }
      } catch {}
    }
    const endpoints = [
      fetch('assets/live-feed.json', { cache: 'no-store' })
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://huggingface.co/api/daily_papers?limit=100')
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://huggingface.co/api/papers/search?q=embodied+reinforcement+learning')
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://huggingface.co/api/papers/search?q=VLA+reinforcement+learning')
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch('https://huggingface.co/api/papers/search?q=agentic+reinforcement+learning')
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null)
    ];
    const results = await Promise.all(endpoints);
    const pooled = [];
    let latestHint = '2026-11-15';
    for (const res of results) {
      if (!res) continue;
      if (Array.isArray(res)) pooled.push(...res);
      else if (Array.isArray(res.items)) {
        if (res.latestDate && res.latestDate > latestHint) latestHint = res.latestDate;
        pooled.push(...res.items);
      }
    }
    if (pooled.length) {
      const merged = applyLiveCatalog(pooled, latestHint);
      try {
        localStorage.setItem(
          'rl-atlas-live-v1',
          JSON.stringify({ latestDate: latestHint, items: merged })
        );
      } catch {}
      if (manual) toast(`Synced ${merged.length} live online preprints.`);
    } else if (manual) {
      toast('Already up to date with latest available feed.');
    }
    if ($('sync-live')) {
      $('sync-live').disabled = false;
      $('sync-live').textContent = '↻ Sync latest online';
    }
  }

  /* ------------------------------------------------------------------------
     Event Wiring & Initialization
     ------------------------------------------------------------------------ */
  if ($('theme-toggle')) {
    $('theme-toggle').addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next, true);
    });
  }

  if ($('close-reader')) $('close-reader').addEventListener('click', () => $('reader').close());

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

  if ($('reader')) {
    $('reader').addEventListener('click', event => {
      if (event.target === $('reader')) {
        const r = $('reader').getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        ) {
          $('reader').close();
        }
      }
    });
  }

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
  if ($('reset')) {
    $('reset').addEventListener('click', () => {
      active = 'All resources';
      savedOnly = false;
      mathOnly = false;
      $('search').value = '';
      render();
    });
  }
  if ($('saved-top')) {
    $('saved-top').addEventListener('click', () => {
      savedOnly = !savedOnly;
      active = 'All resources';
      $('search').value = '';
      limit = 12;
      render();
      $('library').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
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
  if ($('latest-embodied')) {
    $('latest-embodied').addEventListener('click', () => {
      active = '2026 · Embodied RL';
      savedOnly = false;
      mathOnly = false;
      limit = 24;
      $('search').value = '';
      render();
      $('library').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
    });
  }
  if ($('latest-conference')) {
    $('latest-conference').addEventListener('click', () => {
      active = '2026 · Conference RL';
      savedOnly = false;
      mathOnly = false;
      limit = 12;
      $('search').value = '';
      render();
      $('library').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
    });
  }
  if ($('sync-live')) $('sync-live').addEventListener('click', () => syncLiveOnline(true));

  for (const id of ['guide', 'frontier-link', 'read-frontier']) {
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
    if (
      event.key === '/' &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) &&
      !($('reader') && $('reader').open)
    ) {
      event.preventDefault();
      $('search').focus();
      $('library').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
    }
  });

  // Initialize theme, 3D geodesic canvas, canonical equations, static catalog, and live sync
  applyTheme(document.documentElement.dataset.theme || 'dark', false);
  if (typeof window.initRLNetworkCanvas === 'function') {
    window.initRLNetworkCanvas($('network'), $('motion'));
  }
  renderEquationsExplorer();
  render();
  syncLiveOnline(false);

  // Upgrade any pre-KaTeX math nodes as soon as KaTeX finishes loading
  window.onKaTeXReady = () => MM.upgradeMathIn(document);
  if (window.katex) MM.upgradeMathIn(document);
})();
