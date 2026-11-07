# Accelerating Safe Reinforcement Learning with Massive Parallelism

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Joonyoung Lim, Younghwan Yoo.

Classification: 2026 · Conference RL (NeurIPS 2026 — Safe RL & Massively Parallel Simulation).

## Method summary

Scaling safe reinforcement learning (Safe RL) to GPU-accelerated, massively parallel simulators with thousands of environments and short rollout horizons introduces a structural mismatch with Constrained Markov Decision Processes (CMDPs), whose safety constraints are defined over full-episode cumulative costs. This paper resolves that mismatch:

1. **Phase-mixture analysis of staggered resets**: Formalizes short-horizon rollouts collected under staggered environment resets as samples from a phase-mixture distribution across trajectory segments, characterizing the resulting cost-estimation bias.
2. **Phase-aggregated episode cost estimator**: Reconstructs unbiased full-episode cost return estimates from short rollout batches across parallel workers.
3. **Uncertainty-aware constraint tightening**: Incorporates finite-sample estimation error and phase-distribution shift into a tightened CMDP constraint compatible with on-policy primal-dual / PPO updates.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated in a GPU-accelerated MJX implementation of Safety Gym, matching the constraint satisfaction and return of long-horizon serial Safe RL while substantially cutting wall-clock training time.
* **Evidence boundary**: Evaluated in simulated continuous-control Safety Gym benchmarks (MJX); requires staggered phase coverage across parallel workers to reconstruct full-episode cost returns reliably.

## Sources and artifacts

* Paper: [arXiv:2611.08273](https://arxiv.org/abs/2611.08273)
