# OopsieVerse: A Safety Benchmark with Damage-Aware Simulation for Robot Manipulation

First public date: 2026-06-30 (arXiv v1). Conference venue: RSS 2026.

Authors: Arnav Balaji, Arpit Bahety, Sriniket Ambatipudi, Daniel Lam, Junhong Xu, Roberto Martín-Martín.

Classification: 2026 · Embodied context (RSS 2026 safety benchmark & damage-conditioned RL suite).

## Benchmark & method summary

Standard robot manipulation simulators measure task completion while ignoring physical harm caused by excessive contact forces, thermal hazards, or spilled liquids. OopsieVerse introduces damage-aware simulation and safety benchmarking:

1. **DamageSim**: A simulator-agnostic layer instantiated in both OmniGibson (NVIDIA Omniverse) and RoboCasa (MuJoCo) that converts contact forces, temperature changes, and fluid interactions into explicit mechanical, thermal, and liquid damage signals.
2. **Household safety benchmark**: Evaluates whether imitation learning, reinforcement learning, and state-of-the-art VLA policies complete household tasks without damaging the robot or environment.
3. **Damage-conditioned RL and sim-to-real transfer**: Demonstrates that incorporating explicit damage signals during demonstration collection and reinforcement learning reduces unsafe physical contacts in sim-to-real deployment.

## Evaluation boundary

* **What it establishes**: Task success rates alone hide severe physical damage modes in household manipulation, and explicit damage feedback improves safe policy learning in OmniGibson and RoboCasa.
* **What it does not establish**: Simulated mechanical/thermal/fluid damage models remain approximations of real material fracture and electrical hazards.

## Sources and artifacts

* Paper: [arXiv:2606.31993](https://arxiv.org/abs/2606.31993)
* Project page & code: [https://robin-lab.cs.utexas.edu/oopsieverse/](https://robin-lab.cs.utexas.edu/oopsieverse/)
