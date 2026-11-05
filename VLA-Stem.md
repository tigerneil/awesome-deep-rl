# VLA-Stem: A Lightweight Safety Mechanism for Vision-Language-Action Models via Reinforcement Learning

A reflex-inspired RL policy adapts frozen VLA action chunks into collision-free motion references under static and dynamic obstacles.

First public date: 2026-10-28. Reviewed: 2026-11-06.

Classification: RL · safe robot execution · VLA trajectory modulation.

Status: Preprint.

## Method

Without modifying the underlying VLA weights, VLA-Stem converts predicted action chunks into spatial motion references and conditions a lightweight policy on proprioception and local obstacle observations. Teacher-student distillation and curriculum learning train the policy to adjust trajectory geometry and execution timing while preserving task intent.

## Evidence and limits

The authors evaluate six constrained simulation settings and physical obstacle-avoidance experiments. Because VLA-Stem modulates local trajectories around a fixed VLA reference, it does not replace high-level semantic replanning when an obstacle completely invalidates the task plan. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2610.37378).

Paper and HTML are available; standalone training-code release was not established in this review.

[Back to the 2026 guide](2026.md).
