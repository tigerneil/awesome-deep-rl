# Off-Policy Learning with Excursion Policies

First public date: 2026-11-09 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Jiamin He, Mark Rowland, Zhaohan Daniel Guo, Hado van Hasselt, Diana Borsa.

Classification: 2026 · Conference RL (NeurIPS 2026; off-policy RL theory and TD evaluation).

## Method summary

Off-policy value estimation faces a fundamental bias-variance-stability trade-off when target policy $\pi$ diverges from behavior policy $\mu$. Rather than linearly mixing action probabilities at each step, this work formalizes **excursion policies**:

1. **Multi-step target excursions**: Defines a structured policy family in which the agent commits to following the target policy $\pi$ for a multi-step temporal *excursion* before reverting to the behavior policy $\mu$.
2. **Dynamic programming characterization**: Derives exact Bellman operators and dynamic programming properties for excursion value functions, situating state-wise mixture policies as just one point inside a broader temporal interpolation space.
3. **Provably convergent off-policy TD**: Constructs sound off-policy temporal-difference evaluation algorithms for excursion values without unstable long-horizon importance-weight products.

## Evaluation and evidence boundary

* **Reported scope**: Establishes convergence guarantees for excursion TD evaluation and evaluates bias-variance-stability trade-offs on tabular diagnostics and continuous-control benchmarks against mixture-policy baselines.
* **Evidence boundary**: Primarily a foundational off-policy evaluation and dynamic-programming contribution; empirical benchmarks demonstrate comparable efficiency-stability trade-offs and distinct temporal credit properties relative to mixture policies rather than claiming sweeping leaderboard SOTA (`arXiv:2611.13275`).

## Sources and artifacts

* Paper: [arXiv:2611.13275](https://arxiv.org/abs/2611.13275)
