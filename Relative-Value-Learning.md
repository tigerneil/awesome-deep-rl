# Relative Value Learning (RV)

First public date: 2026-07-23 (arXiv v1). Conference venue: ICLR 2026.

Authors: Marc Höftmann, Jan Robine, Stefan Harmeling.

Classification: 2026 · Conference RL (ICLR 2026 — Value Learning & Policy Gradient Theory).

## Method summary

Standard actor-critic methods estimate absolute state values $V(s)$, even though policy control and advantage estimation depend only on relative value differences between states. Relative Value Learning (RV) replaces absolute critics with pairwise difference critics:

1. **Antisymmetric relative critic $\Delta(s_i, s_j) = V(s_i) - V(s_j)$**: Directly predicts the value difference between state pairs using an antisymmetric parameterization.
2. **Pairwise Bellman operator**: Proves that the pairwise Bellman backup is a $\gamma$-contraction with a unique fixed point equal to true value differences, and derives $1$-step, $n$-step, and $\lambda$-return relative targets.
3. **Relative Generalized Advantage Estimation (R-GAE)**: Reconstructs an unbiased advantage estimator from pairwise state-value differences and integrates it directly into PPO.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated with PPO across the 49-game Atari Learning Environment (ALE) benchmark, matching or outperforming standard absolute-critic PPO while providing theoretical guarantees for relative backups.
* **Evidence boundary**: Evaluated on discrete-action Atari benchmarks; pairwise critic evaluation requires choosing reference anchor states within rollout batches.

## Sources and artifacts

* Paper: [arXiv:2607.21120](https://arxiv.org/abs/2607.21120)
