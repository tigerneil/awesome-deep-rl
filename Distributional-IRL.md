# Distributional Inverse Reinforcement Learning

First public date: 2025-10-03 (arXiv v1). Conference venue: ICML 2026 Oral (0.7% acceptance).

Authors: Feiyang Wu, Ye Zhao, Anqi Wu.

Classification: 2026 · Conference RL (ICML 2026 Oral; offline inverse RL and risk-sensitive control).

## Method summary

Conventional Inverse Reinforcement Learning (IRL) recovers a deterministic point-estimate reward function or matches only expected returns, discarding expert risk preferences and reward uncertainty. This work formulates **offline Distributional IRL**:

1. **Joint reward-uncertainty and return-distribution modeling**: Learns an explicit distribution over reward functions alongside full return distributions from offline expert demonstrations.
2. **First-order stochastic dominance (FSD) & distortion risk measures (DRMs)**: Minimizes FSD violations and integrates distortion risk measures directly into policy optimization to recover risk-aware policies alongside expressive reward distributions.
3. **Non-asymptotic convergence guarantee**: Proves convergence within $\mathcal{O}(\varepsilon^{-2})$ iterations in the offline distributional IRL setting.

## Mathematical formulation

Rather than matching scalar expected returns $\mathbb{E}[Z^\pi]$, offline Distributional IRL models a reward distribution $\mathcal{P}_R$ inducing return distribution $Z^\pi(s,a)$ with quantile function $F_{Z^\pi}^{-1}(u)$ and optimizes risk-sensitive policies under a distortion risk measure $\rho_g(Z^\pi) = \int_0^1 F_{Z^\pi}^{-1}(u)\, dg(u)$:

$$
\min_{\mathcal{P}_R \in \mathcal{R}}\; \max_{\pi \in \Pi}\; \mathbb{E}_{\mathcal{P}_R}\!\Big[\rho_g(Z^{\pi}) - \rho_g(Z^{\pi_E})\Big] - \lambda\,\mathcal{D}_{\text{FSD}}\!\big(F_{Z^{\pi_E}}, F_{Z^{\pi}}\big)
$$

where $\mathcal{D}_{\text{FSD}}(F_E, F_\pi) = \int_{\mathbb{R}} \max\!\big(0, F_E(z) - F_\pi(z)\big)\,dz$ penalizes first-order stochastic dominance violations relative to the offline expert $\pi_E$.

## Evaluation and evidence boundary

* **Reported scope**: Validated on synthetic risk-sensitive benchmarks, real-world animal neurobehavioral trajectory data, and continuous-control MuJoCo tasks, recovering richer reward structure and stronger imitation fidelity than expectation-matching offline IRL baselines.
* **Evidence boundary**: First posted on arXiv in October 2025 (`arXiv:2510.03013`) and selected as an ICML 2026 Oral; operates in offline settings assuming expert trajectories reflect coherent distributional preferences rather than online physical robot exploration.

## Sources and artifacts

* Paper: [arXiv:2510.03013](https://arxiv.org/abs/2510.03013)
