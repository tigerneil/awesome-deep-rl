'use strict';

// Curated, unranked selection. Each source supports the accompanying focus text.
// Review the official source before changing a description or research tag.
(() => {
  const labs = [
    {
      name: 'Ai2 — Allen Institute for AI', short: 'Ai2', type: 'Nonprofit',
      location: 'Seattle, USA', regions: ['North America'], focus: ['LLMs'],
      topics: ['Open models', 'Reproducibility'],
      description: 'Builds the Olmo family of language models, sharing training data, code, and model artifacts to make foundation-model research more reproducible.',
      source: 'https://allenai.org/olmo'
    },
    {
      name: 'Amii', short: 'AM', type: 'Nonprofit',
      location: 'Alberta, Canada', regions: ['North America'], focus: ['RL'],
      topics: ['Learning from experience', 'RL foundations'],
      description: 'The Alberta Machine Intelligence Institute studies reinforcement learning, from fundamental methods for learning through interaction to practical applications.',
      source: 'https://www.amii.ca/research-talent/research-areas/reinforcement-learning-rl'
    },
    {
      name: 'Anthropic', short: 'A', type: 'Industry',
      location: 'USA · international teams', regions: ['North America'], focus: ['LLMs'],
      topics: ['Alignment', 'AI safety'],
      description: 'Studies how to align language models with human intentions, including scalable oversight, model behavior, and automated alignment research.',
      source: 'https://www.anthropic.com/research/team/alignment'
    },
    {
      name: 'Berkeley AI Research', short: 'BA', type: 'Academic',
      location: 'University of California, Berkeley · USA', regions: ['North America'], focus: ['LLMs', 'RL'],
      topics: ['Robot learning', 'Generative models'],
      description: 'BAIR connects language models, reinforcement learning, and robotics, with work on dialogue systems, generative models, and agents that learn to act.',
      source: 'https://bair.berkeley.edu/blog/archive/'
    },
    {
      name: 'CMU R-PAD', short: 'CM', type: 'Academic',
      location: 'Carnegie Mellon University · USA', regions: ['North America'], focus: ['RL'],
      topics: ['Robot manipulation', 'Sim-to-real'],
      description: 'The Robots Perceiving and Doing Lab studies robot perception and control, learning to manipulate objects, and transferring learned skills into the real world.',
      source: 'https://r-pad.github.io/'
    },
    {
      name: 'DeepSeek', short: 'DS', type: 'Industry',
      location: 'China', regions: ['Asia'], focus: ['LLMs', 'RL'],
      topics: ['Reasoning', 'Open weights'],
      description: 'Explores large-scale reinforcement learning for language-model reasoning. Its R1 research includes reasoning that emerges through RL and distillation into smaller models.',
      source: 'https://github.com/deepseek-ai/DeepSeek-R1'
    },
    {
      name: 'ETH Zurich RSL', short: 'ETH', type: 'Academic',
      location: 'ETH Zurich · Switzerland', regions: ['Europe'], focus: ['RL'],
      topics: ['Legged locomotion', 'Robot control'],
      description: 'The Robotic Systems Lab develops reinforcement-learning methods for robot control, helping legged robots move and navigate through challenging environments.',
      source: 'https://rsl.ethz.ch/research/researchtopics/rl-robotics.html'
    },
    {
      name: 'Google DeepMind', short: 'GD', type: 'Industry',
      location: 'United Kingdom · international teams', regions: ['Europe', 'North America'], focus: ['LLMs', 'RL'],
      topics: ['World models', 'Planning'],
      description: 'Research spans Gemini language models, learning agents, and robotics, with deep reinforcement-learning roots in AlphaZero and MuZero.',
      source: 'https://deepmind.google/research/'
    },
    {
      name: 'MBZUAI Institute of Foundation Models', short: 'IFM', type: 'Academic',
      location: 'Abu Dhabi, United Arab Emirates', regions: ['Middle East'], focus: ['LLMs', 'RL'],
      topics: ['Open models', 'Verifiable rewards'],
      description: 'Develops open foundation models and the K2 Think reasoning system, using reinforcement learning with verifiable rewards for mathematical, coding, and scientific reasoning.',
      source: 'https://mbzuai.ac.ae/news/k2-think-v2-a-fully-sovereign-reasoning-model/'
    },
    {
      name: 'Meta AI Research', short: 'MA', type: 'Industry',
      location: 'USA & Europe', regions: ['North America', 'Europe'], focus: ['LLMs', 'RL'],
      topics: ['Open weights', 'Preference learning'],
      description: 'Publishes language-model research including Llama. Llama 3 post-training combines supervised learning, PPO, and preference optimization to improve alignment and reasoning.',
      source: 'https://ai.meta.com/blog/meta-llama-3/'
    },
    {
      name: 'Mila', short: 'Mi', type: 'Nonprofit',
      location: 'Montréal, Canada', regions: ['North America'], focus: ['LLMs', 'RL'],
      topics: ['Language understanding', 'Multimodal learning'],
      description: 'The Quebec Artificial Intelligence Institute brings together research in deep learning, reinforcement learning, natural language processing, and multimodal systems.',
      source: 'https://mila.quebec/en/research/core-expertise'
    },
    {
      name: 'Mistral AI', short: 'M', type: 'Industry',
      location: 'France', regions: ['Europe'], focus: ['LLMs'],
      topics: ['Open weights', 'Multilingual models'],
      description: 'Develops language and multimodal models, with research releases spanning open-weight models, coding, speech, and multilingual capabilities.',
      source: 'https://mistral.ai/news/'
    },
    {
      name: 'OpenAI', short: 'OA', type: 'Industry',
      location: 'USA · international teams', regions: ['North America'], focus: ['LLMs', 'RL'],
      topics: ['Reasoning', 'Post-training'],
      description: 'Uses large-scale reinforcement learning to improve language-model reasoning, including learning to work through multi-step problems before producing an answer.',
      source: 'https://openai.com/index/learning-to-reason-with-llms/'
    },
    {
      name: 'Oxford FLAIR', short: 'OX', type: 'Academic',
      location: 'University of Oxford · United Kingdom', regions: ['Europe'], focus: ['LLMs', 'RL'],
      topics: ['Multi-agent learning', 'Human–AI coordination'],
      description: 'The Foerster Lab for AI Research connects large-scale pretraining with reinforcement learning and search, including multi-agent learning and coordination with humans.',
      source: 'https://foersterlab.com/'
    },
    {
      name: 'Qwen', short: 'Q', type: 'Industry',
      location: 'Alibaba · China', regions: ['Asia'], focus: ['LLMs', 'RL'],
      topics: ['Reasoning', 'Open weights'],
      description: 'Develops the Qwen language-model family. Qwen3 combines reasoning-focused reinforcement learning with general RL to improve reasoning and agent capabilities.',
      source: 'https://qwenlm.github.io/blog/qwen3/'
    },
    {
      name: 'Stanford CRFM', short: 'SU', type: 'Academic',
      location: 'Stanford University · USA', regions: ['North America'], focus: ['LLMs'],
      topics: ['Foundation models', 'Evaluation'],
      description: 'The Center for Research on Foundation Models studies how foundation models are developed, evaluated, and deployed, alongside their societal impact.',
      source: 'https://crfm.stanford.edu/'
    }
  ];
  const get = id => document.getElementById(id);
  let focus = 'all';
  let expanded = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    return node;
  }

  function renderLabs() {
    const query = get('lab-search').value.trim().toLocaleLowerCase();
    const type = get('lab-type').value;
    const region = get('lab-region').value;
    const matches = labs.filter(lab =>
      (focus === 'all' || lab.focus.includes(focus)) &&
      (type === 'all' || lab.type === type) &&
      (region === 'all' || lab.regions.includes(region)) &&
      [lab.name, lab.location, lab.description, ...lab.topics, ...lab.focus]
        .join(' ').toLocaleLowerCase().includes(query)
    );
    const visible = expanded ? matches : matches.slice(0, 6);
    get('lab-total').textContent = labs.length;
    get('lab-results').textContent = `${visible.length} of ${matches.length} labs`;
    get('lab-empty').hidden = matches.length > 0;
    get('lab-more').hidden = matches.length <= 6;
    get('lab-more').textContent = expanded ? 'Show fewer labs ↑' : `Explore all ${matches.length} labs ↓`;
    get('lab-more').setAttribute('aria-expanded', String(expanded));
    get('lab-more').setAttribute('aria-controls', 'lab-cards');
    get('lab-cards').replaceChildren();

    visible.forEach(lab => {
      const card = element('article', 'lab-card', '');
      const top = element('div', 'lab-card-top', '');
      const monogram = element('span', 'lab-monogram', lab.short);
      monogram.setAttribute('aria-hidden', 'true');
      top.append(monogram, element('span', 'lab-kind', lab.type));
      const tags = element('div', 'lab-tags', '');
      [...lab.focus, ...lab.topics].forEach(tag => tags.append(element('span', '', tag)));
      const source = element('a', 'lab-source', 'Research & source');
      source.href = lab.source;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.setAttribute('aria-label', `${lab.name}: official research source (opens in new tab)`);
      source.append(element('span', '', '↗'));
      card.append(top, element('h3', '', lab.name), element('p', 'lab-location', lab.location),
        element('p', 'lab-description', lab.description), tags, source);
      get('lab-cards').append(card);
    });
  }

  function updateFilters() { expanded = false; renderLabs(); }
  get('lab-search').addEventListener('input', updateFilters);
  get('lab-type').addEventListener('change', updateFilters);
  get('lab-region').addEventListener('change', updateFilters);
  document.querySelectorAll('[data-focus]').forEach(button => {
    button.addEventListener('click', () => {
      focus = button.dataset.focus;
      document.querySelectorAll('[data-focus]').forEach(item =>
        item.setAttribute('aria-pressed', String(item === button)));
      updateFilters();
    });
  });
  get('lab-reset').addEventListener('click', () => {
    get('lab-search').value = '';
    get('lab-type').value = 'all';
    get('lab-region').value = 'all';
    document.querySelector('[data-focus="all"]').click();
    get('lab-search').focus();
  });
  get('lab-more').addEventListener('click', () => {
    expanded = !expanded;
    renderLabs();
    if (!expanded) get('lab-more').scrollIntoView({ block: 'nearest' });
  });
  renderLabs();
})();
