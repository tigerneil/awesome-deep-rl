# Semantics-to-Contact (S2C): A Stagewise Framework for Robust Contact-Rich Manipulation

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Guanren Qiao, Ruixiang Ouyang, Sheng Xu, Yueci Deng, Yunxin Tai, Kui Jia, Guiliang Liu.

Classification: 2026 · Embodied RL (NeurIPS 2026).

## Method summary

Semantics-to-Contact (S2C) addresses visual overfitting during real-world reinforcement learning for contact-rich manipulation by decomposing execution into two stages:

1. **Semantic focusing (Stage 1)**: A vision-language model (VLM) localizes task-relevant interaction regions across visually diverse scenes, providing coarse spatial guidance that narrows the downstream exploration volume.
2. **Contact refinement via residual RL (Stage 2)**: Within the localized region, a real-world human-in-the-loop residual reinforcement learning policy learns fine-grained contact behaviors conditioned on force-torque feedback.
3. **Object-centric visual augmentation**: During training, an augmentation pipeline randomizes background appearance while preserving the robot embodiment and task-relevant objects so the residual policy does not latch onto spurious scene textures.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on six real-world contact-rich manipulation tasks under visual and positional variations, reporting higher success rates and stronger out-of-distribution visual robustness than end-to-end visuomotor RL baselines.
* **Evidence boundary**: Requires VLM region localization prior to contact engagement, force-sensor feedback during Stage 2, and human-in-the-loop supervision during physical residual RL training. Results are author-reported in the NeurIPS 2026 camera-ready preprint (`arXiv:2611.07532`).

## Sources and artifacts

* Paper: [arXiv:2611.07532](https://arxiv.org/abs/2611.07532)
* Project page & demos: [https://edem-ai.github.io/S2C/](https://edem-ai.github.io/S2C/)
