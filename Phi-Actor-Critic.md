# Phi-Actor-Critic: Steering General-Sum Games to Pareto-Efficient Correlated Equilibria

First public date: 2026-06-09 (arXiv v1). Conference venue: IJCAI 2026.

Authors: Wongyu Lee, Francesco Lelli, Omran Ayoub, Massimo Tornatore.

Classification: 2026 · Conference RL (IJCAI 2026; multi-agent RL and game-theoretic equilibrium selection).

## Method summary

In general-sum mixed-motive multi-agent reinforcement learning (MARL), independent policy gradients frequently converge to socially inefficient Nash equilibria while monotonic value decomposition fails under conflicting incentives. $\Phi$-Actor-Critic ($\Phi$-AC) steers MARL toward high-welfare **correlated equilibria (CE)**:

1. **Single-pass centralized attention swap-regret critic**: Approximates vector-valued counterfactual swap regrets across action modifications in a single forward pass of a centralized attention critic, avoiding combinatorial counterfactual rollout simulations.
2. **Lagrangian welfare-maximizing equilibrium selection**: Maximizes collective social return subject to bounded swap-regret constraints via primal-dual Lagrangian optimization, selecting Pareto-efficient correlated equilibria that remain incentive-compatible.
3. **Decentralizable coordination**: Uses centralized regret supervision during training to align mixed-motive policies without requiring monotonic team-value assumptions.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on canonical general-sum matrix games, Multi-Agent Particle Environments (MPE), and the Melting Pot *Harvest* social dilemma, achieving higher collective welfare and fairness than Nash-seeking and value-decomposition MARL baselines.
* **Evidence boundary**: Evaluated in simulated matrix, particle, and grid/social-dilemma games rather than physical multi-robot hardware, and requires centralized training access to joint state-action histories (`arXiv:2606.11284`).

## Sources and artifacts

* Paper: [arXiv:2606.11284](https://arxiv.org/abs/2606.11284)
