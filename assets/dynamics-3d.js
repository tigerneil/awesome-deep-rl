'use strict';

/**
 * Deep RL Atlas — Interactive 3D Research Evolution Dynamics (FIG. 002)
 * Zero-dependency HiDPI perspective 3D engine illustrating how Deep RL evolves (1992–2026)
 * across 12 canonical domains, causal cross-domain transfers, and 3 morphing 3D lenses:
 *   1. 'terrain'    — Spacetime Research Density Terrain (Time × 12 Domains × Momentum)
 *   2. 'capability' — 3D Capability Phase Space (Model Priors × Horizon × Data Regime)
 *   3. 'orbital'    — 3D Chronological Paradigm Sphere & Cross-Domain Convergence Chords
 */
(() => {
  const LS = window.RL_LANDSCAPE || { DOMAINS: [], DOMAIN_MAP: new Map() };
  const DOMAINS = LS.DOMAINS || [];

  // Scientifically calibrated HSL hues (strictly zero purple: avoids 255deg-325deg)
  const DOMAIN_HUES = {
    'value-td': 175,
    'policy-trust': 189,
    'dist-maxent': 202,
    'world-planning': 214,
    'offline-generative': 156,
    'exploration-intrinsic': 138,
    'hierarchical-meta': 165,
    'multi-agent': 224,
    'imitation-irl-safety': 48,
    'llm-alignment-reasoning': 36,
    'agentic-tool-rl': 27,
    'embodied-vla': 16
  };

  // Compact 3D axis labels to keep perspective framing razor-sharp without edge clipping
  const DOMAIN_SHORT_3D = {
    'value-td': '01 Value & TD',
    'policy-trust': '02 Policy & AC',
    'dist-maxent': '03 MaxEnt / Dist',
    'world-planning': '04 World Models',
    'offline-generative': '05 Offline & Flow',
    'exploration-intrinsic': '06 Exploration',
    'hierarchical-meta': '07 Meta & Options',
    'multi-agent': '08 Multi-Agent',
    'imitation-irl-safety': '09 IRL & Safety',
    'llm-alignment-reasoning': '10 LLM & RLVR',
    'agentic-tool-rl': '11 Agentic RL',
    'embodied-vla': '12 Embodied VLA'
  };

  // Pre-2015 genesis milestones anchoring the 1992–2014 scientific origin
  const GENESIS_ANCHORS = [
    {
      id: 'REINFORCE-1992',
      label: 'REINFORCE',
      title: 'REINFORCE: Simple Statistical Gradient-Following Algorithms',
      domain: 'policy-trust',
      year: 1992.5,
      authors: 'Ronald J. Williams',
      venue: 'Machine Learning 1992',
      description:
        'Introduced unbiased Monte Carlo policy-gradient updates using score-function log-derivatives, establishing the foundation for TRPO, PPO, RLHF, and GRPO.',
      fallbackNoteId: 'TRPO',
      genesis: true
    },
    {
      id: 'TD-Gammon-1995',
      label: 'TD-Gammon',
      title: 'TD-Gammon: Temporal Difference Learning & Neural Self-Play',
      domain: 'value-td',
      year: 1995.2,
      authors: 'Gerald Tesauro',
      venue: 'CACM 1995',
      description:
        'Demonstrated championship-level backgammon by combining TD(λ) bootstrapping with neural value approximation and pure self-play.',
      fallbackNoteId: 'DQN',
      genesis: true
    },
    {
      id: 'Actor-Critic-2000',
      label: 'Policy Grad Thm',
      title: 'Policy Gradient Methods for RL with Function Approximation',
      domain: 'policy-trust',
      year: 2000.0,
      authors: 'Sutton, McAllester, Singh, Mansour',
      venue: 'NeurIPS 1999',
      description:
        'Formalized the Policy Gradient Theorem with compatible critic function approximation, unifying actor-critic methods.',
      fallbackNoteId: 'GAE',
      genesis: true
    },
    {
      id: 'UCT-MCTS-2006',
      label: 'UCT / MCTS',
      title: 'Bandit Based Monte-Carlo Planning (UCT) & Dyna Search',
      domain: 'world-planning',
      year: 2006.5,
      authors: 'Kocsis & Szepesvári',
      venue: 'ECML 2006',
      description:
        'Coupled upper-confidence-bound tree search with simulated rollouts, laying the planning backbone for AlphaZero and MuZero.',
      fallbackNoteId: 'AlphaZero',
      genesis: true
    }
  ];

  // Curated canonical landmarks with precise publication years and capability coordinates
  // Capability space (x, y, z) in [-1, 1]^3:
  //   x: Model-Free Reactive (-1)  -> Learned World Model / Foundation Prior (+1)
  //   y: Atomic Step Control (-1)  -> Long-Horizon Planning, Reasoning & VLA Chunks (+1)
  //   z: Online Sim Rollouts (-1)  -> Offline Data, Human Preferences & Verifiable Real Feedback (+1)
  const LANDMARK_META = {
    'REINFORCE-1992': { year: 1992.5, cap: [-0.95, -0.88, -0.92], label: 'REINFORCE', tier: 2 },
    'TD-Gammon-1995': { year: 1995.2, cap: [-0.88, -0.78, -0.96], label: 'TD-Gammon', tier: 2 },
    'Actor-Critic-2000': { year: 2000.0, cap: [-0.82, -0.72, -0.86], label: 'PG Theorem', tier: 1 },
    'UCT-MCTS-2006': { year: 2006.5, cap: [0.35, 0.05, -0.90], label: 'UCT / MCTS', tier: 2 },

    DQN: { year: 2015.1, cap: [-0.85, -0.68, -0.64], label: 'DQN', tier: 3 },
    TRPO: { year: 2015.4, cap: [-0.80, -0.58, -0.78], label: 'TRPO', tier: 3 },
    DDPG: { year: 2016.0, cap: [-0.74, -0.50, -0.52], label: 'DDPG', tier: 2 },
    DDQN: { year: 2016.2, cap: [-0.82, -0.62, -0.58], label: 'DDQN', tier: 1 },
    Dueling: { year: 2016.3, cap: [-0.76, -0.56, -0.56], label: 'Dueling', tier: 1 },
    PER: { year: 2016.35, cap: [-0.78, -0.58, -0.46], label: 'PER', tier: 1 },
    GAE: { year: 2016.4, cap: [-0.72, -0.44, -0.74], label: 'GAE', tier: 2 },
    A3C: { year: 2016.5, cap: [-0.76, -0.50, -0.80], label: 'A3C', tier: 2 },
    GAIL: { year: 2016.8, cap: [-0.36, -0.32, 0.28], label: 'GAIL', tier: 2 },

    PPO: { year: 2017.5, cap: [-0.66, -0.34, -0.68], label: 'PPO', tier: 3 },
    C51: { year: 2017.6, cap: [-0.58, -0.46, -0.50], label: 'C51', tier: 2 },
    I2As: { year: 2017.65, cap: [0.28, -0.14, -0.66], label: 'I2As', tier: 1 },
    AlphaZero: { year: 2017.9, cap: [0.64, 0.34, -0.84], label: 'AlphaZero', tier: 3 },
    'QR-DQN': { year: 2017.8, cap: [-0.52, -0.44, -0.48], label: 'QR-DQN', tier: 1 },

    Rainbow: { year: 2018.1, cap: [-0.60, -0.42, -0.44], label: 'Rainbow', tier: 2 },
    SAC: { year: 2018.2, cap: [-0.46, -0.26, -0.34], label: 'SAC', tier: 3 },
    TD3: { year: 2018.25, cap: [-0.58, -0.34, -0.40], label: 'TD3', tier: 2 },
    IMPALA: { year: 2018.3, cap: [-0.64, -0.30, -0.62], label: 'IMPALA', tier: 1 },
    'World-Models': { year: 2018.35, cap: [0.58, 0.04, -0.36], label: 'World Models', tier: 3 },
    QMIX: { year: 2018.4, cap: [-0.40, -0.06, -0.58], label: 'QMIX', tier: 2 },
    NoisyNet: { year: 2018.45, cap: [-0.62, -0.40, -0.54], label: 'NoisyNet', tier: 1 },
    IQN: { year: 2018.5, cap: [-0.44, -0.36, -0.42], label: 'IQN', tier: 1 },
    MPO: { year: 2018.55, cap: [-0.38, -0.22, -0.26], label: 'MPO', tier: 1 },
    HIRO: { year: 2018.6, cap: [-0.28, 0.22, -0.34], label: 'HIRO', tier: 1 },
    UBE: { year: 2018.7, cap: [-0.34, -0.24, -0.46], label: 'UBE', tier: 1 },
    LOLA: { year: 2018.75, cap: [-0.14, 0.04, -0.52], label: 'LOLA', tier: 1 },

    PEARL: { year: 2019.3, cap: [0.02, 0.14, -0.18], label: 'PEARL', tier: 2 },
    MuZero: { year: 2020.2, cap: [0.76, 0.42, -0.56], label: 'MuZero', tier: 3 },
    CQL: { year: 2020.5, cap: [-0.16, -0.10, 0.68], label: 'CQL', tier: 3 },
    PPG: { year: 2020.7, cap: [-0.42, -0.18, -0.44], label: 'PPG', tier: 1 },

    'Decision-Transformer': { year: 2021.4, cap: [0.24, 0.28, 0.78], label: 'Decision-T', tier: 3 },
    IQL: { year: 2021.8, cap: [-0.08, -0.02, 0.74], label: 'IQL', tier: 2 },

    'RLHF-InstructGPT': { year: 2022.3, cap: [0.52, 0.56, 0.72], label: 'RLHF', tier: 3 },
    MAPPO: { year: 2022.6, cap: [-0.30, 0.14, -0.48], label: 'MAPPO', tier: 2 },

    DreamerV3: { year: 2023.1, cap: [0.84, 0.46, -0.26], label: 'DreamerV3', tier: 3 },
    'Diffusion-Policy': { year: 2023.4, cap: [0.34, 0.32, 0.64], label: 'Diffusion Policy', tier: 3 },
    DPO: { year: 2023.5, cap: [0.58, 0.60, 0.86], label: 'DPO', tier: 3 },

    'TD-MPC2': { year: 2024.1, cap: [0.86, 0.48, -0.06], label: 'TD-MPC2', tier: 3 },
    OpenVLA: { year: 2024.5, cap: [0.68, 0.56, 0.54], label: 'OpenVLA', tier: 3 },
    'Pi0-Flow-VLA': { year: 2024.85, cap: [0.76, 0.66, 0.58], label: 'π0 Flow-VLA', tier: 3 },

    'GRPO-DeepSeek-R1': { year: 2025.1, cap: [0.72, 0.86, 0.76], label: 'GRPO / R1', tier: 3 },

    'Relative-Value-Learning': { year: 2026.2, cap: [-0.20, 0.16, 0.24], label: 'Rel. Value', tier: 1 },
    'Distributional-IRL': { year: 2026.25, cap: [0.10, 0.24, 0.58], label: 'Dist-IRL', tier: 1 },
    'K-PWM': { year: 2026.35, cap: [0.92, 0.60, 0.16], label: 'K-PWM', tier: 2 },
    'Latent-Policy-Steering': { year: 2026.42, cap: [0.80, 0.72, 0.48], label: 'Latent Steering', tier: 2 },
    TACA: { year: 2026.48, cap: [0.70, 0.88, 0.62], label: 'TACA', tier: 2 },
    LoongRL: { year: 2026.52, cap: [0.74, 0.90, 0.66], label: 'LoongRL', tier: 2 },
    'T3-Belief-RL': { year: 2026.56, cap: [0.80, 0.84, 0.54], label: 'T3-Belief', tier: 1 },
    SDPO: { year: 2026.6, cap: [0.66, 0.80, 0.82], label: 'SDPO', tier: 2 },
    NOPO: { year: 2026.64, cap: [0.76, 0.92, 0.84], label: 'NOPO', tier: 2 },
    VEPO: { year: 2026.68, cap: [0.68, 0.86, 0.78], label: 'VEPO', tier: 2 },
    HyperSkill: { year: 2026.72, cap: [0.62, 0.94, 0.48], label: 'HyperSkill', tier: 2 },
    SALA: { year: 2026.82, cap: [0.74, 0.96, 0.64], label: 'SALA', tier: 2 },
    JEPA4R: { year: 2026.85, cap: [0.96, 0.74, 0.42], label: 'JEPA4R', tier: 2 },
    ScaleVLA: { year: 2026.86, cap: [0.86, 0.78, 0.62], label: 'ScaleVLA', tier: 2 },
    ViRA: { year: 2026.87, cap: [0.82, 0.74, 0.68], label: 'ViRA', tier: 1 },
    'Regularized-Score-Centering': { year: 2026.88, cap: [0.72, 0.88, 0.88], label: 'Score Centering', tier: 2 },
    'Heave-Ho': { year: 2026.9, cap: [0.68, 0.82, 0.28], label: 'Heave-Ho', tier: 2 }
  };

  // Directed paradigm lineage & cross-domain transfer edges: [fromId, toId, kind]
  // kind: 'evolution' (intra-lineage) | 'transfer' (cross-domain breakthrough bridge)
  const LINEAGE_EDGES = [
    ['REINFORCE-1992', 'TRPO', 'evolution'],
    ['Actor-Critic-2000', 'GAE', 'evolution'],
    ['Actor-Critic-2000', 'A3C', 'evolution'],
    ['TRPO', 'GAE', 'evolution'],
    ['TRPO', 'PPO', 'evolution'],
    ['GAE', 'PPO', 'evolution'],
    ['A3C', 'IMPALA', 'evolution'],
    ['PPO', 'PPG', 'evolution'],
    ['PPO', 'MAPPO', 'transfer'],
    ['PPO', 'RLHF-InstructGPT', 'transfer'],
    ['PPO', 'GRPO-DeepSeek-R1', 'transfer'],
    ['RLHF-InstructGPT', 'DPO', 'evolution'],
    ['RLHF-InstructGPT', 'GRPO-DeepSeek-R1', 'evolution'],
    ['DPO', 'SDPO', 'evolution'],
    ['GRPO-DeepSeek-R1', 'NOPO', 'evolution'],
    ['GRPO-DeepSeek-R1', 'VEPO', 'evolution'],
    ['GRPO-DeepSeek-R1', 'Regularized-Score-Centering', 'evolution'],
    ['GRPO-DeepSeek-R1', 'TACA', 'transfer'],
    ['GRPO-DeepSeek-R1', 'LoongRL', 'transfer'],
    ['TACA', 'SALA', 'evolution'],
    ['LoongRL', 'T3-Belief-RL', 'evolution'],
    ['T3-Belief-RL', 'HyperSkill', 'evolution'],

    ['TD-Gammon-1995', 'DQN', 'evolution'],
    ['DQN', 'DDQN', 'evolution'],
    ['DQN', 'Dueling', 'evolution'],
    ['DQN', 'PER', 'evolution'],
    ['DDQN', 'Rainbow', 'evolution'],
    ['PER', 'Rainbow', 'evolution'],
    ['DQN', 'C51', 'transfer'],
    ['C51', 'Rainbow', 'transfer'],
    ['C51', 'QR-DQN', 'evolution'],
    ['QR-DQN', 'IQN', 'evolution'],
    ['IQN', 'Relative-Value-Learning', 'transfer'],

    ['DDPG', 'TD3', 'evolution'],
    ['TD3', 'SAC', 'transfer'],
    ['SAC', 'MPO', 'evolution'],
    ['SAC', 'CQL', 'transfer'],
    ['CQL', 'IQL', 'evolution'],
    ['IQL', 'Decision-Transformer', 'evolution'],
    ['Decision-Transformer', 'Diffusion-Policy', 'evolution'],
    ['Decision-Transformer', 'OpenVLA', 'transfer'],
    ['Diffusion-Policy', 'Pi0-Flow-VLA', 'transfer'],
    ['OpenVLA', 'Pi0-Flow-VLA', 'evolution'],
    ['Pi0-Flow-VLA', 'ScaleVLA', 'evolution'],
    ['Pi0-Flow-VLA', 'Latent-Policy-Steering', 'evolution'],
    ['Pi0-Flow-VLA', 'ViRA', 'evolution'],

    ['UCT-MCTS-2006', 'AlphaZero', 'evolution'],
    ['AlphaZero', 'MuZero', 'evolution'],
    ['I2As', 'World-Models', 'evolution'],
    ['World-Models', 'MuZero', 'evolution'],
    ['World-Models', 'DreamerV3', 'evolution'],
    ['MuZero', 'TD-MPC2', 'evolution'],
    ['DreamerV3', 'TD-MPC2', 'evolution'],
    ['TD-MPC2', 'K-PWM', 'evolution'],
    ['TD-MPC2', 'JEPA4R', 'transfer'],

    ['DQN', 'QMIX', 'transfer'],
    ['QMIX', 'MAPPO', 'evolution'],
    ['MAPPO', 'Heave-Ho', 'transfer'],
    ['TRPO', 'GAIL', 'transfer'],
    ['GAIL', 'Distributional-IRL', 'evolution'],
    ['DQN', 'NoisyNet', 'transfer'],
    ['NoisyNet', 'UBE', 'evolution'],
    ['SAC', 'PEARL', 'transfer'],
    ['PEARL', 'HIRO', 'evolution'],
    ['HIRO', 'HyperSkill', 'transfer']
  ];

  // Historical epoch narratives for the side telemetry panel
  const EPOCH_NARRATIVES = [
    {
      id: 'genesis',
      minYear: 1992,
      maxYear: 2016.99,
      range: '1992 – 2016',
      title: 'Genesis: Deep Function Approximation & Trust Regions',
      summary:
        'Tabular Bellman updates and score-function policy gradients fuse with deep neural networks. Target networks (DQN), KL trust regions (TRPO), and advantage estimation (GAE) unlock pixel and continuous torque control.',
      driver: 'Stabilizing non-stationary off-policy bootstrapping and high-variance Monte Carlo gradients.',
      shift: 'Tabular MDPs → Deep Model-Free Value & Policy Control'
    },
    {
      id: 'scale',
      minYear: 2017,
      maxYear: 2019.99,
      range: '2017 – 2019',
      title: 'Scale: MaxEnt, Distributional Returns & Tree Search',
      summary:
        'Clippable actor-critics (PPO), soft entropy duals (SAC), distributional return quantiles (C51/IQN), and neural MCTS (AlphaZero) trigger rapid expansion across exploration, meta-RL, and multi-agent games.',
      driver: 'Replacing fragile heuristics with smooth entropy objectives, distributional atoms, and learned self-play.',
      shift: 'Single-Scalar Rewards → Distributional, Entropy-Regularized & Latent Dynamics'
    },
    {
      id: 'world-offline',
      minYear: 2020,
      maxYear: 2023.99,
      range: '2020 – 2023',
      title: 'Data & Imagination: Offline RL, World Models & RLHF',
      summary:
        'RL breaks free from tabula-rasa simulators. Conservative offline critics (CQL/IQL), generative diffusion policies, universal latent world models (MuZero/DreamerV3), and RLHF/DPO align billion-parameter foundation models.',
      driver: 'Preventing OOD value overestimation while scaling RL from games into static datasets and language.',
      shift: 'Tabula-Rasa Simulators → World-Model Imagination, Offline Flows & Human Preferences'
    },
    {
      id: 'frontier',
      minYear: 2024,
      maxYear: 2027,
      range: '2024 – 2026',
      title: 'Convergence: Verifiable Reasoning, Agents & Embodied VLAs',
      summary:
        'Classic RL operators converge with foundation priors: critic-free GRPO/RLVR fuels emergent reasoning, multi-turn credit assignment powers tool-using agents (TACA/SALA), and flow-matching VLAs + residual RL (π0, JEPA4R, Heave-Ho) drive physical robots.',
      driver: 'Steering pretrained multimodal priors with verifiable rewards, self-distillation, and closed-loop real-world feedback.',
      shift: 'Narrow Policies → Pretrained Reasoning Agents & Closed-Loop Embodied VLAs'
    }
  ];

  // Default capability center per domain for non-landmark corpus items
  const DOMAIN_CAP_CENTER = {
    'value-td': [-0.65, -0.45, -0.45],
    'policy-trust': [-0.60, -0.30, -0.58],
    'dist-maxent': [-0.42, -0.28, -0.35],
    'world-planning': [0.70, 0.35, -0.25],
    'offline-generative': [0.18, 0.18, 0.72],
    'exploration-intrinsic': [-0.30, -0.15, -0.42],
    'hierarchical-meta': [0.05, 0.34, -0.15],
    'multi-agent': [-0.22, 0.14, -0.48],
    'imitation-irl-safety': [-0.08, 0.04, 0.42],
    'llm-alignment-reasoning': [0.68, 0.78, 0.80],
    'agentic-tool-rl': [0.72, 0.88, 0.62],
    'embodied-vla': [0.78, 0.68, 0.46]
  };

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function hashString(str) {
    let h = 2166136261 >>> 0;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967295;
  }

  // Non-linear time mapping: 1992–2014 occupies [0, 0.14], 2015–2026.95 occupies [0.14, 1.0]
  function yearToU(year) {
    const y = clamp(year, 1992, 2026.95);
    if (y <= 2014.5) {
      return 0.14 * ((y - 1992) / (2014.5 - 1992));
    }
    return 0.14 + 0.86 * ((y - 2014.5) / (2026.95 - 2014.5));
  }

  function uToYear(u) {
    const t = clamp(u, 0, 1);
    if (t <= 0.14) {
      return 1992 + (t / 0.14) * (2014.5 - 1992);
    }
    return 2014.5 + ((t - 0.14) / 0.86) * (2026.95 - 2014.5);
  }

  function parseFractionalYear(item) {
    if (LANDMARK_META[item.id]) return LANDMARK_META[item.id].year;
    if (item.publishedAt && /^\d{4}-\d{2}-\d{2}/.test(item.publishedAt)) {
      const [yy, mm, dd] = item.publishedAt.split('-').map(Number);
      if (yy >= 1992 && yy <= 2027) {
        return yy + ((mm - 1) * 30.4 + (dd - 1)) / 365.25;
      }
    }
    const baseYear = clamp(Number(item.year) || 2018, 2015, 2026);
    const jitter = hashString(item.id || item.title) * 0.86;
    return baseYear + 0.06 + jitter;
  }

  function getEpochNarrative(year) {
    return (
      EPOCH_NARRATIVES.find(e => year >= e.minYear && year <= e.maxYear) ||
      EPOCH_NARRATIVES[EPOCH_NARRATIVES.length - 1]
    );
  }

  function initRLDynamics3D(options = {}) {
    const canvas = options.canvas || document.getElementById('dynamics-3d-canvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const onOpenNote = typeof options.onOpenNote === 'function' ? options.onOpenNote : null;
    const onFilterDomain = typeof options.onFilterDomain === 'function' ? options.onFilterDomain : null;

    const modeButtons = [...document.querySelectorAll('[data-d3d-mode]')];
    const presetButtons = [...document.querySelectorAll('[data-d3d-preset]')];
    const eraButtons = [...document.querySelectorAll('[data-d3d-era]')];
    const sliderEl = document.getElementById('d3d-year-slider');
    const yearDisplayEl = document.getElementById('d3d-year-display');
    const visibleCountEl = document.getElementById('d3d-visible-count');
    const playBtn = document.getElementById('d3d-play');
    const orbitBtn = document.getElementById('d3d-orbit');
    const zoomInBtn = document.getElementById('d3d-zoom-in');
    const zoomOutBtn = document.getElementById('d3d-zoom-out');
    const domainBarEl = document.getElementById('d3d-domain-bar');
    const inspectorEl = document.getElementById('d3d-inspector-body');
    const axisHintEl = document.getElementById('d3d-axis-legend');
    const statusBadgeEl = document.getElementById('d3d-telemetry-pill');

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const domainIndexMap = new Map(DOMAINS.map((d, idx) => [d.id, idx]));

    // 3D Scene & Camera State
    let width = 0;
    let height = 0;
    let mode = 'terrain'; // 'terrain' | 'capability' | 'orbital'
    let activeYear = 2026.95;
    let activeDomainFilter = 'all';
    let playingTimeline = false;
    let autoOrbit = !reduced.matches;
    let isVisible = true;
    let animTime = 0;

    // Perspective camera angles (radians) and zoom distance
    const cam = {
      yaw: -0.56,
      pitch: 0.45,
      dist: 4.82,
      targetYaw: -0.56,
      targetPitch: 0.45,
      targetDist: 4.82,
      velYaw: 0,
      velPitch: 0
    };

    const CAMERA_PRESETS = {
      iso: { yaw: -0.56, pitch: 0.45, dist: 4.82 },
      top: { yaw: -0.04, pitch: 1.32, dist: 4.75 },
      side: { yaw: 0.0, pitch: 0.16, dist: 4.65 }
    };

    // Data structures rebuilt on catalog updates
    let catalogRef = [];
    let nodes = [];
    let nodeById = new Map();
    let edges = [];
    let adjUp = new Map();
    let adjDown = new Map();

    // Precomputed 3D Terrain density grid [12 domains][TIME_STEPS]
    const TIME_STEPS = 44;
    let terrainGrid = [];
    let maxTerrainDensity = 1;
    let centroidSpline = [];

    // Interaction state
    let dragging = false;
    let dragMoved = false;
    let lastPointer = { x: 0, y: 0 };
    let hoveredNode = null;
    let pinnedNode = null;
    let projectedHitList = [];
    let lastInspectorKey = '';
    let rafId = 0;
    let lastFrameTs = 0;

    function themePalette() {
      const light = document.documentElement.dataset.theme === 'light';
      return {
        light,
        bgTop: light ? '#f8f6f1' : '#0a0f16',
        bgBottom: light ? '#eeebe2' : '#06090e',
        ink: light ? '#141d28' : '#eef4fa',
        secondary: light ? '#3f4f63' : '#9eb0c4',
        muted: light ? '#67768a' : '#6c7d93',
        grid: light ? 'rgba(20, 29, 40, 0.10)' : 'rgba(215, 228, 242, 0.075)',
        gridStrong: light ? 'rgba(20, 29, 40, 0.22)' : 'rgba(215, 228, 242, 0.18)',
        accent: light ? '#0b7a73' : '#1adbc9',
        signal: light ? '#c84e12' : '#f68832',
        sliceFill: light ? 'rgba(11, 122, 115, 0.075)' : 'rgba(26, 219, 201, 0.085)',
        sliceStroke: light ? 'rgba(11, 122, 115, 0.58)' : 'rgba(26, 219, 201, 0.65)',
        labelBg: light ? 'rgba(255, 255, 255, 0.88)' : 'rgba(9, 14, 21, 0.84)',
        labelBorder: light ? 'rgba(20, 29, 40, 0.16)' : 'rgba(215, 228, 242, 0.16)'
      };
    }

    function domainColor(domainId, alpha = 1, boostLightness = 0) {
      const hue = DOMAIN_HUES[domainId] !== undefined ? DOMAIN_HUES[domainId] : 175;
      const light = document.documentElement.dataset.theme === 'light';
      const sat = light ? 72 : 76;
      const lum = clamp((light ? 36 : 56) + boostLightness, 18, 86);
      return `hsla(${hue}, ${sat}%, ${lum}%, ${alpha})`;
    }

    /* ----------------------------------------------------------------------
       Empirical Corpus Ingestion & 3D Coordinate Computation
       ---------------------------------------------------------------------- */
    function buildSceneData(rawCatalog) {
      catalogRef = Array.isArray(rawCatalog) ? rawCatalog.slice() : [];
      const prevPinnedId = pinnedNode ? pinnedNode.id : null;

      // Preserve current animated coordinates when live items arrive so nodes don't snap
      const prevCoords = new Map();
      nodes.forEach(n => prevCoords.set(n.id, { x: n.cx, y: n.cy, z: n.cz }));

      const built = [];
      const seenIds = new Set();

      // 1. Add 4 historical genesis milestones (1992–2006)
      GENESIS_ANCHORS.forEach(g => {
        seenIds.add(g.id);
        const meta = LANDMARK_META[g.id];
        built.push({
          id: g.id,
          label: g.label,
          title: g.title,
          domain: g.domain,
          domainIdx: domainIndexMap.get(g.domain) ?? 0,
          year: g.year,
          authors: g.authors,
          venue: g.venue,
          description: g.description,
          fallbackNoteId: g.fallbackNoteId,
          genesis: true,
          live: false,
          hasMath: true,
          tier: meta.tier,
          isLandmark: true,
          cap: meta.cap,
          catalogItem: null
        });
      });

      // 2. Ingest every paper from RL_CATALOG + liveRadar (excluding meta docs README/WEBSITE/2026)
      catalogRef.forEach(item => {
        if (!item || !item.id || seenIds.has(item.id)) return;
        if (item.id === 'README' || item.id === 'WEBSITE' || item.id === '2026') return;
        seenIds.add(item.id);

        const meta = LANDMARK_META[item.id];
        const domId = domainIndexMap.has(item.domain) ? item.domain : 'value-td';
        const domIdx = domainIndexMap.get(domId) ?? 0;
        const year = parseFractionalYear(item);

        // Compute deterministic capability-space coordinate
        let cap;
        if (meta) {
          cap = meta.cap.slice();
        } else {
          const base = DOMAIN_CAP_CENTER[domId] || [0, 0, 0];
          const timeDrift = clamp((year - 2015) / 12, 0, 1);
          const h1 = (hashString(item.id + 'x') - 0.5) * 0.44;
          const h2 = (hashString(item.id + 'y') - 0.5) * 0.44;
          const h3 = (hashString(item.id + 'z') - 0.5) * 0.44;
          cap = [
            clamp(base[0] * 0.8 + (timeDrift - 0.45) * 0.42 + h1, -0.96, 0.96),
            clamp(base[1] * 0.8 + (timeDrift - 0.45) * 0.48 + h2, -0.96, 0.96),
            clamp(base[2] * 0.8 + (timeDrift - 0.45) * 0.36 + h3, -0.96, 0.96)
          ];
        }

        const isLandmark = Boolean(meta);
        const tier = meta ? meta.tier : item.live ? 1 : item.hasMath ? 1 : 0;

        built.push({
          id: item.id,
          label: meta ? meta.label : item.id.replace(/^live-/, 'arXiv:').slice(0, 18),
          title: item.title || item.id,
          domain: domId,
          domainIdx: domIdx,
          year,
          authors: item.authors || '',
          venue: item.venue || (item.live ? `Live ${item.publishedAt || '2026'}` : String(Math.floor(year))),
          description: item.description || '',
          genesis: false,
          live: Boolean(item.live),
          hasMath: Boolean(item.hasMath),
          tier,
          isLandmark,
          cap,
          catalogItem: item
        });
      });

      // 3. Compute empirical 3D Terrain density surface M(domain, u) using Gaussian KDE
      terrainGrid = Array.from({ length: DOMAINS.length }, () => new Float32Array(TIME_STEPS));
      const sigma = 0.058;
      const inv2Sig2 = 1 / (2 * sigma * sigma);

      // Seed subtle historical baseline continuity for the 4 genesis eras + empirical corpus
      built.forEach(n => {
        const uNode = yearToU(n.year);
        const weight = n.isLandmark ? 1.55 : n.live ? 1.15 : 0.82;
        const row = terrainGrid[n.domainIdx];
        if (!row) return;
        for (let s = 0; s < TIME_STEPS; s++) {
          const u = s / (TIME_STEPS - 1);
          const du = u - uNode;
          if (Math.abs(du) < 0.28) {
            row[s] += weight * Math.exp(-du * du * inv2Sig2);
          }
        }
      });

      // Apply log compression so classic 2017-2019 ridges and 2026 frontier surges both read crisply
      maxTerrainDensity = 0.001;
      for (let d = 0; d < DOMAINS.length; d++) {
        for (let s = 0; s < TIME_STEPS; s++) {
          const compressed = Math.log1p(terrainGrid[d][s] * 0.72);
          terrainGrid[d][s] = compressed;
          if (compressed > maxTerrainDensity) maxTerrainDensity = compressed;
        }
      }
      for (let d = 0; d < DOMAINS.length; d++) {
        for (let s = 0; s < TIME_STEPS; s++) {
          terrainGrid[d][s] /= maxTerrainDensity;
        }
      }

      // Helper to sample terrain elevation at any (domainIdx, u)
      function sampleTerrain(domIdx, u) {
        const row = terrainGrid[domIdx];
        if (!row) return 0;
        const pos = clamp(u, 0, 1) * (TIME_STEPS - 1);
        const i0 = Math.floor(pos);
        const i1 = Math.min(TIME_STEPS - 1, i0 + 1);
        return lerp(row[i0], row[i1], pos - i0);
      }

      // 4. Assign 3D coordinates for all 3 lenses per node
      built.forEach(n => {
        const u = yearToU(n.year);
        const surfH = sampleTerrain(n.domainIdx, u);
        const laneJitter = (hashString(n.id + 'lane') - 0.5) * 0.085;

        // Lens 1: Spacetime Terrain (X: -1.75..1.75, Y: 0..1.18, Z: -1.38..1.38)
        const tx = -1.72 + u * 3.44;
        const tz = -1.36 + (n.domainIdx / Math.max(1, DOMAINS.length - 1)) * 2.72 + laneJitter;
        const lift = n.isLandmark ? 0.14 + n.tier * 0.075 : n.live ? 0.16 : 0.055;
        const ty = -0.34 + surfH * 0.96 + lift;
        n.posTerrain = [tx, ty, tz];
        n.terrainBaseY = -0.34 + surfH * 0.96;

        // Lens 2: Capability Phase Space (Cube [-1.25..1.25]^3)
        n.posCapability = [n.cap[0] * 1.28, n.cap[1] * 0.92 + 0.08, n.cap[2] * 1.22];

        // Lens 3: Paradigm Orbital (3D expanding chronological funnel/sphere)
        const angle =
          (n.domainIdx / Math.max(1, DOMAINS.length)) * Math.PI * 2 +
          (hashString(n.id + 'ang') - 0.5) * 0.22;
        const radius = 0.24 + Math.pow(u, 0.88) * 1.44;
        const elev = -0.58 + u * 1.18 + (n.isLandmark ? 0.08 : 0) + (hashString(n.id + 'el') - 0.5) * 0.08;
        n.posOrbital = [Math.cos(angle) * radius, elev, Math.sin(angle) * radius];

        const initTarget = getTargetPosForMode(n, mode);
        const prev = prevCoords.get(n.id);
        n.cx = prev ? prev.x : initTarget[0];
        n.cy = prev ? prev.y : initTarget[1];
        n.cz = prev ? prev.z : initTarget[2];
        n.degree = 0;
      });

      nodes = built;
      nodeById = new Map(nodes.map(n => [n.id, n]));

      // 5. Build directed lineage edges & adjacency maps
      edges = [];
      adjUp = new Map();
      adjDown = new Map();
      LINEAGE_EDGES.forEach(([fromId, toId, kind]) => {
        const a = nodeById.get(fromId);
        const b = nodeById.get(toId);
        if (!a || !b) return;
        edges.push({ from: a, to: b, kind, seed: hashString(fromId + '->' + toId) });
        a.degree++;
        b.degree++;
        if (!adjDown.has(a.id)) adjDown.set(a.id, []);
        if (!adjUp.has(b.id)) adjUp.set(b.id, []);
        adjDown.get(a.id).push(b);
        adjUp.get(b.id).push(a);
      });

      // 6. Compute 3D Historical Centroid Trajectory in Capability Phase Space
      const splineYears = [1995, 2015.5, 2017.5, 2018.8, 2020.5, 2022.5, 2024.3, 2025.6, 2026.8];
      centroidSpline = splineYears
        .map(yr => {
          let sx = 0;
          let sy = 0;
          let sz = 0;
          let sw = 0;
          const bw = yr < 2015 ? 4.5 : 1.15;
          nodes.forEach(n => {
            const dy = n.year - yr;
            if (Math.abs(dy) < bw * 2.5) {
              const w = Math.exp(-(dy * dy) / (2 * bw * bw)) * (n.isLandmark ? 1.8 : 0.7);
              sx += n.posCapability[0] * w;
              sy += n.posCapability[1] * w;
              sz += n.posCapability[2] * w;
              sw += w;
            }
          });
          if (sw <= 0) return null;
          return { year: yr, x: sx / sw, y: sy / sw, z: sz / sw };
        })
        .filter(Boolean);

      if (prevPinnedId && nodeById.has(prevPinnedId)) {
        pinnedNode = nodeById.get(prevPinnedId);
      }

      buildDomainFilterBar();
      updateInspector(true);
    }

    function getTargetPosForMode(node, m) {
      if (m === 'capability') return node.posCapability;
      if (m === 'orbital') return node.posOrbital;
      return node.posTerrain;
    }

    // Collect full upstream & downstream causal thread for a focused node
    function getLineageSet(rootNode) {
      const set = new Set();
      if (!rootNode) return set;
      set.add(rootNode.id);

      const walk = (startId, map) => {
        const queue = [startId];
        let guard = 0;
        while (queue.length && guard++ < 80) {
          const cur = queue.shift();
          const neighbors = map.get(cur) || [];
          neighbors.forEach(nb => {
            if (!set.has(nb.id)) {
              set.add(nb.id);
              queue.push(nb.id);
            }
          });
        }
      };
      walk(rootNode.id, adjUp);
      walk(rootNode.id, adjDown);
      return set;
    }

    /* ----------------------------------------------------------------------
       3D Perspective Camera Projection
       ---------------------------------------------------------------------- */
    function project3D(x, y, z) {
      const cy = Math.cos(cam.yaw);
      const sy = Math.sin(cam.yaw);
      const cp = Math.cos(cam.pitch);
      const sp = Math.sin(cam.pitch);

      // Yaw rotation around Y axis
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      // Pitch rotation around X axis
      const y2 = y * cp - z1 * sp;
      const z2 = y * sp + z1 * cp;

      const zCam = cam.dist + z2;
      if (zCam < 0.25) return null;

      const focal = Math.min(width, height) * 1.16;
      const scale = focal / zCam;
      const cxBias = mode === 'terrain' ? width * 0.455 : width * 0.5;
      const cyBias = mode === 'terrain' ? height * 0.57 : mode === 'orbital' ? height * 0.545 : height * 0.53;
      return {
        sx: cxBias + x1 * scale,
        sy: cyBias - y2 * scale,
        scale,
        depth: zCam
      };
    }

    function drawSegment3D(p1, p2, strokeStyle, lineWidth = 1, dash = null) {
      const a = project3D(p1[0], p1[1], p1[2]);
      const b = project3D(p2[0], p2[1], p2[2]);
      if (!a || !b) return;
      ctx.save();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
      ctx.restore();
    }

    function drawText3D(pos, text, color, font = '500 10px "JetBrains Mono", monospace', align = 'center') {
      const p = project3D(pos[0], pos[1], pos[2]);
      if (!p) return;
      ctx.save();
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';
      ctx.fillText(text, p.sx, p.sy);
      ctx.restore();
    }

    /* ----------------------------------------------------------------------
       Mode-Specific 3D Stage Geometry Renderers
       ---------------------------------------------------------------------- */
    function drawTerrainStage(pal, activeU) {
      const baseY = -0.34;

      // 1. Perspective Ground Frame & Year Gridlines
      const yearTicks = [1992, 2015, 2017, 2019, 2021, 2023, 2025, 2026.9];
      yearTicks.forEach(yr => {
        const u = yearToU(yr);
        const x = -1.72 + u * 3.44;
        const isCurrent = yr <= activeYear;
        drawSegment3D(
          [x, baseY, -1.42],
          [x, baseY, 1.42],
          isCurrent ? pal.gridStrong : pal.grid,
          yr === 2015 || yr === 2026.9 ? 1.1 : 0.75
        );
        const label = yr >= 2026.5 ? '2026' : String(Math.floor(yr));
        drawText3D(
          [x, baseY - 0.04, 1.56],
          label,
          isCurrent ? pal.secondary : pal.muted,
          '500 10px "JetBrains Mono", monospace',
          'center'
        );
      });

      // Outer X rails
      drawSegment3D([-1.72, baseY, -1.42], [1.72, baseY, -1.42], pal.gridStrong, 1);
      drawSegment3D([-1.72, baseY, 1.42], [1.72, baseY, 1.42], pal.gridStrong, 1);

      // Elevation reference axis on far-left corner (1992 origin)
      drawSegment3D([-1.72, baseY, -1.42], [-1.72, baseY + 1.05, -1.42], pal.gridStrong, 1);
      drawText3D([-1.84, baseY + 1.02, -1.42], 'MOMENTUM ↑', pal.muted, '500 9.5px "JetBrains Mono", monospace', 'right');

      // 2. Depth-Sorted 3D Shaded Domain Ridgeline Ribbons (12 domains × TIME_STEPS)
      const quads = [];
      const halfRib = 0.068;

      for (let d = 0; d < DOMAINS.length; d++) {
        const dom = DOMAINS[d];
        const zCenter = -1.36 + (d / Math.max(1, DOMAINS.length - 1)) * 2.72;
        const row = terrainGrid[d];
        if (!row) continue;

        const isFocused = activeDomainFilter === 'all' || activeDomainFilter === dom.id;
        const baseAlpha = isFocused ? (pal.light ? 0.30 : 0.34) : 0.055;

        // Compact domain lane label at leading 2026 edge
        const labelX = 1.84;
        drawText3D(
          [labelX, baseY + 0.02, zCenter],
          DOMAIN_SHORT_3D[dom.id] || dom.shortTitle,
          isFocused ? domainColor(dom.id, pal.light ? 0.92 : 0.88, pal.light ? -4 : 8) : pal.muted,
          isFocused ? '600 9.5px "JetBrains Mono", monospace' : '400 8.5px "JetBrains Mono", monospace',
          'left'
        );

        for (let s = 0; s < TIME_STEPS - 1; s++) {
          const u0 = s / (TIME_STEPS - 1);
          const u1 = (s + 1) / (TIME_STEPS - 1);
          const x0 = -1.72 + u0 * 3.44;
          const x1 = -1.72 + u1 * 3.44;
          const h0 = row[s] * 0.96;
          const h1 = row[s + 1] * 0.96;
          const future = u0 > activeU + 0.015;

          // Skip zero-height ribbon patches in future for clean geometry
          const avgH = (h0 + h1) * 0.5;
          const pA = project3D(x0, baseY + h0, zCenter);
          const pB = project3D(x1, baseY + h1, zCenter);
          const pC = project3D(x1, baseY, zCenter);
          const pD = project3D(x0, baseY, zCenter);
          if (!pA || !pB || !pC || !pD) continue;

          // Subtle directional shading based on slope (dH/dU) and elevation
          const slope = (h1 - h0) * 6.5;
          const shadeBoost = clamp(slope * 12 + avgH * 14, -12, 22);
          const depth = (pA.depth + pB.depth + pC.depth + pD.depth) * 0.25;

          quads.push({
            depth,
            pts: [pA, pB, pC, pD],
            domId: dom.id,
            fillAlpha: future ? baseAlpha * 0.16 : baseAlpha * (0.45 + avgH * 0.72),
            strokeAlpha: future ? (isFocused ? 0.16 : 0.05) : isFocused ? 0.62 + avgH * 0.34 : 0.14,
            shadeBoost,
            crest: [pA, pB],
            bandZ: [
              project3D(x0, baseY + h0, zCenter - halfRib),
              project3D(x1, baseY + h1, zCenter - halfRib),
              project3D(x1, baseY + h1, zCenter + halfRib),
              project3D(x0, baseY + h0, zCenter + halfRib)
            ],
            future
          });
        }
      }

      // Painter's algorithm sort: back-to-front by camera depth
      quads.sort((a, b) => b.depth - a.depth);
      quads.forEach(q => {
        // Vertical translucent ridgeline curtain
        ctx.beginPath();
        ctx.moveTo(q.pts[0].sx, q.pts[0].sy);
        ctx.lineTo(q.pts[1].sx, q.pts[1].sy);
        ctx.lineTo(q.pts[2].sx, q.pts[2].sy);
        ctx.lineTo(q.pts[3].sx, q.pts[3].sy);
        ctx.closePath();
        ctx.fillStyle = domainColor(q.domId, q.fillAlpha, q.shadeBoost);
        ctx.fill();

        // Top 3D ribbon bevel cap for unmistakable volumetric thickness
        if (!q.future && q.bandZ[0] && q.bandZ[1] && q.bandZ[2] && q.bandZ[3]) {
          ctx.beginPath();
          ctx.moveTo(q.bandZ[0].sx, q.bandZ[0].sy);
          ctx.lineTo(q.bandZ[1].sx, q.bandZ[1].sy);
          ctx.lineTo(q.bandZ[2].sx, q.bandZ[2].sy);
          ctx.lineTo(q.bandZ[3].sx, q.bandZ[3].sy);
          ctx.closePath();
          ctx.fillStyle = domainColor(q.domId, q.fillAlpha * 0.88, q.shadeBoost + 10);
          ctx.fill();
        }

        // Crisp illuminated crest contour line
        ctx.beginPath();
        ctx.moveTo(q.crest[0].sx, q.crest[0].sy);
        ctx.lineTo(q.crest[1].sx, q.crest[1].sy);
        ctx.strokeStyle = domainColor(q.domId, q.strokeAlpha, q.shadeBoost + 14);
        ctx.lineWidth = q.future ? 0.8 : 1.35;
        ctx.stroke();
      });

      // 3. Translucent 3D Active Time-Slice Plane at activeYear
      const sliceX = -1.72 + activeU * 3.44;
      const sliceTop = baseY + 0.98;
      const sA = project3D(sliceX, baseY, -1.42);
      const sB = project3D(sliceX, baseY, 1.42);
      const sC = project3D(sliceX, sliceTop, 1.42);
      const sD = project3D(sliceX, sliceTop, -1.42);
      if (sA && sB && sC && sD) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sA.sx, sA.sy);
        ctx.lineTo(sB.sx, sB.sy);
        ctx.lineTo(sC.sx, sC.sy);
        ctx.lineTo(sD.sx, sD.sy);
        ctx.closePath();
        ctx.fillStyle = pal.sliceFill;
        ctx.fill();
        ctx.strokeStyle = pal.sliceStroke;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();

        // Highlight live cross-sectional ridge profile on the time-slice plane
        const sIdx = activeU * (TIME_STEPS - 1);
        const i0 = Math.floor(sIdx);
        const i1 = Math.min(TIME_STEPS - 1, i0 + 1);
        const frac = sIdx - i0;
        ctx.save();
        ctx.beginPath();
        let started = false;
        for (let d = 0; d < DOMAINS.length; d++) {
          const z = -1.36 + (d / Math.max(1, DOMAINS.length - 1)) * 2.72;
          const h = lerp(terrainGrid[d][i0], terrainGrid[d][i1], frac) * 0.96;
          const p = project3D(sliceX, baseY + h, z);
          if (!p) continue;
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.restore();

        drawText3D(
          [sliceX, sliceTop + 0.04, -1.42],
          `EPOCH ${activeYear >= 2026.85 ? '2026 LIVE' : activeYear.toFixed(1)}`,
          pal.accent,
          '600 9.5px "JetBrains Mono", monospace',
          'center'
        );
      }
    }

    function drawCapabilityStage(pal) {
      const bx = 1.32;
      const by0 = -0.88;
      const by1 = 1.04;
      const bz = 1.28;

      // Translucent 3D Capability Wireframe Bounding Box
      const corners = [
        [-bx, by0, -bz],
        [bx, by0, -bz],
        [bx, by0, bz],
        [-bx, by0, bz],
        [-bx, by1, -bz],
        [bx, by1, -bz],
        [bx, by1, bz],
        [-bx, by1, bz]
      ];
      const boxEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      boxEdges.forEach(([i, j]) => drawSegment3D(corners[i], corners[j], pal.gridStrong, 0.9));

      // Subtle mid-planes (x=0, z=0) on floor
      drawSegment3D([0, by0, -bz], [0, by0, bz], pal.grid, 0.8, [3, 4]);
      drawSegment3D([-bx, by0, 0], [bx, by0, 0], pal.grid, 0.8, [3, 4]);

      // Axis endpoint semantic annotations
      drawText3D([-bx, by0 - 0.10, 0], '← MODEL-FREE', pal.secondary, '600 9.5px "JetBrains Mono", monospace', 'center');
      drawText3D([bx, by0 - 0.10, 0], 'WORLD / PRIORS →', pal.accent, '600 9.5px "JetBrains Mono", monospace', 'center');
      drawText3D([0, by0 - 0.10, -bz - 0.08], 'ONLINE SIM', pal.secondary, '600 9.5px "JetBrains Mono", monospace', 'center');
      drawText3D([0, by0 - 0.10, bz + 0.08], 'OFFLINE / VERIFIABLE', pal.signal, '600 9.5px "JetBrains Mono", monospace', 'center');
      drawText3D([-bx - 0.08, by0 + 0.06, -bz], 'STEP CONTROL', pal.muted, '500 9px "JetBrains Mono", monospace', 'right');
      drawText3D([-bx - 0.08, by1 - 0.04, -bz], 'REASONING & VLA ↑', pal.accent, '600 9.5px "JetBrains Mono", monospace', 'right');

      // 3D Historical Research Center-of-Mass Trajectory Spline (1995 -> activeYear)
      const visibleSpine = centroidSpline.filter(pt => pt.year <= activeYear + 0.4);
      if (visibleSpine.length >= 2) {
        ctx.save();
        ctx.beginPath();
        let started = false;
        visibleSpine.forEach(pt => {
          const p = project3D(pt.x, pt.y, pt.z);
          if (!p) return;
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        });
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.restore();

        visibleSpine.forEach((pt, idx) => {
          const p = project3D(pt.x, pt.y, pt.z);
          if (!p) return;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, idx === visibleSpine.length - 1 ? 5.2 : 3.2, 0, Math.PI * 2);
          ctx.fillStyle = idx === visibleSpine.length - 1 ? pal.signal : pal.accent;
          ctx.fill();
          if (idx === 0 || idx === visibleSpine.length - 1 || pt.year === 2018.8 || pt.year === 2022.5) {
            drawText3D(
              [pt.x, pt.y + 0.11, pt.z],
              `μ(${Math.floor(pt.year)})`,
              idx === visibleSpine.length - 1 ? pal.signal : pal.accent,
              '600 9.5px "JetBrains Mono", monospace',
              'center'
            );
          }
        });
      }
    }

    function drawOrbitalStage(pal) {
      // Concentric chronological orbital rings at key eras
      const rings = [
        { yr: 2015, label: '2015' },
        { yr: 2019, label: '2019' },
        { yr: 2023, label: '2023' },
        { yr: 2026.9, label: '2026' }
      ];
      rings.forEach(rInfo => {
        const u = yearToU(rInfo.yr);
        const radius = 0.24 + Math.pow(u, 0.88) * 1.44;
        const elev = -0.58 + u * 1.18;
        const isPast = rInfo.yr <= activeYear + 0.2;
        const segs = 56;
        ctx.save();
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const p = project3D(Math.cos(a) * radius, elev, Math.sin(a) * radius);
          if (!p) continue;
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.strokeStyle = isPast ? pal.gridStrong : pal.grid;
        ctx.lineWidth = rInfo.yr >= 2026 ? 1.25 : 0.85;
        ctx.stroke();
        ctx.restore();

        drawText3D(
          [radius + 0.12, elev, 0],
          rInfo.label,
          isPast ? pal.secondary : pal.muted,
          '500 9.5px "JetBrains Mono", monospace',
          'left'
        );
      });

      // Radial domain meridians & perimeter labels
      DOMAINS.forEach((dom, d) => {
        const a = (d / Math.max(1, DOMAINS.length)) * Math.PI * 2;
        const isFocused = activeDomainFilter === 'all' || activeDomainFilter === dom.id;
        drawSegment3D(
          [Math.cos(a) * 0.24, -0.58, Math.sin(a) * 0.24],
          [Math.cos(a) * 1.68, 0.60, Math.sin(a) * 1.68],
          isFocused ? domainColor(dom.id, 0.26) : pal.grid,
          isFocused ? 1.0 : 0.65
        );
        drawText3D(
          [Math.cos(a) * 1.9, 0.64, Math.sin(a) * 1.9],
          DOMAIN_SHORT_3D[dom.id] || dom.shortTitle,
          isFocused ? domainColor(dom.id, 0.92, pal.light ? -4 : 8) : pal.muted,
          '600 9px "JetBrains Mono", monospace',
          'center'
        );
      });
    }

    /* ----------------------------------------------------------------------
       Directed 3D Causal Lineage Flows & Nodes
       ---------------------------------------------------------------------- */
    function drawLineageFlows(pal, focusNode, lineageSet) {
      edges.forEach(edge => {
        const { from, to, kind, seed } = edge;
        if (from.year > activeYear || to.year > activeYear) return;

        const inFocus =
          focusNode
            ? lineageSet.has(from.id) && lineageSet.has(to.id)
            : activeDomainFilter === 'all' ||
              from.domain === activeDomainFilter ||
              to.domain === activeDomainFilter;

        const p0 = project3D(from.cx, from.cy, from.cz);
        const p2 = project3D(to.cx, to.cy, to.cz);
        if (!p0 || !p2) return;

        // Arch control point elevated in 3D space (higher arch for cross-domain transfers)
        const mx = (from.cx + to.cx) * 0.5;
        const mz = (from.cz + to.cz) * 0.5;
        const dist3 = Math.hypot(to.cx - from.cx, to.cy - from.cy, to.cz - from.cz);
        const archLift = (kind === 'transfer' ? 0.24 : 0.11) + dist3 * 0.08;
        const my = Math.max(from.cy, to.cy) + archLift;
        const p1 = project3D(mx, my, mz);
        if (!p1) return;

        const alpha = focusNode
          ? inFocus
            ? 0.88
            : 0.045
          : inFocus
            ? kind === 'transfer'
              ? pal.light
                ? 0.52
                : 0.58
              : pal.light
                ? 0.28
                : 0.32
            : 0.05;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.quadraticCurveTo(p1.sx, p1.sy, p2.sx, p2.sy);
        ctx.strokeStyle =
          kind === 'transfer'
            ? domainColor(to.domain, alpha, pal.light ? -4 : 10)
            : domainColor(from.domain, alpha, pal.light ? -4 : 4);
        ctx.lineWidth = focusNode && inFocus ? 2.1 : kind === 'transfer' ? 1.35 : 0.95;
        if (kind === 'transfer' && !(focusNode && inFocus)) {
          ctx.setLineDash([4, 3]);
        }
        ctx.stroke();
        ctx.restore();

        // Animated momentum pulse traveling along visible active transfer curves
        if (!reduced.matches && inFocus && (kind === 'transfer' || (focusNode && inFocus))) {
          const t = (animTime * 0.28 + seed) % 1;
          const omt = 1 - t;
          const px = omt * omt * from.cx + 2 * omt * t * mx + t * t * to.cx;
          const py = omt * omt * from.cy + 2 * omt * t * my + t * t * to.cy;
          const pz = omt * omt * from.cz + 2 * omt * t * mz + t * t * to.cz;
          const pp = project3D(px, py, pz);
          if (pp) {
            ctx.beginPath();
            ctx.arc(pp.sx, pp.sy, focusNode ? 2.8 : 2.1, 0, Math.PI * 2);
            ctx.fillStyle = domainColor(to.domain, 0.95, 18);
            ctx.fill();
          }
        }
      });
    }

    function drawNodes3D(pal, focusNode, lineageSet) {
      const renderList = [];
      let visibleTotal = 0;

      nodes.forEach(n => {
        if (n.year > activeYear) return;
        visibleTotal++;
        const proj = project3D(n.cx, n.cy, n.cz);
        if (!proj) return;
        const baseProj =
          mode === 'terrain' ? project3D(n.cx, n.terrainBaseY, n.cz) : null;

        renderList.push({ node: n, proj, baseProj });
      });

      if (visibleCountEl) {
        visibleCountEl.textContent = `${visibleTotal} PAPERS ACTIVE`;
      }

      // Depth-sort back to front
      renderList.sort((a, b) => b.proj.depth - a.proj.depth);
      projectedHitList = [];

      renderList.forEach(({ node, proj, baseProj }) => {
        const isPrimaryFocus = focusNode && focusNode.id === node.id;
        const inLineage = focusNode && lineageSet.has(node.id);
        const matchesDomain = activeDomainFilter === 'all' || node.domain === activeDomainFilter;

        let alpha = 1;
        if (focusNode) {
          alpha = isPrimaryFocus ? 1 : inLineage ? 0.96 : 0.14;
        } else if (!matchesDomain) {
          alpha = 0.13;
        } else if (!node.isLandmark && !node.live) {
          alpha = pal.light ? 0.48 : 0.50;
        }

        // Perspective-scaled radius
        const baseR = node.isLandmark
          ? 2.7 + node.tier * 1.1
          : node.live
            ? 3.1
            : 1.95;
        const r = clamp((baseR * proj.scale) / 145, 1.5, 9.8) * (isPrimaryFocus ? 1.38 : 1);

        // Drop-line stem to terrain surface for landmarks & focused nodes
        if (
          mode === 'terrain' &&
          baseProj &&
          alpha > 0.3 &&
          (node.isLandmark || node.live || isPrimaryFocus || inLineage)
        ) {
          ctx.beginPath();
          ctx.moveTo(baseProj.sx, baseProj.sy);
          ctx.lineTo(proj.sx, proj.sy);
          ctx.strokeStyle = domainColor(node.domain, alpha * 0.36);
          ctx.lineWidth = isPrimaryFocus ? 1.4 : 0.85;
          ctx.stroke();
        }

        // Subtle pulse ring for live 2026 streaming preprints & focused node
        if ((node.live && alpha > 0.45 && !reduced.matches) || isPrimaryFocus) {
          const pulse = isPrimaryFocus ? 1 : 0.5 + 0.5 * Math.sin(animTime * 3.2 + hashString(node.id) * 6.28);
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, r + (isPrimaryFocus ? 5.5 : 2.2 + pulse * 3.2), 0, Math.PI * 2);
          ctx.strokeStyle = isPrimaryFocus
            ? pal.accent
            : node.live
              ? `hsla(27, 90%, 58%, ${(0.55 - pulse * 0.35) * alpha})`
              : domainColor(node.domain, 0.5);
          ctx.lineWidth = isPrimaryFocus ? 1.7 : 1.1;
          ctx.stroke();
        }

        // 3D Lit Sphere Approximation (Radial highlight offset toward top-left key light)
        const fillCol = node.live
          ? `hsla(27, 92%, ${pal.light ? 48 : 60}%, ${alpha})`
          : domainColor(node.domain, alpha, node.isLandmark ? 6 : -2);

        if (r >= 2.6 && alpha > 0.25) {
          const grad = ctx.createRadialGradient(
            proj.sx - r * 0.32,
            proj.sy - r * 0.34,
            r * 0.12,
            proj.sx,
            proj.sy,
            r
          );
          grad.addColorStop(0, pal.light ? `rgba(255,255,255,${alpha * 0.9})` : `rgba(245,252,255,${alpha * 0.85})`);
          grad.addColorStop(0.45, fillCol);
          grad.addColorStop(1, domainColor(node.domain, alpha, -18));
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = fillCol;
        }

        ctx.beginPath();
        ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
        ctx.fill();

        if (node.genesis && alpha > 0.3) {
          ctx.strokeStyle = pal.ink;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Register clickable hit-test target (front-most wins when iterated in reverse)
        if (alpha > 0.18 || node.isLandmark) {
          projectedHitList.push({
            node,
            sx: proj.sx,
            sy: proj.sy,
            r: Math.max(r + 6, 11)
          });
        }
      });

      // Draw crisp foreground labels (only for tier-3 landmarks, active lineage, or focused domain landmarks)
      const placedBoxes = [];
      const candidates = renderList
        .filter(({ node }) => {
          if (focusNode) return focusNode.id === node.id || lineageSet.has(node.id);
          if (activeDomainFilter !== 'all') {
            return node.domain === activeDomainFilter && (node.isLandmark || node.live);
          }
          return node.isLandmark && (node.tier >= 3 || (node.year >= 2026 && node.tier >= 2));
        })
        .sort((a, b) => {
          const ap = focusNode && a.node.id === focusNode.id ? 10 : a.node.tier;
          const bp = focusNode && b.node.id === focusNode.id ? 10 : b.node.tier;
          if (bp !== ap) return bp - ap;
          return a.proj.depth - b.proj.depth;
        });

      ctx.save();
      ctx.font = '600 10.5px "JetBrains Mono", monospace';
      ctx.textBaseline = 'middle';
      candidates.forEach(({ node, proj }) => {
        const isMain = focusNode && focusNode.id === node.id;
        const txt = node.label;
        const tw = ctx.measureText(txt).width + 10;
        const th = 18;
        const lx = proj.sx + 9;
        const ly = proj.sy - 11;

        // Keep labels inside viewport and avoid collisions unless primary focused node
        if (lx < 8 || lx + tw > width - 8 || ly - th * 0.5 < 8 || ly + th * 0.5 > height - 8) return;
        const box = { x1: lx - 2, y1: ly - th * 0.5 - 1, x2: lx + tw + 2, y2: ly + th * 0.5 + 1 };
        const overlaps = placedBoxes.some(
          b => !(box.x2 < b.x1 || box.x1 > b.x2 || box.y2 < b.y1 || box.y1 > b.y2)
        );
        if (overlaps && !isMain) return;
        placedBoxes.push(box);

        ctx.fillStyle = pal.labelBg;
        ctx.strokeStyle = isMain ? pal.accent : pal.labelBorder;
        ctx.lineWidth = isMain ? 1.25 : 0.85;
        ctx.beginPath();
        ctx.roundRect(lx, ly - th * 0.5, tw, th, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isMain ? pal.accent : pal.ink;
        ctx.textAlign = 'left';
        ctx.fillText(txt, lx + 5, ly + 0.5);
      });
      ctx.restore();
    }

    /* ----------------------------------------------------------------------
       Main Render & Physics Loop
       ---------------------------------------------------------------------- */
    function renderFrame(ts) {
      if (!lastFrameTs) lastFrameTs = ts;
      const dt = Math.min(0.05, (ts - lastFrameTs) / 1000);
      lastFrameTs = ts;
      animTime += dt;

      // 1. Temporal Playback Sweep
      if (playingTimeline) {
        activeYear += dt * 3.4;
        if (activeYear >= 2026.95) {
          activeYear = 2026.95;
          setPlaying(false);
        }
        syncYearControls();
      }

      // 2. Smooth Inertial Camera Damping & Gentle Auto-Orbit
      if (!dragging) {
        if (autoOrbit && !hoveredNode) {
          cam.targetYaw += dt * 0.11;
        }
        cam.targetYaw += cam.velYaw;
        cam.targetPitch = clamp(cam.targetPitch + cam.velPitch, 0.12, 1.44);
        cam.velYaw *= Math.pow(0.04, dt);
        cam.velPitch *= Math.pow(0.04, dt);
      }

      const kCam = 1 - Math.exp(-9.5 * dt);
      cam.yaw = lerp(cam.yaw, cam.targetYaw, kCam);
      cam.pitch = lerp(cam.pitch, cam.targetPitch, kCam);
      cam.dist = lerp(cam.dist, cam.targetDist, kCam);

      // 3. Smooth 3D Morphing Between Lenses (Terrain <-> Capability <-> Orbital)
      const kMorph = reduced.matches ? 1 : 1 - Math.exp(-7.5 * dt);
      nodes.forEach(n => {
        const tgt = getTargetPosForMode(n, mode);
        n.cx = lerp(n.cx, tgt[0], kMorph);
        n.cy = lerp(n.cy, tgt[1], kMorph);
        n.cz = lerp(n.cz, tgt[2], kMorph);
      });

      // 4. Clear Canvas with Subtle Radial Depth Gradient
      const pal = themePalette();
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.44,
        20,
        width * 0.5,
        height * 0.52,
        Math.max(width, height) * 0.72
      );
      bgGrad.addColorStop(0, pal.bgTop);
      bgGrad.addColorStop(1, pal.bgBottom);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 5. Render Active 3D Stage Geometry + Causal Flows + Paper Nodes
      const activeU = yearToU(activeYear);
      if (mode === 'terrain') drawTerrainStage(pal, activeU);
      else if (mode === 'capability') drawCapabilityStage(pal);
      else drawOrbitalStage(pal);

      const focusNode = hoveredNode || pinnedNode;
      const lineageSet = focusNode ? getLineageSet(focusNode) : null;

      drawLineageFlows(pal, focusNode, lineageSet);
      drawNodes3D(pal, focusNode, lineageSet);

      if (isVisible) {
        rafId = requestAnimationFrame(renderFrame);
      } else {
        rafId = 0;
      }
    }

    function ensureLoop() {
      if (!rafId && isVisible) {
        lastFrameTs = 0;
        rafId = requestAnimationFrame(renderFrame);
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(performance.now());
    }

    /* ----------------------------------------------------------------------
       Side Telemetry Inspector & Interactive Controls
       ---------------------------------------------------------------------- */
    function buildDomainFilterBar() {
      if (!domainBarEl) return;
      domainBarEl.innerHTML = '';

      const allBtn = document.createElement('button');
      allBtn.type = 'button';
      allBtn.className = 'd3d-dom-chip';
      allBtn.dataset.dom = 'all';
      allBtn.setAttribute('aria-pressed', String(activeDomainFilter === 'all'));
      allBtn.textContent = 'All 12 Domains';
      allBtn.addEventListener('click', () => setDomainFilter('all'));
      domainBarEl.append(allBtn);

      DOMAINS.forEach(dom => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'd3d-dom-chip';
        btn.dataset.dom = dom.id;
        btn.setAttribute('aria-pressed', String(activeDomainFilter === dom.id));

        const dot = document.createElement('span');
        dot.className = 'd3d-dom-swatch';
        dot.style.background = domainColor(dom.id, 0.95);

        const lbl = document.createElement('span');
        lbl.textContent = dom.shortTitle;

        btn.append(dot, lbl);
        btn.addEventListener('click', () => setDomainFilter(activeDomainFilter === dom.id ? 'all' : dom.id));
        domainBarEl.append(btn);
      });
    }

    function setDomainFilter(domId) {
      activeDomainFilter = domId;
      if (domainBarEl) {
        [...domainBarEl.querySelectorAll('.d3d-dom-chip')].forEach(b => {
          b.setAttribute('aria-pressed', String(b.dataset.dom === activeDomainFilter));
        });
      }
      if (pinnedNode && domId !== 'all' && pinnedNode.domain !== domId) {
        pinnedNode = null;
      }
      updateInspector(true);
    }

    function updateInspector(force = false) {
      if (!inspectorEl) return;
      const focusNode = pinnedNode || hoveredNode;
      const key = focusNode
        ? `node:${focusNode.id}:${pinnedNode ? 'pin' : 'hov'}`
        : `epoch:${Math.floor(activeYear * 2)}:${activeDomainFilter}:${nodes.length}`;
      if (!force && key === lastInspectorKey) return;
      lastInspectorKey = key;

      inspectorEl.innerHTML = '';

      if (focusNode) {
        const domObj = LS.DOMAIN_MAP.get(focusNode.domain);
        const head = document.createElement('div');
        head.className = 'd3d-insp-head';

        const badge = document.createElement('span');
        badge.className = 'd3d-insp-badge';
        badge.textContent = domObj ? domObj.shortTitle : focusNode.domain;
        badge.style.color = domainColor(focusNode.domain, 1, 6);

        const yearTag = document.createElement('span');
        yearTag.className = 'd3d-insp-year';
        yearTag.textContent = focusNode.live
          ? `LIVE · ${focusNode.venue}`
          : focusNode.venue || String(Math.floor(focusNode.year));

        head.append(badge, yearTag);

        const title = document.createElement('h3');
        title.className = 'd3d-insp-title';
        title.textContent = focusNode.title;

        const desc = document.createElement('p');
        desc.className = 'd3d-insp-desc';
        desc.textContent = (focusNode.description || 'Research paper indexed in the Deep RL Atlas.').replace(/\$/g, '');

        inspectorEl.append(head, title, desc);

        // Capability profile readout bars
        const capWrap = document.createElement('div');
        capWrap.className = 'd3d-cap-bars';
        const capMetrics = [
          ['Prior / World Model', (focusNode.cap[0] + 1) * 50],
          ['Horizon / Abstraction', (focusNode.cap[1] + 1) * 50],
          ['Offline / Verifiable', (focusNode.cap[2] + 1) * 50]
        ];
        capMetrics.forEach(([label, pct]) => {
          const row = document.createElement('div');
          row.className = 'd3d-bar-row';
          const lbl = document.createElement('span');
          lbl.textContent = label;
          const track = document.createElement('div');
          track.className = 'd3d-bar-track';
          const fill = document.createElement('div');
          fill.className = 'd3d-bar-fill';
          fill.style.width = `${Math.round(clamp(pct, 6, 100))}%`;
          fill.style.background = domainColor(focusNode.domain, 0.92);
          track.append(fill);
          row.append(lbl, track);
          capWrap.append(row);
        });
        inspectorEl.append(capWrap);

        // Upstream & Downstream Lineage Chips
        const ups = adjUp.get(focusNode.id) || [];
        const downs = adjDown.get(focusNode.id) || [];
        if (ups.length || downs.length) {
          const linBox = document.createElement('div');
          linBox.className = 'd3d-lineage-box';

          if (ups.length) {
            const uLabel = document.createElement('span');
            uLabel.className = 'd3d-sublabel';
            uLabel.textContent = 'BUILT UPON';
            const uRow = document.createElement('div');
            uRow.className = 'd3d-chip-row';
            ups.forEach(uNode => {
              const b = document.createElement('button');
              b.type = 'button';
              b.className = 'd3d-lin-chip';
              b.textContent = `← ${uNode.label}`;
              b.addEventListener('click', () => focusNodeById(uNode.id));
              uRow.append(b);
            });
            linBox.append(uLabel, uRow);
          }

          if (downs.length) {
            const dLabel = document.createElement('span');
            dLabel.className = 'd3d-sublabel';
            dLabel.textContent = 'INFLUENCED';
            const dRow = document.createElement('div');
            dRow.className = 'd3d-chip-row';
            downs.forEach(dNode => {
              const b = document.createElement('button');
              b.type = 'button';
              b.className = 'd3d-lin-chip';
              b.textContent = `${dNode.label} →`;
              b.addEventListener('click', () => focusNodeById(dNode.id));
              dRow.append(b);
            });
            linBox.append(dLabel, dRow);
          }
          inspectorEl.append(linBox);
        }

        // Action Buttons (Read Full Note + Filter Domain + Unpin)
        const actions = document.createElement('div');
        actions.className = 'd3d-insp-actions';

        const openTarget =
          focusNode.catalogItem ||
          (focusNode.fallbackNoteId
            ? catalogRef.find(c => c.id === focusNode.fallbackNoteId)
            : null);

        if (openTarget && onOpenNote) {
          const readBtn = document.createElement('button');
          readBtn.type = 'button';
          readBtn.className = 'primary d3d-action-primary';
          readBtn.textContent = focusNode.genesis
            ? `Read ${openTarget.id} synthesis ↗`
            : 'Read full note ↗';
          readBtn.addEventListener('click', () => onOpenNote(openTarget));
          actions.append(readBtn);
        }

        if (onFilterDomain) {
          const domBtn = document.createElement('button');
          domBtn.type = 'button';
          domBtn.className = 'text-button d3d-action-sec';
          domBtn.textContent = 'Filter domain ↓';
          domBtn.addEventListener('click', () => onFilterDomain(focusNode.domain));
          actions.append(domBtn);
        }

        if (pinnedNode) {
          const clearBtn = document.createElement('button');
          clearBtn.type = 'button';
          clearBtn.className = 'd3d-unpin-btn';
          clearBtn.textContent = '✕ Clear selection';
          clearBtn.addEventListener('click', () => {
            pinnedNode = null;
            updateInspector(true);
          });
          actions.append(clearBtn);
        }

        inspectorEl.append(actions);
        return;
      }

      // Default Epoch Dynamics Telemetry View (when no paper is pinned/hovered)
      const epoch = getEpochNarrative(activeYear);
      const head = document.createElement('div');
      head.className = 'd3d-insp-head';
      const eBadge = document.createElement('span');
      eBadge.className = 'd3d-insp-badge';
      eBadge.textContent = `EPOCH // ${epoch.range}`;
      const eState = document.createElement('span');
      eState.className = 'd3d-insp-year';
      eState.textContent = activeDomainFilter === 'all' ? 'ALL 12 DOMAINS' : activeDomainFilter.toUpperCase();
      head.append(eBadge, eState);

      const title = document.createElement('h3');
      title.className = 'd3d-insp-title';
      title.textContent = epoch.title;

      const desc = document.createElement('p');
      desc.className = 'd3d-insp-desc';
      desc.textContent = epoch.summary;

      const shiftBox = document.createElement('div');
      shiftBox.className = 'd3d-shift-box';
      const shiftLbl = document.createElement('span');
      shiftLbl.className = 'd3d-sublabel';
      shiftLbl.textContent = 'PARADIGM TRANSITION';
      const shiftVal = document.createElement('strong');
      shiftVal.textContent = epoch.shift;
      shiftBox.append(shiftLbl, shiftVal);

      // Dynamic Domain Momentum Bars computed at current scrubbed year!
      const u = yearToU(activeYear);
      const sPos = clamp(u, 0, 1) * (TIME_STEPS - 1);
      const i0 = Math.floor(sPos);
      const i1 = Math.min(TIME_STEPS - 1, i0 + 1);
      const frac = sPos - i0;

      const ranked = DOMAINS.map((dom, idx) => {
        const row = terrainGrid[idx];
        const intensity = row ? lerp(row[i0], row[i1], frac) : 0;
        const countUpTo = nodes.filter(n => n.domain === dom.id && n.year <= activeYear).length;
        return { dom, intensity, countUpTo };
      })
        .sort((a, b) => b.intensity - a.intensity || b.countUpTo - a.countUpTo)
        .slice(0, 5);

      const momBox = document.createElement('div');
      momBox.className = 'd3d-cap-bars';
      const momLabel = document.createElement('span');
      momLabel.className = 'd3d-sublabel';
      momLabel.textContent = `DOMINANT RESEARCH MOMENTUM AT ${Math.floor(activeYear)}`;
      momBox.append(momLabel);

      ranked.forEach(({ dom, intensity, countUpTo }) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'd3d-bar-row d3d-bar-btn';
        const lbl = document.createElement('span');
        lbl.textContent = `${dom.shortTitle.replace(/^\d+\s*·\s*/, '')} (${countUpTo})`;
        const track = document.createElement('div');
        track.className = 'd3d-bar-track';
        const fill = document.createElement('div');
        fill.className = 'd3d-bar-fill';
        fill.style.width = `${Math.max(8, Math.round(intensity * 100))}%`;
        fill.style.background = domainColor(dom.id, 0.92);
        track.append(fill);
        row.append(lbl, track);
        row.addEventListener('click', () => setDomainFilter(dom.id));
        momBox.append(row);
      });

      const hint = document.createElement('p');
      hint.className = 'd3d-insp-hint';
      hint.textContent = 'Hover or click any 3D node to trace its upstream derivations and downstream cross-domain influence.';

      inspectorEl.append(head, title, desc, shiftBox, momBox, hint);
    }

    function focusNodeById(nodeId) {
      const target = nodeById.get(nodeId);
      if (!target) return;
      if (target.year > activeYear) {
        activeYear = clamp(target.year + 0.1, 1992, 2026.95);
        syncYearControls();
      }
      pinnedNode = target;
      autoOrbit = false;
      if (orbitBtn) orbitBtn.setAttribute('aria-pressed', 'false');
      updateInspector(true);
    }

    function syncYearControls() {
      if (sliderEl) sliderEl.value = String(clamp(activeYear, 1992, 2026.95).toFixed(2));
      if (yearDisplayEl) {
        yearDisplayEl.textContent =
          activeYear >= 2026.85 ? '2026 · LIVE' : activeYear.toFixed(1);
      }
      const curEpoch = getEpochNarrative(activeYear);
      eraButtons.forEach(btn => {
        btn.setAttribute('aria-pressed', String(btn.dataset.d3dEra === curEpoch.id));
      });
      updateInspector(false);
    }

    function setMode(nextMode) {
      if (!['terrain', 'capability', 'orbital'].includes(nextMode)) return;
      mode = nextMode;
      modeButtons.forEach(btn => {
        btn.setAttribute('aria-selected', String(btn.dataset.d3dMode === mode));
      });
      if (mode === 'terrain') {
        cam.targetYaw = -0.56;
        cam.targetPitch = 0.45;
        cam.targetDist = 4.82;
        if (axisHintEl) {
          axisHintEl.textContent = 'X: Epoch (1992→2026) · Y: Research Momentum · Z: 12 Canonical Domains';
        }
      } else if (mode === 'capability') {
        cam.targetYaw = -0.78;
        cam.targetPitch = 0.36;
        cam.targetDist = 4.35;
        if (axisHintEl) {
          axisHintEl.textContent = 'X: World/Foundation Priors · Y: Reasoning/VLA Horizon · Z: Offline/Verifiable Data';
        }
      } else {
        cam.targetYaw = -0.42;
        cam.targetPitch = 0.58;
        cam.targetDist = 5.05;
        if (axisHintEl) {
          axisHintEl.textContent = 'Radius & Height: Chronological Expansion (1992→2026) · Angle: 12 Domains';
        }
      }
      if (statusBadgeEl) {
        statusBadgeEl.textContent =
          mode === 'terrain'
            ? 'SPACETIME TERRAIN'
            : mode === 'capability'
              ? 'CAPABILITY PHASE SPACE'
              : 'PARADIGM ORBITAL';
      }
    }

    function setPlaying(nextPlaying) {
      playingTimeline = Boolean(nextPlaying);
      if (playingTimeline && activeYear >= 2026.8) {
        activeYear = 1992;
      }
      if (playBtn) {
        playBtn.setAttribute('aria-pressed', String(playingTimeline));
        playBtn.textContent = playingTimeline ? 'Ⅱ Pause' : '▶ Play evolution';
      }
      syncYearControls();
    }

    /* ----------------------------------------------------------------------
       Pointer Orbit, Hit-Testing, Zoom & UI Wiring
       ---------------------------------------------------------------------- */
    function hitTest(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      let best = null;
      let bestDist = Infinity;
      for (let i = projectedHitList.length - 1; i >= 0; i--) {
        const h = projectedHitList[i];
        const d = Math.hypot(mx - h.sx, my - h.sy);
        if (d <= h.r && d < bestDist) {
          best = h.node;
          bestDist = d;
        }
      }
      return best;
    }

    canvas.addEventListener('pointerdown', ev => {
      dragging = true;
      dragMoved = false;
      lastPointer = { x: ev.clientX, y: ev.clientY };
      cam.velYaw = 0;
      cam.velPitch = 0;
      canvas.classList.add('is-dragging');
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch {}
    });

    canvas.addEventListener('pointermove', ev => {
      if (dragging) {
        const dx = ev.clientX - lastPointer.x;
        const dy = ev.clientY - lastPointer.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
        lastPointer = { x: ev.clientX, y: ev.clientY };

        cam.targetYaw += dx * 0.0068;
        cam.targetPitch = clamp(cam.targetPitch + dy * 0.0058, 0.12, 1.44);
        cam.velYaw = dx * 0.0022;
        cam.velPitch = dy * 0.0018;
        if (autoOrbit) {
          autoOrbit = false;
          if (orbitBtn) orbitBtn.setAttribute('aria-pressed', 'false');
        }
        return;
      }

      const hit = hitTest(ev.clientX, ev.clientY);
      if (hit !== hoveredNode) {
        hoveredNode = hit;
        canvas.style.cursor = hit ? 'pointer' : 'grab';
        updateInspector(false);
      }
    });

    canvas.addEventListener('pointerup', ev => {
      if (!dragging) return;
      dragging = false;
      canvas.classList.remove('is-dragging');
      try {
        canvas.releasePointerCapture(ev.pointerId);
      } catch {}
      if (!dragMoved) {
        const hit = hitTest(ev.clientX, ev.clientY);
        if (hit) {
          if (pinnedNode && pinnedNode.id === hit.id) {
            const openTarget =
              hit.catalogItem ||
              (hit.fallbackNoteId ? catalogRef.find(c => c.id === hit.fallbackNoteId) : null);
            if (openTarget && onOpenNote) onOpenNote(openTarget);
          } else {
            pinnedNode = hit;
            updateInspector(true);
          }
        } else if (pinnedNode) {
          pinnedNode = null;
          updateInspector(true);
        }
      }
    });

    canvas.addEventListener('pointerleave', () => {
      if (hoveredNode) {
        hoveredNode = null;
        updateInspector(false);
      }
    });

    // Only capture wheel zoom when holding Shift or Ctrl so page scroll is never hijacked
    canvas.addEventListener(
      'wheel',
      ev => {
        if (!ev.shiftKey && !ev.ctrlKey && !ev.metaKey) return;
        ev.preventDefault();
        cam.targetDist = clamp(cam.targetDist + ev.deltaY * 0.0028, 2.55, 6.4);
      },
      { passive: false }
    );

    canvas.addEventListener('dblclick', ev => {
      const hit = hitTest(ev.clientX, ev.clientY);
      if (hit) {
        const openTarget =
          hit.catalogItem ||
          (hit.fallbackNoteId ? catalogRef.find(c => c.id === hit.fallbackNoteId) : null);
        if (openTarget && onOpenNote) onOpenNote(openTarget);
      } else {
        setMode(mode);
      }
    });

    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => setMode(btn.dataset.d3dMode));
    });

    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const p = CAMERA_PRESETS[btn.dataset.d3dPreset];
        if (!p) return;
        cam.targetYaw = p.yaw;
        cam.targetPitch = p.pitch;
        cam.targetDist = p.dist;
        cam.velYaw = 0;
        cam.velPitch = 0;
      });
    });

    eraButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetEra = EPOCH_NARRATIVES.find(e => e.id === btn.dataset.d3dEra);
        if (!targetEra) return;
        setPlaying(false);
        activeYear = targetEra.id === 'frontier' ? 2026.95 : targetEra.maxYear;
        pinnedNode = null;
        syncYearControls();
      });
    });

    if (sliderEl) {
      sliderEl.addEventListener('input', () => {
        setPlaying(false);
        activeYear = parseFloat(sliderEl.value);
        syncYearControls();
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => setPlaying(!playingTimeline));
    }

    if (orbitBtn) {
      orbitBtn.setAttribute('aria-pressed', String(autoOrbit));
      orbitBtn.addEventListener('click', () => {
        autoOrbit = !autoOrbit;
        orbitBtn.setAttribute('aria-pressed', String(autoOrbit));
      });
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        cam.targetDist = clamp(cam.targetDist - 0.45, 2.55, 6.4);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        cam.targetDist = clamp(cam.targetDist + 0.45, 2.55, 6.4);
      });
    }

    // Pause animation loop cleanly when scrolled off-screen to preserve battery/CPU
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        entries => {
          isVisible = entries.some(e => e.isIntersecting);
          if (isVisible) ensureLoop();
        },
        { rootMargin: '140px' }
      );
      io.observe(canvas);
    }

    window.addEventListener('resize', resize);

    // Boot
    buildSceneData(options.catalog || window.RL_CATALOG || []);
    setMode('terrain');
    syncYearControls();
    resize();
    ensureLoop();

    const api = {
      updateCatalog(nextCatalog) {
        buildSceneData(nextCatalog);
      },
      setMode,
      setYear(yr) {
        activeYear = clamp(Number(yr) || 2026.95, 1992, 2026.95);
        syncYearControls();
      },
      setDomainFilter,
      focusNodeById,
      redraw() {
        buildDomainFilterBar();
        updateInspector(true);
        renderFrame(performance.now());
      },
      getState() {
        return {
          mode,
          activeYear,
          activeDomainFilter,
          nodeCount: nodes.length,
          edgeCount: edges.length,
          pinnedId: pinnedNode ? pinnedNode.id : null
        };
      }
    };

    window.RLDynamics3D = api;
    return api;
  }

  window.initRLDynamics3D = initRLDynamics3D;
})();
