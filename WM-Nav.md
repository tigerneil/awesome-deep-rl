# Seeing Beyond the Next Step: World-Model-Guided Human-Like Navigation in Multi-Agent Scenes

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Seong-Eun Hong, JuYeong Hwang, Jinhyun Kim, Hanyoung Jang, HyeongYeop Kang.

Classification: 2026 · Embodied RL (NeurIPS 2026).

## Method summary

Rolling out action-conditioned world models at every online control step is often too slow for real-time robot navigation in crowded human scenes. This paper proposes amortizing world-model foresight into training rather than inference:

1. **Dual task-aligned world models as training-time oracles**: Pairs a discrete visual action prior with two specialized world models—one predicting nearby multi-agent social dynamics and one predicting future scene semantics (e.g., crosswalks vs. roadways).
2. **Group-relative preference distillation**: Candidate actions sampled from the policy prior are scored by their multi-step predicted consequences under both world models, and the policy is updated via group-relative preference distillation.
3. **Single-pass deployment**: At inference time, both world models are discarded; the distilled navigation policy executes in a single forward pass without online rollout overhead.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across five held-out populated navigation scenarios, improving collision safety, social/group coherence, goal completion, and human-likeness ratings over reactive and learned navigation baselines.
* **Evidence boundary**: Foresight quality is bounded by the coverage and calibration of the two training-time world models; removing world models at test time trades online replanning over multi-step rollouts for low-latency execution.

## Sources and artifacts

* Paper: [arXiv:2611.07730](https://arxiv.org/abs/2611.07730)
* Project page: [https://seoneun.github.io/-NeurIPS-2026-Seeing-Beyond-the-Next-Step/](https://seoneun.github.io/-NeurIPS-2026-Seeing-Beyond-the-Next-Step/)
