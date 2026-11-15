# VLM-AR3L: Vision-Language Models for Absolute and Relative Rewards in Reinforcement Learning

First public date: 2026-07-01 (arXiv v1). Conference venue: IJCAI 2026.

Authors: Kuan-Chen Chen, Winston Chen, Wei-Fang Sun, Min-Chun Hu.

Classification: 2026 · Embodied RL (IJCAI 2026).

## Method summary

VLM-AR3L addresses reward specification in visually complex, open-ended environments where natural-language goals are difficult to translate into hand-engineered dense reward functions:

1. **Dual absolute and relative reward modeling**: Trains two complementary reward estimators from Vision-Language Model (VLM) preference annotations conditioned on the natural-language task goal and visual observations.
2. **State-grounded absolute evaluation**: The absolute reward model predicts scalar goal-alignment scores for individual visual states, anchoring long-horizon policy optimization against drift.
3. **Transition-grounded relative progress**: The relative reward model compares consecutive visual observations to detect local task progress or regression, smoothing out noisy single-frame VLM judgments.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across classic control, simulated robotic manipulation, and open-world embodied decision-making in Minecraft, outperforming single-mode VLM reward baselines on long-horizon tasks.
* **Evidence boundary**: Results are obtained in simulated control, manipulation, and Minecraft environments rather than physical robot hardware; downstream policy quality remains bounded by VLM preference-labeling accuracy on visually ambiguous states (`arXiv:2607.00483`).

## Sources and artifacts

* Paper: [arXiv:2607.00483](https://arxiv.org/abs/2607.00483)
* Project page: [https://vlm-ar3l.github.io/](https://vlm-ar3l.github.io/)
