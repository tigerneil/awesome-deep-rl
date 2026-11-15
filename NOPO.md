# NOPO: Negative-Only Policy Optimization for One-Sided Verifiable Rewards

First public date: 2026-11-12 (arXiv v1). Conference venue: NeurIPS 2026 Spotlight.

Authors: Jiacheng Xu, Shuo He, Fuxiang Zhang, Chaojie Wang, Bo An.

Classification: 2026 · Agent RL (NeurIPS 2026 Spotlight).

## Method summary

Standard Reinforcement Learning with Verifiable Rewards (RLVR) assumes symmetric verification, yet realistic checkers—partial unit tests, syntax/type linters, formal constraint checks, and LLM self-verifiers—typically exhibit **one-sided verifiability (OSV)**: falsified candidates are guaranteed errors, whereas non-falsified candidates remain unlabeled mixtures containing false-positive shortcuts. NOPO updates policies asymmetrically under OSV:

1. **Strict negative-only policy updates**: Treats non-falsified rollouts as unlabeled rather than rewarding them directly, eliminating positive reinforcement of partial-check shortcuts.
2. **Reference-relative negative suppression**: Applies a reference-anchored suppression loss exclusively on trusted verified negatives, naturally self-attenuating as error likelihood drops relative to the reference policy.
3. **Group-level non-falsified support adapter**: Scales per-prompt negative updates by the empirical fraction of non-falsified responses in the sampled group so probability mass redistributes smoothly across plausible candidates rather than collapsing when valid solutions are rare.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated under partial unit tests, constraint checkers, and self-verification across code generation, logical reasoning, and mathematics benchmarks without oracle verifiers, improving `pass@k` scaling and cross-benchmark transfer over symmetric GRPO/RLVR baselines that overfit false positives.
* **Evidence boundary**: Requires a high-precision falsifier (low false-negative rate on genuinely valid solutions) and sufficient initial base-model support on valid responses; evaluated on LLM code, math, and logic tasks rather than physical control (`arXiv:2611.17287`).

## Sources and artifacts

* Paper: [arXiv:2611.17287](https://arxiv.org/abs/2611.17287)
