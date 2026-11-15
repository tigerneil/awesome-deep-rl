# Latent Policy Steering through One-Step Flow Policies (LPS)

First public date: 2026-03-05 (arXiv v1). Conference venue: RSS 2026.

Authors: Hokyun Im, Andrey Kolobov, Jianlong Fu, Youngwoon Lee.

Classification: 2026 · Embodied RL (RSS 2026).

## Method summary

Latent Policy Steering (LPS) resolves a core tension in offline robot reinforcement learning—maximizing action values without drifting outside the offline dataset support or relying on distorted latent-space proxy critics:

1. **Behavior-constrained one-step MeanFlow prior**: Pretrains a differentiable one-step MeanFlow generative policy on offline demonstrations so bounded latent inputs map directly onto in-support robot actions in a single forward evaluation.
2. **Direct original-action-space $Q$-gradient steering**: Trains the critic exclusively in the original robot action space and backpropagates exact $\nabla_a Q(s, a)$ gradients through the one-step MeanFlow map to update a lightweight latent-space actor, eliminating indirect latent-critic distillation.
3. **Hyperparameter-light offline RL**: Structural support constraints in the MeanFlow generator decouple behavioral regularization from critic optimization, avoiding per-task conservatism sweeps.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across OGBench offline manipulation/locomotion suites and real-world robotic manipulation tasks, outperforming behavioral cloning and multi-step or proxy-critic latent-steering baselines.
* **Evidence boundary**: Performance remains bounded by the coverage of the offline dataset captured by the pretrained MeanFlow prior; LPS steers within existing behavioral modes rather than discovering out-of-support skills via unconstrained online exploration (`arXiv:2603.05296`).

## Sources and artifacts

* Paper: [arXiv:2603.05296](https://arxiv.org/abs/2603.05296)
* Project page: [https://jellyho.github.io/LPS/](https://jellyho.github.io/LPS/)
