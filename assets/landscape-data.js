'use strict';

/**
 * Deep RL Atlas — Complete 12-Domain Scientific Landscape & Guided Curricula (1992–2026)
 * Exposes window.RL_LANDSCAPE for taxonomy matrices, library domain filtering, and roadmaps.
 */
(() => {
  const DOMAINS = [
    {
      id: 'value-td',
      index: '01',
      shortTitle: '01 · Value & TD Control',
      title: 'Value Operators & TD Control',
      era: '1989–2026',
      formulaTex: String.raw`(\mathcal{T}^* Q)(s,a) = r(s,a) + \gamma \mathbb{E}_{s'}\!\left[\max_{a'} Q(s',a')\right]`,
      summary:
        'Bootstraps optimal action-values via Bellman contractions, target decoupling, prioritized replay, and relative pairwise differences.',
      landmarks: ['DQN', 'DDQN', 'Dueling', 'PER', 'Rainbow', 'Relative-Value-Learning']
    },
    {
      id: 'policy-trust',
      index: '02',
      shortTitle: '02 · Policy & Actor-Critic',
      title: 'Policy Gradients & Actor-Critic',
      era: '1992–2026',
      formulaTex: String.raw`\mathcal{L}^{\text{CLIP}}(\theta) = \mathbb{E}_t\!\left[\min\!\big(\rho_t(\theta)\hat{A}_t^{\text{GAE}},\, \operatorname{clip}(\rho_t, 1-\epsilon, 1+\epsilon)\hat{A}_t^{\text{GAE}}\big)\right]`,
      summary:
        'Optimizes parameterized policies directly with variance-reduced advantage estimators, KL trust regions, clipped surrogates, and twin critics.',
      landmarks: ['TRPO', 'GAE', 'A3C', 'PPO', 'TD3', 'IMPALA']
    },
    {
      id: 'dist-maxent',
      index: '03',
      shortTitle: '03 · Distributional & MaxEnt',
      title: 'Distributional & MaxEnt RL',
      era: '2017–2026',
      formulaTex: String.raw`\mathcal{T}^\pi Z(s,a) \stackrel{D}{=} R(s,a) + \gamma Z(S',A'), \quad \pi^*(a\mid s) \propto \exp\!\big(Q(s,a)/\alpha\big)`,
      summary:
        'Models full return distributions via categorical atoms or quantiles while entropy-regularized duals preserve multi-modal exploration.',
      landmarks: ['C51', 'QR-DQN', 'IQN', 'SAC', 'MPO', 'Distral']
    },
    {
      id: 'world-planning',
      index: '04',
      shortTitle: '04 · World Models & Search',
      title: 'World Models & Tree Search',
      era: '2017–2026',
      formulaTex: String.raw`z_{t+1} = h_\psi(z_t, a_t), \quad a_t = \arg\max_a \Big[Q(z_t,a) + c_{\text{puct}} P(z_t,a)\frac{\sqrt{\sum_b N(z_t,b)}}{1 + N(z_t,a)}\Big]`,
      summary:
        'Compresses sensory streams into predictive latent dynamics for imagination rollouts, MCTS lookahead, and receding-horizon MPPI.',
      landmarks: ['AlphaZero', 'World-Models', 'MuZero', 'DreamerV3', 'TD-MPC2', 'K-PWM']
    },
    {
      id: 'offline-generative',
      index: '05',
      shortTitle: '05 · Offline & Flow RL',
      title: 'Offline, Sequence & Flow RL',
      era: '2019–2026',
      formulaTex: String.raw`\min_Q \; \alpha\,\mathbb{E}_{s}\!\left[\log \sum_a \exp Q(s,a) - \mathbb{E}_{a \sim \hat{\pi}_\beta} Q(s,a)\right] + \frac{1}{2}\mathcal{L}_{\text{TD}}(Q)`,
      summary:
        'Synthesizes policies from static datasets without OOD critic exploitation via pessimistic values, expectile regression, and denoising flows.',
      landmarks: ['CQL', 'IQL', 'Decision-Transformer', 'Diffusion-Policy', 'MEND', 'bdope']
    },
    {
      id: 'exploration-intrinsic',
      index: '06',
      shortTitle: '06 · Exploration & Skills',
      title: 'Exploration & Intrinsic Skills',
      era: '2016–2026',
      formulaTex: String.raw`r_t^{\text{total}} = r_t^{\text{ext}} + \beta \, \widehat{\operatorname{Var}}_{\psi}\!\big(\hat{f}_\psi(s_t, a_t)\big)`,
      summary:
        'Replaces dithering noise with epistemic uncertainty Bellman backups, pseudo-counts, ensemble disagreement, and Hilbert skill spaces.',
      landmarks: ['NoisyNet', 'UBE', 'NDM', 'Disagreement', 'VISR', 'EDDICT']
    },
    {
      id: 'hierarchical-meta',
      index: '07',
      shortTitle: '07 · Hierarchy & Meta-RL',
      title: 'Hierarchical, Memory & Meta-RL',
      era: '2016–2026',
      formulaTex: String.raw`q_\phi(z \mid c_{1:N}) \;\longrightarrow\; \pi_\theta(a_t \mid s_t, z), \quad g_t \sim \pi_{\text{high}}(g \mid s_t)`,
      summary:
        'Decomposes long horizons through temporal options and goal relabeling while inferring latent task posteriors across few-shot episodes.',
      landmarks: ['HIRO', 'VALOR', 'LFOD', 'PEARL', 'MGRL', 'NEC']
    },
    {
      id: 'multi-agent',
      index: '08',
      shortTitle: '08 · Multi-Agent & Games',
      title: 'Multi-Agent & Game Equilibria',
      era: '2017–2026',
      formulaTex: String.raw`\frac{\partial Q_{\text{tot}}(\boldsymbol{\tau}, \mathbf{a})}{\partial Q_i(\tau_i, a_i)} \ge 0 \;\;\forall i \in \{1,\dots,n\}`,
      summary:
        'Coordinates decentralized actors via monotonic value factorization, counterfactual baselines, opponent learning awareness, and Nash solvers.',
      landmarks: ['MADDPG', 'COMA', 'QMIX', 'LOLA', 'MAPPO', 'Phi-Actor-Critic']
    },
    {
      id: 'imitation-irl-safety',
      index: '09',
      shortTitle: '09 · Imitation, IRL & Safety',
      title: 'Imitation, IRL & Safe Control',
      era: '2016–2026',
      formulaTex: String.raw`\min_{\pi}\max_{D\in(0,1)} \; \mathbb{E}_{\pi}[\log D(s,a)] + \mathbb{E}_{\pi_E}[\log(1 - D(s,a))] - \lambda \mathcal{H}(\pi)`,
      summary:
        'Recovers occupancy-matching policies and distributional reward structure from demonstrations under explicit safety constraints.',
      landmarks: ['GAIL', 'OP-GAIL', 'Viper', 'VICE', 'Distributional-IRL', 'Parallel-Safe-RL']
    },
    {
      id: 'llm-alignment-reasoning',
      index: '10',
      shortTitle: '10 · LLM Alignment & RLVR',
      title: 'LLM Alignment & Reasoning RL',
      era: '2022–2026',
      formulaTex: String.raw`\hat{A}_i = \frac{R(x, y_i) - \operatorname{mean}(\mathbf{R})}{\operatorname{std}(\mathbf{R}) + \delta}, \quad r_{\text{DPO}}(x,y) = \beta \log \frac{\pi_\theta(y\mid x)}{\pi_{\text{ref}}(y\mid x)}`,
      summary:
        'Transforms pretrained language models via preference optimization, critic-free group rollouts, asymmetric falsifiers, and self-distillation.',
      landmarks: ['RLHF-InstructGPT', 'DPO', 'GRPO-DeepSeek-R1', 'NOPO', 'SDPO', 'Regularized-Score-Centering']
    },
    {
      id: 'agentic-tool-rl',
      index: '11',
      shortTitle: '11 · Tool & Agentic RL',
      title: 'Tool-Using & Agentic RL',
      era: '2024–2026',
      formulaTex: String.raw`\tau = (s_0, a_0^{\text{think}}, o_0^{\text{tool}}, \dots, a_T), \quad \hat{A}_{t}^{\text{TACA}} = \mathcal{P}_{\text{env}}\!\big(\delta_t^{\text{TD}}\big)`,
      summary:
        'Assigns multi-turn credit across external code execution, search, memory retrieval, belief stopping times, and hierarchical skill libraries.',
      landmarks: ['TACA', 'LoongRL', 'T3-Belief-RL', 'HyperSkill', 'MemRL', 'SALA']
    },
    {
      id: 'embodied-vla',
      index: '12',
      shortTitle: '12 · Embodied & VLA RL',
      title: 'Embodied Robotics & VLA Policies',
      era: '2023–2026',
      formulaTex: String.raw`a_t = G_\psi\big(o_t, \ell, \mu_\theta(o_t)\big), \quad v_\theta(a_t^\tau, o_t) \approx u_t(a_t^\tau \mid a_t^1)`,
      summary:
        'Couples vision-language-action backbones and flow-matching chunks with online residual RL, tactile feedback, and sim-to-real locomotion.',
      landmarks: ['OpenVLA', 'Pi0-Flow-VLA', 'Latent-Policy-Steering', 'HeMeR', 'ScaleVLA', 'Heave-Ho']
    }
  ];

  const LEARNING_PATHS = [
    {
      id: 'core-foundations',
      code: 'PATH 01',
      title: 'Core Deep RL Foundations',
      subtitle: 'Master value contraction, variance-reduced policy gradients, trust regions, and maximum-entropy actor-critics.',
      steps: ['DQN', 'DDQN', 'TRPO', 'GAE', 'PPO', 'TD3', 'SAC', 'C51']
    },
    {
      id: 'world-planning',
      code: 'PATH 02',
      title: 'World Models & Tree Search',
      subtitle: 'Progress from imagination-augmented rollouts and MCTS self-play to latent dynamics and receding-horizon MPC.',
      steps: ['I2As', 'AlphaZero', 'World-Models', 'MuZero', 'DreamerV3', 'TD-MPC2', 'K-PWM', 'WorldSample']
    },
    {
      id: 'embodied-flow',
      code: 'PATH 03',
      title: 'Offline, Diffusion & Embodied VLA',
      subtitle: 'Bridge pessimistic offline RL and denoising diffusion policies with vision-language-action robot post-training.',
      steps: ['CQL', 'IQL', 'Decision-Transformer', 'Diffusion-Policy', 'OpenVLA', 'Pi0-Flow-VLA', 'Latent-Policy-Steering', 'Heave-Ho']
    },
    {
      id: 'reasoning-agents',
      code: 'PATH 04',
      title: 'LLM Reasoning & Agentic RL',
      subtitle: 'Trace RLHF and DPO into critic-free GRPO, one-sided falsification verifiers, and multi-turn tool-using agents.',
      steps: ['RLHF-InstructGPT', 'DPO', 'GRPO-DeepSeek-R1', 'NOPO', 'VEPO', 'SDPO', 'TACA', 'SALA']
    }
  ];

  const DOMAIN_MAP = new Map(DOMAINS.map(d => [d.id, d]));

  function inferDomain(item) {
    if (!item) return 'value-td';
    if (item.domain && DOMAIN_MAP.has(item.domain)) return item.domain;
    const cat = String(item.category || '');
    const blob = `${item.title || ''} ${cat} ${(item.description || '').slice(0, 400)}`.toLowerCase();

    if (cat === '2026 · Agent RL' || /\b(web agent|gui agent|coding agent|tool-use|tool use|multi-turn agent|agentic)\b/.test(blob)) {
      return 'agentic-tool-rl';
    }
    if (cat === '2026 · Embodied RL' || cat === '2026 · Embodied context' || /\b(vla|vision-language-action|robot|humanoid|dexterous|locomotion|manipulation)\b/.test(blob)) {
      return 'embodied-vla';
    }
    if (/\b(rlhf|dpo|grpo|preference optimization|verifiable reward|rlvr|reasoning post-training|language model)\b/.test(blob)) {
      return 'llm-alignment-reasoning';
    }
    if (/\b(offline|conservative q|decision transformer|diffusion policy|flow matching)\b/.test(blob)) {
      return 'offline-generative';
    }
    if (/\b(world model|muzero|alphazero|dreamer|tree search|mcts|model-based)\b/.test(blob)) {
      return 'world-planning';
    }
    if (/\b(multi-agent|multiagent|nash|equilibrium|starcraft)\b/.test(blob)) {
      return 'multi-agent';
    }
    if (/\b(imitation|inverse rl|safe|constrained|adversarial)\b/.test(blob)) {
      return 'imitation-irl-safety';
    }
    if (/\b(distributional|quantile|maximum entropy|soft actor-critic)\b/.test(blob)) {
      return 'dist-maxent';
    }
    if (/\b(exploration|curiosity|intrinsic|unsupervised)\b/.test(blob)) {
      return 'exploration-intrinsic';
    }
    if (/\b(hierarchical|option|meta-learning|meta-rl|episodic)\b/.test(blob)) {
      return 'hierarchical-meta';
    }
    if (/\b(policy gradient|actor-critic|ppo|trpo)\b/.test(blob)) {
      return 'policy-trust';
    }
    return 'value-td';
  }

  window.RL_LANDSCAPE = {
    DOMAINS,
    DOMAIN_MAP,
    LEARNING_PATHS,
    inferDomain
  };
})();
