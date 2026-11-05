# CRONOS: Benchmarking Non-Episodic Reinforcement Learning for Robotic Manipulation

A shared-scene simulation benchmark studies how pretrained VLA policies behave under non-episodic multi-task RL and infrequent scene resets.

First public date: 2026-11-03. Reviewed: 2026-11-06.

Classification: Benchmark · non-episodic robot RL · VLA post-training evaluation.

Status: Preprint.

## Method

Built on ManiSkill3 and SimplerEnv extensions, CRONOS defines 16 pick-and-place tasks across 4 shared scenes where each task starts from the scene state left by the previous rollout. The study evaluates OpenVLA and SpatialVLA under varying reset intervals and tests targeted reset strategies such as automatic end-effector resets and unrecoverable-state resets.

## Evidence and limits

Experiments are conducted in physics simulation rather than on physical hardware. The benchmark shows that naive non-episodic VLA fine-tuning collapses under object dispersion and pose drift, whereas targeted resets recover training efficiency and improve robustness to cluttered layouts. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2611.05080).

Paper and HTML are available; check the paper record for benchmark code release updates.

[Back to the 2026 guide](2026.md).
