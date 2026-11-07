# Rubric Curriculum RL (RcRL): Exploiting the Generation-Verification Gap in Non-Verifiable Domains

First public date: 2026-11-04 (arXiv v1). Conference venue: ICML 2026.

Authors: Sumeet Ramesh Motwani, Tejas Krishnan, Alistair Letcher, Charles London, Suhaas Bhat, Huitian Jiao, Philip Torr, Riashat Islam.

Classification: 2026 · Agent RL (ICML 2026).

## Method summary

Extending reinforcement learning with verifiable rewards (RLVR) to open-ended, non-verifiable domains is hindered by reward hacking against static rubric judges. Rubric Curriculum RL (RcRL) exploits the generation-verification gap without human annotations or stronger teacher models:

1. **Pairwise rollout preferences under structured rubrics**: Replaces noisy absolute scalar scores with pairwise comparisons across on-policy rollouts evaluated against explicit rubric dimensions.
2. **Non-stationary rubric curriculum**: Progressively schedules and reweights rubric criteria as training advances, preventing the policy from collapsing onto superficial judge heuristics and preserving output diversity past 1,000 optimization steps.

## Evaluation and evidence boundary

* **Reported scope**: On open-ended creative writing, RcRL reports a 70.5% human win rate over the base model; on HealthBench, it improves by +14.6% on the full set and +25.4% on the consensus subset over static-rubric and RL baselines.
* **Evidence boundary**: Evaluates language generation and domain reasoning under rubric-based LLM judges; does not provide formal safety verification when the judge itself shares blind spots with the policy.

## Sources and artifacts

* Paper: [arXiv:2611.06244](https://arxiv.org/abs/2611.06244)
