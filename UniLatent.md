# UniLatent: Cross-Embodiment Transfer via Latent Observation Alignment

First public date: 2026-11-06 (arXiv v1). Conference venue: CoRL 2026.

Authors: Yufei Ding, Yi Du, Weiduo Yuan, Hao Jiang, Dylan Goetting, Lawrence Yunliang Chen, Daniel Seita, Yue Wang.

Classification: 2026 · Embodied context (CoRL 2026 cross-embodiment transfer framework, not an RL algorithm).

## Method summary

UniLatent transfers robot manipulation policies across arms with different kinematics, geometry, and visual appearance without brittle pixel-space image translation:

1. **Paired simulation rendering for observation alignment**: Renders matched source-robot and target-robot visual observations in simulation and aligns a trainable source visual encoder to a frozen target-embodiment encoder in a shared latent space.
2. **Direct latent policy execution**: Trains the manipulation policy on latent-encoded source demonstrations and deploys it directly on target-robot visual observations without pixel-level generative translation at test time.
3. **Few-shot real-world adaptation**: Supports rapid real-to-real cross-embodiment adaptation when a small number of target-robot demonstrations are available.

## Evaluation boundary

* **What it establishes**: Achieves up to 93% zero-shot transfer success across three simulated tasks and two target robot arms (+30 points over pixel-translation baselines), and reaches 27/30 successful rollouts on physical xArm-to-Franka transfer after fine-tuning with 10 target demonstrations per task.
* **What it does not establish**: UniLatent aligns visual observation encoders for imitation-learned policies rather than solving cross-morphology torque dynamics via reinforcement learning, and requires paired simulation assets for latent alignment (`arXiv:2611.10061`).

## Sources and artifacts

* Paper: [arXiv:2611.10061](https://arxiv.org/abs/2611.10061)
* Project page & code: [https://selina2023.github.io/unilatent/](https://selina2023.github.io/unilatent/)
