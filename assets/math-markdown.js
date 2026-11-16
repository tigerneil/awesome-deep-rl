'use strict';

/**
 * Deep RL Atlas — Scientific Markdown & LaTeX Mathematical Typesetting Engine
 * Renders display/inline LaTeX via KaTeX when available, with an offline-safe
 * symbolic fallback and automatic hydration when KaTeX loads asynchronously.
 */
(() => {
  const GREEK_AND_SYMBOLS = {
    '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ', '\\epsilon': 'ϵ',
    '\\varepsilon': 'ε', '\\zeta': 'ζ', '\\eta': 'η', '\\theta': 'θ', '\\vartheta': 'ϑ',
    '\\iota': 'ι', '\\kappa': 'κ', '\\lambda': 'λ', '\\mu': 'μ', '\\nu': 'ν',
    '\\xi': 'ξ', '\\pi': 'π', '\\rho': 'ρ', '\\sigma': 'σ', '\\tau': 'τ',
    '\\upsilon': 'υ', '\\phi': 'ϕ', '\\varphi': 'φ', '\\chi': 'χ', '\\psi': 'ψ',
    '\\omega': 'ω', '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Theta': 'Θ', '\\Lambda': 'Λ',
    '\\Xi': 'Ξ', '\\Pi': 'Π', '\\Sigma': 'Σ', '\\Upsilon': 'Υ', '\\Phi': 'Φ',
    '\\Psi': 'Ψ', '\\Omega': 'Ω',
    '\\nabla': '∇', '\\partial': '∂', '\\infty': '∞', '\\sum': '∑', '\\prod': '∏',
    '\\int': '∫', '\\forall': '∀', '\\exists': '∃', '\\in': '∈', '\\notin': '∉',
    '\\subset': '⊂', '\\subseteq': '⊆', '\\cup': '∪', '\\cap': '∩', '\\emptyset': '∅',
    '\\le': '≤', '\\leq': '≤', '\\ge': '≥', '\\geq': '≥', '\\neq': '≠', '\\ne': '≠',
    '\\approx': '≈', '\\equiv': '≡', '\\propto': '∝', '\\sim': '∼', '\\simeq': '≃',
    '\\pm': '±', '\\mp': '∓', '\\times': '×', '\\cdot': '·', '\\circ': '∘',
    '\\otimes': '⊗', '\\oplus': '⊕', '\\odot': '⊙', '\\top': '⊤', '\\perp': '⊥',
    '\\to': '→', '\\rightarrow': '→', '\\leftarrow': '←', '\\mapsto': '↦',
    '\\implies': '⇒', '\\Rightarrow': '⇒', '\\iff': '⇔', '\\Leftrightarrow': '⇔',
    '\\mid': '∣', '\\parallel': '∥', '\\|': '‖', '\\dots': '…', '\\ldots': '…',
    '\\cdots': '⋯', '\\ell': 'ℓ', '\\hbar': 'ℏ', '\\dagger': '†', '\\ast': '∗'
  };

  const BLACKBOARD = {
    E: '𝔼', R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', P: 'ℙ', I: '𝕀', V: '𝕍'
  };

  const CALLIGRAPHIC = {
    A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ',
    J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ',
    S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵'
  };

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function safeURL(url) {
    try {
      const base = typeof location !== 'undefined' ? location.href : 'https://tigerneil.github.io/awesome-deep-rl/';
      const parsed = new URL(url, base);
      return ['http:', 'https:', 'file:'].includes(parsed.protocol) ? parsed.href : '#';
    } catch {
      return '#';
    }
  }

  function renderFallbackMathHTML(rawTex) {
    let s = escapeHTML(String(rawTex || '').trim());
    s = s.replace(/\\(?:left|right|big|Big|bigg|Bigg)\s*([()[\]|.]|\\\{|\\\}|\\\|)/g, (_, d) =>
      d === '.' ? '' : d.replace(/^\\/, '')
    );
    s = s.replace(/\\[,;!]\s*/g, ' ').replace(/\\quad\b|\\qquad\b/g, '  ');
    s = s.replace(/\\mathbb\{([A-Z])\}/g, (_, c) => BLACKBOARD[c] || c);
    s = s.replace(/\\mathcal\{([A-Z])\}/g, (_, c) => CALLIGRAPHIC[c] || c);
    s = s.replace(/\\(?:text|mathrm|operatorname|mathbf|boldsymbol)\{([^{}]*)\}/g, '<span style="font-style:normal">$1</span>');
    s = s.replace(/\\(?:hat|widehat|tilde|widetilde|bar|overline)\{([^{}]*)\}/g, '$1&#770;');
    for (let pass = 0; pass < 2; pass++) {
      s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)');
      s = s.replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
    }
    const keys = Object.keys(GREEK_AND_SYMBOLS).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const boundary = /\\[a-zA-Z]+$/.test(key) ? '(?![a-zA-Z])' : '';
      s = s.replace(new RegExp(escapedKey + boundary, 'g'), GREEK_AND_SYMBOLS[key]);
    }
    s = s.replace(/\^\{([^{}]+)\}/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^{}]+)\}/g, '<sub>$1</sub>');
    s = s.replace(/\^([a-zA-Z0-9*+-])/g, '<sup>$1</sup>');
    s = s.replace(/_([a-zA-Z0-9*+-])/g, '<sub>$1</sub>');
    s = s.replace(/\\\{/g, '{').replace(/\\\}/g, '}').replace(/[{}]/g, '');
    return `<span class="math-fallback">${s}</span>`;
  }

  function renderMathElement(tex, displayMode) {
    const cleanTex = String(tex || '').trim();
    const el = document.createElement(displayMode ? 'div' : 'span');
    el.className = displayMode ? 'math-block' : 'math-inline';
    el.dataset.tex = cleanTex;
    el.dataset.display = displayMode ? '1' : '0';

    if (typeof window !== 'undefined' && window.katex && typeof window.katex.renderToString === 'function') {
      try {
        el.innerHTML = window.katex.renderToString(cleanTex, {
          displayMode: Boolean(displayMode),
          throwOnError: false,
          strict: false,
          trust: false
        });
        el.dataset.rendered = 'katex';
        return el;
      } catch {
        // Fall through to clean symbolic fallback
      }
    }
    el.innerHTML = renderFallbackMathHTML(cleanTex);
    el.dataset.rendered = 'fallback';
    return el;
  }

  function upgradeMathIn(root = document) {
    if (typeof window === 'undefined' || !window.katex || typeof window.katex.renderToString !== 'function') {
      return;
    }
    const nodes = root.querySelectorAll('[data-tex]:not([data-rendered="katex"])');
    nodes.forEach(node => {
      const tex = node.dataset.tex || '';
      const displayMode = node.dataset.display === '1';
      try {
        node.innerHTML = window.katex.renderToString(tex, {
          displayMode,
          throwOnError: false,
          strict: false,
          trust: false
        });
        node.dataset.rendered = 'katex';
      } catch {
        // Keep clean fallback
      }
    });
  }

  function hasFormalMath(text) {
    if (!text) return false;
    const stripped = String(text)
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`\n]+`/g, '')
      .replace(/\\\$/g, '');
    return /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([^\n]+?\\\)|\$(?!\s)([^$\n]+?)(?<!\s)\$/.test(stripped);
  }

  /**
   * Tokenize inline spans (escaped \$, inline code, inline math, images, links, bold, italic).
   */
  function renderInlineInto(container, rawText, options = {}, sharedTokens = null) {
    if (!rawText) return;
    const tokens = sharedTokens || [];
    const stash = token => {
      const key = `\u0000T${tokens.length}\u0000`;
      tokens.push(token);
      return key;
    };

    let s = String(rawText);

    if (!sharedTokens) {
      // 1. Escaped literal dollar \$
      s = s.replace(/\\\$/g, () => stash({ type: 'text', value: '$' }));

      // 2. Inline code `...`
      s = s.replace(/`([^`\n]+)`/g, (_, code) => stash({ type: 'code', value: code }));

      // 3. Inline LaTeX \( ... \) and $ ... $
      s = s.replace(/\\\(([^\n]+?)\\\)/g, (_, tex) => stash({ type: 'math', value: tex }));
      s = s.replace(/\$(?!\s|\$)([^$\n]+?)(?<!\s|\\)\$/g, (full, tex) => {
        if (/^\d[\d,.]*\s+[a-zA-Z]/.test(tex) && !/[\\^_{}=<>+\-*/]/.test(tex)) {
          return full;
        }
        return stash({ type: 'math', value: tex });
      });

      // 4. Images ![alt](src)
      s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) =>
        stash({ type: 'image', alt, src })
      );

      // 5. Links [label](href)
      s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) =>
        stash({ type: 'link', label, href })
      );
    }

    // Walk text for **bold**, *italic*, and stashed tokens
    const pattern = /(\u0000T\d+\u0000|\*\*[^*\n]+\*\*|\*(?!\s)[^*\n]+?(?<!\s)\*)/g;
    let lastIdx = 0;
    let match;

    while ((match = pattern.exec(s)) !== null) {
      if (match.index > lastIdx) {
        container.append(document.createTextNode(s.slice(lastIdx, match.index)));
      }
      const chunk = match[0];
      if (chunk.startsWith('\u0000T') && chunk.endsWith('\u0000')) {
        const idx = Number(chunk.slice(2, -1));
        const tok = tokens[idx];
        if (!tok) {
          container.append(document.createTextNode(chunk));
        } else if (tok.type === 'text') {
          container.append(document.createTextNode(tok.value));
        } else if (tok.type === 'code') {
          const codeEl = document.createElement('code');
          codeEl.textContent = tok.value;
          container.append(codeEl);
        } else if (tok.type === 'math') {
          container.append(renderMathElement(tok.value, false));
        } else if (tok.type === 'image') {
          if (options.inlineOnly) {
            container.append(document.createTextNode(tok.alt || ''));
          } else {
            const img = document.createElement('img');
            img.src = safeURL(tok.src);
            img.alt = tok.alt || 'Research figure';
            img.loading = 'lazy';
            container.append(img);
          }
        } else if (tok.type === 'link') {
          if (options.inlineOnly) {
            renderInlineInto(container, tok.label, options, tokens);
          } else {
            const a = document.createElement('a');
            renderInlineInto(a, tok.label, { inlineOnly: true }, tokens);
            const cleanTarget = tok.href.split('#')[0];
            const handledLocally =
              typeof options.resolveLocalNote === 'function' && cleanTarget.endsWith('.md')
                ? options.resolveLocalNote(cleanTarget)
                : null;
            if (handledLocally) {
              a.href = `#note-${handledLocally.id}`;
              a.addEventListener('click', ev => {
                ev.preventDefault();
                options.onOpenNote(handledLocally);
              });
            } else {
              a.href = safeURL(tok.href);
              if (!tok.href.startsWith('#')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
              }
            }
            container.append(a);
          }
        }
      } else if (chunk.startsWith('**') && chunk.endsWith('**')) {
        const strong = document.createElement('strong');
        renderInlineInto(strong, chunk.slice(2, -2), options, tokens);
        container.append(strong);
      } else if (chunk.startsWith('*') && chunk.endsWith('*')) {
        const em = document.createElement('em');
        renderInlineInto(em, chunk.slice(1, -1), options, tokens);
        container.append(em);
      }
      lastIdx = pattern.lastIndex;
    }

    if (lastIdx < s.length) {
      container.append(document.createTextNode(s.slice(lastIdx)));
    }
  }

  function splitTableRow(rowLine) {
    let trimmed = rowLine.trim();
    if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
    if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);
    return trimmed.split('|').map(cell => cell.trim());
  }

  function isTableDivider(line) {
    if (!line || !line.includes('|')) return false;
    const cells = splitTableRow(line);
    return cells.length >= 2 && cells.every(c => /^:?-{3,}:?$/.test(c));
  }

  /**
   * Render a full scientific Markdown document into a target DOM container.
   */
  function renderMarkdownInto(container, markdown, options = {}) {
    const blocks = [];
    const stashBlock = block => {
      const marker = `\n\n@@BLOCK_${blocks.length}@@\n\n`;
      blocks.push(block);
      return marker;
    };

    let src = String(markdown || '').replace(/\r\n/g, '\n');

    // 1. Extract fenced code blocks first
    src = src.replace(/```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g, (_, lang, code) =>
      stashBlock({ type: 'code', lang: lang || '', code: code.replace(/\n$/, '') })
    );

    // 2. Extract display math blocks $$...$$ and \[...\]
    src = src.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) =>
      stashBlock({ type: 'math', tex: tex.trim() })
    );
    src = src.replace(/\\\[([\s\S]+?)\\\]/g, (_, tex) =>
      stashBlock({ type: 'math', tex: tex.trim() })
    );

    const lines = src.split('\n');
    let i = 0;
    let skippedLeadingTitle = false;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        i++;
        continue;
      }

      // Stashed code or math block
      const blockMatch = trimmed.match(/^@@BLOCK_(\d+)@@$/);
      if (blockMatch) {
        const entry = blocks[Number(blockMatch[1])];
        if (entry.type === 'code') {
          const pre = document.createElement('pre');
          const code = document.createElement('code');
          if (entry.lang) code.dataset.lang = entry.lang;
          code.textContent = entry.code;
          pre.append(code);
          container.append(pre);
        } else if (entry.type === 'math') {
          container.append(renderMathElement(entry.tex, true));
        }
        i++;
        continue;
      }

      // Horizontal rule
      if (/^(?:---|\*\*\*|___)\s*$/.test(trimmed)) {
        container.append(document.createElement('hr'));
        i++;
        continue;
      }

      // ATX Headings (# .. ####)
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        if (level === 1 && !skippedLeadingTitle && options.skipLeadingH1) {
          skippedLeadingTitle = true;
          i++;
          continue;
        }
        const tag = level <= 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
        const h = document.createElement(tag);
        renderInlineInto(h, text, options);
        container.append(h);
        i++;
        continue;
      }

      // GFM Pipe Table
      if (trimmed.includes('|') && i + 1 < lines.length && isTableDivider(lines[i + 1].trim())) {
        const headers = splitTableRow(trimmed);
        i += 2;
        const wrap = document.createElement('div');
        wrap.className = 'table-scroll';
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        headers.forEach(cell => {
          const th = document.createElement('th');
          renderInlineInto(th, cell, options);
          trHead.append(th);
        });
        thead.append(trHead);
        table.append(thead);

        const tbody = document.createElement('tbody');
        while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
          const cells = splitTableRow(lines[i]);
          const tr = document.createElement('tr');
          headers.forEach((_, colIdx) => {
            const td = document.createElement('td');
            renderInlineInto(td, cells[colIdx] || '', options);
            tr.append(td);
          });
          tbody.append(tr);
          i++;
        }
        table.append(tbody);
        wrap.append(table);
        container.append(wrap);
        continue;
      }

      // Blockquote
      if (trimmed.startsWith('>')) {
        const quoteLines = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        const bq = document.createElement('blockquote');
        renderInlineInto(bq, quoteLines.join(' '), options);
        container.append(bq);
        continue;
      }

      // Unordered or Ordered Lists
      const ulMatch = trimmed.match(/^[*+-]\s+(.+)$/);
      const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (ulMatch || olMatch) {
        const isOrdered = Boolean(olMatch);
        const listEl = document.createElement(isOrdered ? 'ol' : 'ul');
        const itemRegex = isOrdered ? /^\s*\d+\.\s+(.+)$/ : /^\s*[*+-]\s+(.+)$/;

        while (i < lines.length) {
          const current = lines[i];
          const m = current.match(itemRegex);
          if (!m) break;
          const itemParts = [m[1].trim()];
          i++;
          // Continuation lines indented under list item
          while (
            i < lines.length &&
            lines[i].trim() &&
            !lines[i].trim().startsWith('@@BLOCK_') &&
            !/^\s*(?:[*+-]|\d+\.)\s+/.test(lines[i]) &&
            !/^#{1,6}\s+/.test(lines[i].trim()) &&
            /^\s{2,}/.test(lines[i])
          ) {
            itemParts.push(lines[i].trim());
            i++;
          }
          const li = document.createElement('li');
          renderInlineInto(li, itemParts.join(' '), options);
          listEl.append(li);
        }
        container.append(listEl);
        continue;
      }

      // Standard Paragraph (merge consecutive plain lines)
      const paraLines = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (
          !cur ||
          cur.startsWith('@@BLOCK_') ||
          /^#{1,6}\s+/.test(cur) ||
          cur.startsWith('>') ||
          /^(?:---|\*\*\*|___)\s*$/.test(cur) ||
          /^(?:[*+-]|\d+\.)\s+/.test(cur) ||
          (cur.includes('|') && i + 1 < lines.length && isTableDivider(lines[i + 1].trim()))
        ) {
          break;
        }
        paraLines.push(cur);
        i++;
      }
      if (paraLines.length) {
        if (
          !skippedLeadingTitle &&
          options.skipLeadingTitleText &&
          paraLines.length === 1 &&
          paraLines[0].toLowerCase() === options.skipLeadingTitleText.toLowerCase()
        ) {
          skippedLeadingTitle = true;
          continue;
        }
        skippedLeadingTitle = true;
        const p = document.createElement('p');
        renderInlineInto(p, paraLines.join(' '), options);
        container.append(p);
      } else {
        i++;
      }
    }
  }

  window.RLMathMarkdown = {
    safeURL,
    hasFormalMath,
    renderMathElement,
    renderInlineInto,
    renderMarkdownInto,
    upgradeMathIn
  };
})();
