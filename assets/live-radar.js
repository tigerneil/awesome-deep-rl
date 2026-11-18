'use strict';

/**
 * Deep RL Atlas — Real-Time Research Radar Engine
 * Provides instant localStorage cache hydration, parallel timeout-guarded multi-feed
 * fetching, deduplication against curated notes, NEW delta tracking, and continuous
 * 5-minute background synchronization with visibilitychange/online triggers.
 */
(() => {
  const CACHE_KEY = 'rl-atlas-live-v2';
  const SEEN_KEY = 'rl-atlas-seen-live-v1';
  const AUTOSYNC_KEY = 'rl-atlas-autosync';
  const POLL_INTERVAL_MS = 5 * 60 * 1000;
  const FETCH_TIMEOUT_MS = 10000;
  const MAX_LIVE_ITEMS = 36;

  const VENUE_RE = /\b(NeurIPS\s*202[56](?:\s+Spotlight|\s+Oral)?|ICML\s*202[56](?:\s+Spotlight|\s+Oral)?|ICLR\s*202[56](?:\s+Spotlight|\s+Oral)?|CoRL\s*202[56](?:\s+Oral)?|RSS\s*202[56](?:\s+Award)?|CVPR\s*202[56]|IJCAI\s*202[56]|IROS\s*202[56]|AAAI\s*202[56](?:\s+Oral)?)\b/i;
  const RL_RE = /\b(reinforcement learning|policy gradient|actor-critic|ppo|grpo|rlhf|rlaif|dpo|q-learning|td-learning|markov decision|reward model|reward shaping|bellman|offline rl|online rl|residual rl|policy optimization|advantage estimation|preference optimization|post-training|trial-and-error|verifiable reward|rlvr)\b/i;
  const EMBODIED_RE = /\b(robot|robotic|robotics|embodied|manipulation|locomotion|humanoid|dexterous|quadruped|bimanual|gripper|visuomotor|sim-to-real|vision-language-action|vla|teleoperation|end-effector|autonomous driving|aerial vehicle|uav|legged|physical ai|3d environments)\b/i;
  const AGENT_RE = /\b(agentic|llm agent|language agent|multi-agent|tool use|tool-use|web agent|webrl|web task|gui agent|coding agent|software agent|search agent|multi-turn reinforcement learning|reasoning agent|agent workflow|computer use|repository-level)\b/i;
  const WEB_ONLY_RE = /\b(web agent|webrl|web task|browser|gui agent|coding agent|software agent)\b/i;
  const VLA_WM_RE = /\b(vision-language-action|vla|world model|world simulation|embodied benchmark|robotic manipulation|physical ai|embodied navigation|sim-to-real)\b/i;

  function normTitle(t) {
    return String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
  }

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
    if (hasRL) return '2026 · Core & World RL';
    return null;
  }

  async function fetchJsonWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
      const resp = await fetch(
        url,
        Object.assign({}, options, controller ? { signal: controller.signal } : {})
      );
      if (!resp || !resp.ok) return null;
      return await resp.json();
    } catch {
      return null;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function createLiveRadar(config = {}) {
    const MM = window.RLMathMarkdown;
    const LS = window.RL_LANDSCAPE;
    const curatedArxivIds = config.curatedArxivIds || new Set();
    const curatedTitles = config.curatedTitles || new Set();
    const onItemsUpdated = typeof config.onItemsUpdated === 'function' ? config.onItemsUpdated : () => {};
    const onStatusTick = typeof config.onStatusTick === 'function' ? config.onStatusTick : () => {};

    let autoSync = true;
    try {
      const savedAuto = localStorage.getItem(AUTOSYNC_KEY);
      if (savedAuto === 'false') autoSync = false;
    } catch {}

    let seenSet = new Set();
    let hadPriorSeenHistory = false;
    try {
      const rawSeen = JSON.parse(localStorage.getItem(SEEN_KEY) || 'null');
      if (Array.isArray(rawSeen) && rawSeen.length) {
        seenSet = new Set(rawSeen.map(String));
        hadPriorSeenHistory = true;
      }
    } catch {}

    let liveItems = [];
    let latestDate = '2026-11-17';
    let lastSyncedAt = 0;
    let syncing = false;
    let pollTimer = null;
    let statusTimer = null;

    function persistSeen() {
      try {
        const arr = [...seenSet].slice(-300);
        localStorage.setItem(SEEN_KEY, JSON.stringify(arr));
      } catch {}
    }

    function normalizeCandidate(raw) {
      if (raw && raw.id && raw.body && raw.category && raw.arxivId) {
        const hasMath =
          typeof raw.hasMath === 'boolean'
            ? raw.hasMath
            : Boolean(MM && MM.hasFormalMath(`${raw.title || ''} ${raw.body || ''}`));
        const item = Object.assign(
          {
            live: true,
            hasMath,
            year: raw.year || Number(String(raw.publishedAt || '2026').slice(0, 4)) || 2026
          },
          raw
        );
        if (!item.domain && LS) item.domain = LS.inferDomain(item);
        return item;
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

      const built = {
        id: `live-${pid}`,
        arxivId: pid,
        title,
        category,
        year: Number(pub.slice(0, 4)) || 2026,
        authors: authorsStr,
        description: safeSnippet(`(${pub}) — ${venue ? '[' + venue + '] ' : ''}${aiSummary || summary}`, 225),
        publishedAt: pub,
        venue,
        hasMath: Boolean(MM && MM.hasFormalMath(`${title} ${summary}`)),
        url: absUrl,
        file: '',
        body,
        live: true,
        githubRepo: p.githubRepo || '',
        projectPage: p.projectPage || ''
      };
      built.domain = LS ? LS.inferDomain(built) : 'embodied-vla';
      return built;
    }

    function mergeCandidates(candidates, latestHint) {
      const seenIds = new Set(curatedArxivIds);
      const seenTitles = new Set(curatedTitles);
      const accepted = [];

      for (const raw of candidates) {
        const item = normalizeCandidate(raw);
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

      const sliced = accepted.slice(0, MAX_LIVE_ITEMS);

      // Delta / NEW badge calculation
      let newlyDiscoveredCount = 0;
      if (!hadPriorSeenHistory && sliced.length) {
        sliced.forEach((item, idx) => {
          item.isNew = idx < 5;
          if (idx >= 5) seenSet.add(item.arxivId);
        });
        hadPriorSeenHistory = true;
        persistSeen();
      } else {
        sliced.forEach(item => {
          const unseen = !seenSet.has(item.arxivId);
          item.isNew = unseen;
          if (unseen) newlyDiscoveredCount++;
        });
      }

      let maxDate = latestHint || latestDate;
      for (const item of sliced) {
        if (item.publishedAt && item.publishedAt > maxDate) maxDate = item.publishedAt;
      }

      liveItems = sliced;
      latestDate = maxDate;
      return { items: liveItems, latestDate, newlyDiscoveredCount };
    }

    function formatStatus() {
      const countPart = liveItems.length ? `+${liveItems.length} LIVE PREPRINTS` : 'LIVE FEED READY';
      if (syncing) {
        return `01 // LIVE RADAR · QUERYING ARXIV & HF FEEDS… · ${countPart}`;
      }
      let agePart = `THROUGH ${latestDate}`;
      if (lastSyncedAt > 0) {
        const sec = Math.max(0, Math.floor((Date.now() - lastSyncedAt) / 1000));
        if (sec < 20) agePart = 'CHECKED JUST NOW';
        else if (sec < 60) agePart = `CHECKED ${sec}S AGO`;
        else agePart = `CHECKED ${Math.floor(sec / 60)}M AGO`;
      }
      const modePart = autoSync ? 'AUTO-SYNC 5M' : 'AUTO-SYNC PAUSED';
      return `01 // LIVE RADAR · ${agePart} · ${countPart} · ${modePart}`;
    }

    function emitStatus() {
      onStatusTick({
        statusText: formatStatus(),
        syncing,
        autoSync,
        latestDate,
        count: liveItems.length,
        newCount: liveItems.filter(i => i.isNew).length
      });
    }

    function hydrateCache() {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (cached && Array.isArray(cached.items) && cached.items.length) {
          if (cached.lastSyncedAt) lastSyncedAt = Number(cached.lastSyncedAt) || 0;
          const res = mergeCandidates(cached.items, cached.latestDate || latestDate);
          onItemsUpdated(res.items, res.latestDate, { source: 'cache', newlyDiscoveredCount: 0 });
          emitStatus();
        }
      } catch {}
    }

    async function syncNow(options = {}) {
      if (syncing) return liveItems;
      const manual = Boolean(options.manual);
      syncing = true;
      emitStatus();

      const bucket = Math.floor(Date.now() / 60000);
      const urls = [
        [`assets/live-feed.json?t=${bucket}`, { cache: 'no-store' }],
        ['https://huggingface.co/api/daily_papers?limit=100', {}],
        ['https://huggingface.co/api/papers/search?q=embodied+reinforcement+learning', {}],
        ['https://huggingface.co/api/papers/search?q=VLA+reinforcement+learning', {}],
        ['https://huggingface.co/api/papers/search?q=agentic+reinforcement+learning', {}],
        ['https://huggingface.co/api/papers/search?q=robot+reinforcement+learning', {}],
        ['https://huggingface.co/api/papers/search?q=world+model+reinforcement+learning', {}],
        ['https://huggingface.co/api/papers/search?q=policy+optimization+reinforcement+learning', {}]
      ];

      const results = await Promise.all(
        urls.map(([u, opt]) => fetchJsonWithTimeout(u, opt, FETCH_TIMEOUT_MS))
      );

      const pooled = [];
      let latestHint = latestDate;
      for (const res of results) {
        if (!res) continue;
        if (Array.isArray(res)) {
          pooled.push(...res);
        } else if (Array.isArray(res.items)) {
          if (res.latestDate && res.latestDate > latestHint) latestHint = res.latestDate;
          pooled.push(...res.items);
        }
      }

      syncing = false;
      if (pooled.length) {
        lastSyncedAt = Date.now();
        const merged = mergeCandidates(pooled, latestHint);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              latestDate: merged.latestDate,
              lastSyncedAt,
              items: merged.items
            })
          );
        } catch {}
        onItemsUpdated(merged.items, merged.latestDate, {
          source: 'network',
          manual,
          newlyDiscoveredCount: merged.newlyDiscoveredCount
        });
      } else if (manual) {
        onItemsUpdated(liveItems, latestDate, {
          source: 'unchanged',
          manual: true,
          newlyDiscoveredCount: 0
        });
      }

      emitStatus();
      return liveItems;
    }

    function markItemSeen(item) {
      if (!item || !item.arxivId) return;
      if (!seenSet.has(item.arxivId) || item.isNew) {
        seenSet.add(item.arxivId);
        item.isNew = false;
        persistSeen();
        emitStatus();
      }
    }

    function setAutoSync(enabled) {
      autoSync = Boolean(enabled);
      try {
        localStorage.setItem(AUTOSYNC_KEY, String(autoSync));
      } catch {}
      emitStatus();
    }

    function start() {
      hydrateCache();
      syncNow({ manual: false });

      if (pollTimer) clearInterval(pollTimer);
      pollTimer = setInterval(() => {
        if (autoSync && document.visibilityState === 'visible') {
          syncNow({ manual: false });
        }
      }, POLL_INTERVAL_MS);

      if (statusTimer) clearInterval(statusTimer);
      statusTimer = setInterval(emitStatus, 15000);

      document.addEventListener('visibilitychange', () => {
        if (
          document.visibilityState === 'visible' &&
          autoSync &&
          Date.now() - lastSyncedAt > 3 * 60 * 1000
        ) {
          syncNow({ manual: false });
        } else {
          emitStatus();
        }
      });

      window.addEventListener('online', () => {
        if (autoSync) syncNow({ manual: false });
      });
    }

    return {
      start,
      syncNow,
      markItemSeen,
      setAutoSync,
      isAutoSync: () => autoSync,
      getItems: () => liveItems
    };
  }

  window.RLLiveRadar = { createLiveRadar };
})();
