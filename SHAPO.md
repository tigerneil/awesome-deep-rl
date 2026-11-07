# SHAPO: Sharpness-Aware Policy Optimization for Safe Exploration

First public date: 2026-06-08 (arXiv v1). Conference venue: ICLR 2026.

Authors: Kaustubh Mani, Yann Pequignot, Vincent Mai, Liam Paull.

Classification: 2026 · Conference RL (ICLR 2026 — Safe Exploration & Policy Optimization).

## Method summary

Safe exploration requires avoiding catastrophic actions in under-explored state regions before sufficient cost data has been collected. SHAPO uses the actor network's local loss sharpness as an intrinsic proxy for epistemic uncertainty:

1. **Parameter-perturbation epistemic proxy**: Measures the sensitivity of policy performance to small adversarial perturbations in actor parameters.
2. **Pessimistic sharpness-aware policy gradient**: Evaluates policy gradients at worst-case perturbed actor parameters, which analytically reweights gradient contributions to amplify rare unsafe trajectories and temper updates in uncertain regions.
3. **Ensemble-free safe exploration**: Encourages conservative behavior in novel states without maintaining an expensive ensemble of dynamics or cost critics.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across continuous-control safe exploration benchmarks, expanding the reward-vs-safety Pareto frontier compared to standard constrained and risk-sensitive RL baselines.
* **Evidence boundary**: Parameter-space sharpness is a heuristic proxy for state-space epistemic uncertainty and does not guarantee hard zero-violation safety under arbitrary distribution shifts.

## Sources and artifacts

* Paper: [arXiv:2606.10228](https://arxiv.org/abs/2606.10228)
