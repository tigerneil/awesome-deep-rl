# WoVR+: World Model as Reliable Simulator for Versatile VLA Policy Optimization with RL

An interface-aligned multi-view world model and stage-local imagined rollouts extend hallucination-aware RL to long-horizon VLA manipulation.

First public date: 2026-10-13. Reviewed: 2026-11-06.

Classification: RL · learned world models · long-horizon VLA post-training.

Status: Preprint.

## Method

WoVR+ aligns the world model with multi-view visual and proprioceptive VLA interfaces, applies chunk-wise exploration noise to preserve flow-policy exploration without action jitter, and uses stage-local imagined training with stage-entry resets and local horizons to bound compounding rollout errors.

## Evidence and limits

Evaluation covers RoboTwin simulation and six physical robot manipulation tasks, including multi-stage phone packaging. Stage-local training depends on stage-entry states and stage-specific reward definitions, and world-model fidelity remains bounded by training coverage. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2610.17922).

[Project page](https://youmo445.github.io/WoVR_Plus.github.io/) provides demonstration videos; full training-code availability was not established in this review.

[Back to the 2026 guide](2026.md).
