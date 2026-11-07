# Learning Object-Centric Motion Priors from Human for Robotic Dexterous Manipulation

First public date: 2026-11-04 (arXiv v1). Conference venue: AAAI 2026 (Oral).

Authors: Zhengdong Hong, Guofeng Zhang.

Classification: 2026 · Embodied RL (AAAI 2026 Oral).

## Method summary

Multi-fingered dexterous manipulation suffers from high-dimensional action spaces and brittle, task-specific reward engineering, while direct morphological retargeting from human hands struggles with embodiment mismatch. This paper uses Human-Object Interaction (HOI) datasets to learn an object-centric reward prior for reinforcement learning:

1. **Holistic future hand-object state prediction**: Trains a predictive prior on human HOI trajectories to forecast future object poses and hand-object spatial relations rather than cloning human finger joint angles directly.
2. **Object-centric RL reward**: Uses the predicted future object states as a dense, task-agnostic reward signal for reinforcement learning, reducing manual reward shaping across manipulation skills.
3. **Cross-embodiment dexterous deployment**: Because the RL objective is anchored primarily in object motion and interaction states, policies transfer across distinct multi-fingered robot hand embodiments in simulation and physical hardware.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on three dexterous manipulation tasks in simulation and on physical robot hands, reporting higher success rates on unseen objects and cross-embodiment transfer across different dexterous hands.
* **Evidence boundary**: Relies on accurate 6D object pose or state tracking during RL training and assumes that human HOI datasets cover the relevant object-affordance category.

## Sources and artifacts

* Paper: [arXiv:2611.05979](https://arxiv.org/abs/2611.05979)
* AAAI 2026 proceedings entry: [https://ojs.aaai.org/index.php/AAAI/article/view/38892](https://ojs.aaai.org/index.php/AAAI/article/view/38892)
