# Accelerating Safe Reinforcement Learning with Massive Parallelism

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Joonyoung Lim, Younghwan Yoo.

Classification: 2026 · Conference RL (NeurIPS 2026 — Safe RL & Massively Parallel Simulation).

## Method summary

Scaling safe reinforcement learning (Safe RL) to GPU-accelerated, massively parallel simulators with thousands of environments and short rollout horizons introduces a structural mismatch with Constrained Markov Decision Processes (CMDPs), whose safety constraints are defined over full-episode cumulative costs. This paper resolves that mismatch:

1. **Phase-mixture analysis of staggered resets**: Formalizes short-horizon rollouts collected under staggered environment resets as samples from a phase-mixture distribution across trajectory segments, characterizing the resulting cost-estimation bias.
2. **Phase-aggregated episode cost estimator**: Reconstructs unbiased full-episode cost return estimates from short rollout batches across parallel workers.
3. **Uncertainty-aware constraint tightening**: Incorporates finite-sample estimation error and phase-distribution shift into a tightened CMDP constraint compatible with on-policy primal-dual / PPO updates.

## Mathematical formulation

A Constrained MDP enforces $\max_\pi J_R(\pi)$ subject to full-episode cumulative cost $J_C(\pi) = \mathbb{E}_\pi\!\left[\sum_{t=0}^{H-1} \gamma^t c(s_t, a_t)\right] \le d$. When $N \gg 1$ GPU environments execute short rollouts of length $T \ll H$ under staggered resets across trajectory phases $k \in \{0, \dots, K-1\}$ ($H = KT$), naive batch averaging biases $J_C(\pi)$. The phase-aggregated estimator reconstructs the full-episode cost and tightens the primal-dual constraint by an epistemic & phase-shift margin $\Delta_n(\delta)$:

$$
\widehat{J}_C^{\text{phase}}(\pi) = \sum_{k=0}^{K-1} \gamma^{kT}\,\widehat{\mathbb{E}}_{(s,a) \sim \mathcal{B}_k}\!\left[\sum_{\tau=0}^{T-1} \gamma^\tau c(s_\tau, a_\tau)\right], \qquad \widehat{J}_C^{\text{phase}}(\pi) + \Delta_n(\delta) \le d
$$

## Evaluation and evidence boundary

* **Reported scope**: Evaluated in a GPU-accelerated MJX implementation of Safety Gym, matching the constraint satisfaction and return of long-horizon serial Safe RL while substantially cutting wall-clock training time.
* **Evidence boundary**: Evaluated in simulated continuous-control Safety Gym benchmarks (MJX); requires staggered phase coverage across parallel workers to reconstruct full-episode cost returns reliably.

## Sources and artifacts

* Paper: [arXiv:2611.08273](https://arxiv.org/abs/2611.08273)
