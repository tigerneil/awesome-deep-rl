# HaWMPO: Hallucination-Aware World Model-based Policy Optimization for Generalist Robot Policy

A reliability-aware world-model RL method downweights misleading imagined action chunks during VLA post-training.

First public date: 2026-09-09. Reviewed: 2026-09-17.

Classification: RL · learned world models · VLA post-training.

Status: Preprint.

## Method

An action-conditioned model scores hallucinations in generated image sequences. A Reward-Soft mechanism incorporates these scores into group-relative policy optimization.

## Evidence and limits

Evaluation covers LIBERO simulation and two physical manipulation tasks on a G1 robot. These results do not establish general humanoid locomotion or robustness to arbitrary world-model errors. The reliability estimator is itself learned. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2609.09941).

Paper and HTML are available. No implementation release was established from the checked paper.

[Back to the 2026 guide](2026.md).
