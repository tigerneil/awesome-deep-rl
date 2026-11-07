# MESA: An Evaluation Framework for Compositional, Semantic, and Spatial Generalization in Robotics

First public date: 2026-11-03 (arXiv v1). Conference venue: CoRL 2026.

Authors: Albert Wilcox, Frank Chang, Nhi Nguyen, Aishani Chakraborty, Jeremy A. Collins, Vaibhav Saxena, Benjamin Joffe, Siddharth Karamcheti, et al.

Classification: 2026 · Embodied context (CoRL 2026 evaluation benchmark, not an RL algorithm).

## Benchmark summary

MESA provides a controlled, diagnostic evaluation framework for measuring where and why language-conditioned robot manipulation policies generalize or fail:

1. **Five decoupled evaluation suites**: Separates in-distribution performance from four controlled axes of out-of-distribution generalization—spatial configuration, object instance, object category, and subtask composition.
2. **MESA-Gen & BiMESA**: Introduces `MESA-Gen` (an automated task and demonstration synthesis pipeline extending MimicGen) and releases both the single-arm `MESA` suite and `BiMESA`, a large-scale bimanual generalization benchmark.
3. **Diagnostic baseline study**: Evaluates seven baseline families spanning diffusion policies, VLM-guided policies, and pretrained VLAs, finding that the strongest baseline reaches only 52% on MESA and 49% on BiMESA, while method rankings correlate with real-world RoboArena scores.

## Evaluation boundary

* **What it establishes**: Provides an unsaturated, reproducible simulation benchmark for isolating spatial, semantic, and compositional failure modes in VLAs and RL-post-trained policies.
* **What it does not establish**: MESA is a simulation benchmark and demonstration-generation suite rather than a new reinforcement learning algorithm.

## Sources and artifacts

* Paper: [arXiv:2611.05567](https://arxiv.org/abs/2611.05567)
* Project page: [https://pairlab.github.io/MESA](https://pairlab.github.io/MESA)
