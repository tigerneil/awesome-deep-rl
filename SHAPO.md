# SHAPO: Sharpness-Aware Policy Optimization for Safe Exploration

First public date: 2026-06-08 (arXiv v1). Conference venue: ICLR 2026.

Authors: Kaustubh Mani, Yann Pequignot, Vincent Mai, Liam Paull.

Classification: 2026 · Conference RL (ICLR 2026 — Safe Exploration & Policy Optimization).

## Method summary

Safe exploration requires avoiding catastrophic actions in under-explored state regions before sufficient cost data has been collected. SHAPO uses the actor network's local loss sharpness as an intrinsic proxy for epistemic uncertainty:

1. **Parameter-perturbation epistemic proxy**: Measures the sensitivity of policy performance to small adversarial perturbations in actor parameters.
2. **Pessimistic sharpness-aware policy gradient**: Evaluates policy gradients at worst-case perturbed actor parameters, which analytically reweights gradient contributions to amplify rare unsafe trajectories and temper updates in uncertain regions.
3. **Ensemble-free safe exploration**: Encourages conservative behavior in novel states without maintaining an expensive ensemble of dynamics or cost critics.

## Mathematical formulation

SHAPO formulates a pessimistic min-max surrogate over an $\ell_2$ parameter neighborhood $\|\delta\|_2 \le \rho$ around the actor parameters $\theta$, treating local loss curvature as an ensemble-free epistemic uncertainty signal:

$$
\max_{\theta} \min_{\|\delta\|_2 \le \rho} \mathcal{J}_{\text{surr}}(\theta + \delta), \qquad \delta^*(\theta) \approx -\rho \frac{\nabla_\theta \mathcal{J}_{\text{surr}}(\theta)}{\|\nabla_\theta \mathcal{J}_{\text{surr}}(\theta)\|_2 + \varepsilon}
$$

Evaluating the policy update at the worst-case perturbed actor $\nabla_\theta \mathcal{J}_{\text{surr}}\!\big(\theta + \delta^*(\theta)\big)$ upweights high-sensitivity, under-explored trajectories so the policy avoids sharp, potentially unsafe action regions during online exploration.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across continuous-control safe exploration benchmarks, expanding the reward-vs-safety Pareto frontier compared to standard constrained and risk-sensitive RL baselines.
* **Evidence boundary**: Parameter-space sharpness is a heuristic proxy for state-space epistemic uncertainty and does not guarantee hard zero-violation safety under arbitrary distribution shifts.

## Sources and artifacts

* Paper: [arXiv:2606.10228](https://arxiv.org/abs/2606.10228)
