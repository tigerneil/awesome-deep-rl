# Embodied-R1: Reinforced Embodied Reasoning for General Robotic Manipulation

First public date: 2025-08-19 (arXiv v1; published at ICLR 2026). Conference venue: ICLR 2026.

Authors: Yifu Yuan, Haiqin Cui, Yibin Chen, Zibin Dong, Fei Ni, Kourosh Darvish, Hao Shen, Jianye Hao, et al.

Classification: 2026 · Embodied RL (ICLR 2026 — Reinforced Fine-Tuning for Embodied Spatial Pointing).

## Method summary

Directly predicting low-level joint actions inside a vision-language model often harms visual generalization across camera viewpoints and robot morphologies. Embodied-R1 decouples spatial reasoning from low-level motor execution through an embodiment-agnostic "pointing" interface trained with reinforcement learning:

1. **Unified embodied pointing representation & Embodied-Points-200K**: Formulates four spatial-pointing primitives (referring, affordance, trajectory, and placement points) across 200K curated visual-spatial instances.
2. **Two-stage GRPO Reinforced Fine-Tuning (RFT)**: Optimizes a 3B VLM using Group Relative Policy Optimization (GRPO) with verifiable geometric/spatial rewards—first on general spatial reasoning, then on multi-task embodied pointing—to handle multi-modal valid solutions where supervised fine-tuning averages out distinct feasible points.
3. **Zero-shot downstream manipulation**: Pairs Embodied-R1's predicted 2D/3D spatial keypoints and trajectories with downstream motion primitives/controllers without task-specific robot fine-tuning.

## Evaluation and evidence boundary

* **Reported scope**: Evaluates on 11 spatial/pointing benchmarks, SIMPLEREnv simulation (56.2% zero-shot success), and 8 real-world XArm tabletop manipulation tasks (87.5% success rate), reporting strong robustness to lighting and background perturbations.
* **Evidence boundary**: First arXiv submission was August 19, 2025 and conference publication is at ICLR 2026. Note that GRPO optimizes the VLM's spatial pointing predictions against geometric rewards rather than learning closed-loop contact-force torque control directly on the robot.

## Sources and artifacts

* Paper: [arXiv:2508.13998](https://arxiv.org/abs/2508.13998)
* OpenReview (ICLR 2026): [https://openreview.net/forum?id=i5wlozMFsQ](https://openreview.net/forum?id=i5wlozMFsQ)
* Project page & code: [https://embodied-r1.github.io/](https://embodied-r1.github.io/)
