# LGPO: Is the Importance Ratio Necessary for Stable Reinforcement Learning in LLMs?

First public date: 2026-11-11 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Shuibai Zhang, Junhyuck Kim, Gyeongman Kim, Jaewoong Cho.

Classification: 2026 · Conference RL (NeurIPS 2026).

## Method summary

PPO- and GRPO-style LLM post-training pipelines recompute old-policy token log-probabilities to form importance-sampling ratios $\pi_\theta / \pi_{\theta_{\mathrm{old}}}$ and apply ratio clipping. This paper disentangles off-policy importance correction from trust-region regularization and introduces **Likelihood-Gated Policy Optimization (LGPO)**:

1. **Separating ratio correction from trust-region stability**: Demonstrates empirically that dropping importance-sampling reweighting does not destabilize LLM RL, whereas removing trust-region step control triggers collapse—especially in strictly on-policy single-step regimes where $\pi_\theta / \pi_{\theta_{\mathrm{old}}} = 1$ renders ratio clipping vacuous.
2. **Old-policy-free likelihood gating**: Enforces a soft trust-region constraint directly through current-policy token likelihood gating, eliminating the forward pass and memory footprint needed to store or recompute $\pi_{\theta_{\mathrm{old}}}$.
3. **Unified stability across on-policy and multi-epoch regimes**: Remains active even on the first gradient update of strictly on-policy rollouts while matching GRPO peak accuracy in multi-update settings.

## Evaluation and evidence boundary

* **Reported scope**: Reduces wall-clock RL post-training time by ~18% on average relative to standard GRPO implementations that recompute old-policy likelihoods, while preventing training collapse in strictly on-policy LLM RL regimes where standard GRPO diverges.
* **Evidence boundary**: Analyzed and validated on autoregressive LLM RLVR post-training; severe asynchronous actor-learner staleness with large replay lag may still require explicit off-policy correction (`arXiv:2611.15404`).

## Sources and artifacts

* Paper: [arXiv:2611.15404](https://arxiv.org/abs/2611.15404)
