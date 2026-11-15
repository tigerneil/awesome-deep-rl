# Rhythm: Learning Interactive Whole-Body Control for Dual Humanoids

First public date: 2026-03-03 (arXiv v1). Conference venue: RSS 2026.

Authors: Hongjin Chen, Wei Zhang, Pengfei Li, Shihao Ma, Ke Ma, Yujie Jin, Zijun Xu, Xiaohui Wang, et al.

Classification: 2026 · Embodied RL (RSS 2026).

## Method summary

Rhythm extends humanoid whole-body reinforcement learning from isolated single-robot tracking to physically coupled multi-humanoid interactions:

1. **Interaction-Aware Motion Retargeting (IAMR)**: Converts human-human motion-capture sequences into kinematically feasible dual-humanoid reference trajectories that preserve inter-agent spatial relationships and contact geometry across morphology mismatches.
2. **Interaction-Guided Reinforcement Learning (IGRL)**: Trains whole-body control policies in multi-agent simulation using relational interaction-graph rewards that jointly penalize self/inter-robot collisions and enforce synchronized contact dynamics.
3. **Sim-to-real dual-humanoid deployment**: Transfers learned policies zero-shot onto two physical Unitree G1 humanoids executing close-proximity coupled behaviors.

## Evaluation and evidence boundary

* **Reported scope**: Demonstrated in simulation and on paired physical Unitree G1 humanoids across physically coupled multi-agent skills such as cooperative dancing and hugging.
* **Evidence boundary**: Focuses on motion-reference-guided social/physical coordination primitives rather than open-vocabulary object manipulation, and relies on inter-robot relative state estimation during physical execution (`arXiv:2603.02856`).

## Sources and artifacts

* Paper: [arXiv:2603.02856](https://arxiv.org/abs/2603.02856)
