# Reward Budgeting Reduces Premature Convergence in Reinforcement Learning for LLM Reasoning

First public date: 2026-11-04 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Mengni Jia, Mengyu Zhou, Xiaoxi Jiang, Guanjun Jiang.

Classification: 2026 · Agent RL (NeurIPS 2026).

## Method summary

Reinforcement learning for LLM reasoning frequently plateaus early as the output distribution sharpens, and naive entropy bonuses often fail to raise the asymptotic reasoning ceiling. This paper analyzes update dynamics through the implicit target policy and introduces **reward budgeting**:

1. **Effective sharpness factor ($\kappa_{\mathrm{eff}}$)**: Characterizes how strongly advantage or reward gaps between sampled rollouts amplify probability-ratio updates toward early mode collapse.
2. **Fixed per-prompt reward budget**: Replaces fixed per-rollout reward scaling with a fixed total reward budget per prompt divided across successful rollouts. Under binary verifiable rewards and independent on-policy rollouts, the unclipped score-function estimator follows the gradient of an exact concave objective with diminishing marginal returns as pass rates increase.
3. **Drop-in advantage construction**: Naturally shrinks the advantage gap on prompts that the policy already solves reliably while concentrating gradient signal on frontier prompts without requiring explicit entropy regularization.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on Qwen3-8B and Llama3.2-3B-Instruct across mathematical reasoning suites, reporting gains of up to +12.50 points on AMC23 and +10.00 points on AIME24 and AIME25 over standard RLVR baselines.
* **Evidence boundary**: Exact concave-objective equivalence is proven for unclipped binary-reward score-function estimators; clipped PPO/GRPO implementations use reward budgeting as a motivated plug-in advantage transformation. Evaluated on mathematical reasoning benchmarks rather than physical robot control.

## Sources and artifacts

* Paper: [arXiv:2611.05942](https://arxiv.org/abs/2611.05942)
