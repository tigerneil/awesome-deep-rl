# HARP-Bench: Benchmarking Robot Manipulation Around Active Humans

First public date: 2026-11-08 (arXiv v1). Conference venue: CoRL 2026.

Authors: Qinhong Zhou, Riley Zong, Chunru Lin, Diyi Hu, Shivraj Singh Bhatti, Hongxin Zhang, Lin Qiu, Hanqing Zeng, Chuang Gan.

Classification: 2026 · Embodied context (CoRL 2026 benchmark and data pipeline, not an RL algorithm).

## Benchmark summary

Most robot manipulation benchmarks assume the robot is the sole active agent in a static workspace. HARP-Bench evaluates general-purpose manipulation policies and Vision-Language-Action (VLA) models when humans actively share and modify the workspace:

1. **Four structured human-interaction regimes**: Organizes shared-workspace manipulation into **Cueing** (human actions reveal implicit goals), **Contribution** (human completes subtasks), **Interruption** (human temporarily alters object availability or blocks trajectories), and **Co-presence** (nearby human activity imposes dynamic safety constraints), each paired with human-absent controls.
2. **Dynamic demonstration generation**: Supplies an automated pipeline for generating demonstrations in human-active manipulation scenes.
3. **Safety-versus-success audit**: Evaluates VLA policies, imitation learners, and heuristic controllers, showing that higher task completion rates do not reliably translate into safer human-proximate behavior and that post-interruption recovery remains a primary failure mode.

## Evaluation boundary

* **What it establishes**: Training on HARP-Bench demonstrations improves simulated human-present performance and transfers to physical hardware on a single-task family under human *Contribution*, while exposing persistent sim-to-real failure under *Interruption*.
* **What it does not establish**: HARP-Bench provides evaluation protocols and imitation data rather than a closed-loop safe reinforcement learning algorithm (`arXiv:2611.11123`).

## Sources and artifacts

* Paper: [arXiv:2611.11123](https://arxiv.org/abs/2611.11123)
* Code & benchmark: [https://github.com/UMass-Embodied-AGI/harp](https://github.com/UMass-Embodied-AGI/harp)
