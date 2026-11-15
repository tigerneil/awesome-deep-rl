# TACA: Transition-Aware Credit Assignment in Agentic Reinforcement Learning

First public date: 2026-11-08 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Xiangyu Lu, Zhanke Zhou, Jiazhe Ning, Chentao Cao, Jiangchao Yao, Bo Han.

Classification: 2026 · Agent RL (NeurIPS 2026).

## Method summary

Multi-turn tool-using LLM agents trained with outcome-level RLVR frequently suffer progressive tool-calling collapse. This paper traces the collapse to three coupled dynamics—*tool-token imbalance* in failed rollouts, *token-mean aggregation amplification* on longer failed traces, and *failure-driven retry loops*—and introduces **Transition-Aware Credit Assignment (TACA)**:

1. **Advantage Projection**: Applies a minimal uniform shift to tool-call tokens within each prompt group so their mean advantage remains nonnegative, preventing systemic suppression of tool invocation syntax.
2. **Decision Contrast**: Explicitly contrasts returns between tool-assisted and direct-reasoning trajectories on the same prompt to calibrate *when* the policy initiates a tool transition.
3. **Supervised Replay**: Selectively replays verified tool-call segments from previously sampled successful trajectories to stabilize tool-argument generation.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on Qwen2.5-1.5B and Qwen2.5-3B across six tool-integrated reasoning benchmarks, improving mean accuracy over multi-turn GRPO (`MT-GRPO`) by +4.61 and +3.61 percentage points respectively while preventing mid-training tool-call collapse.
* **Evidence boundary**: Validated on 1.5B–3B language agents in symbolic/search/code tool environments rather than frontier-scale models or physical robotic manipulation (`arXiv:2611.11330`).

## Sources and artifacts

* Paper: [arXiv:2611.11330](https://arxiv.org/abs/2611.11330)
* Code: [https://github.com/tmlr-group/TACA](https://github.com/tmlr-group/TACA)
