# TwinRL: Digital Twin-Driven Reinforcement Learning for Real-World Robotic Manipulation

Digital twins support simulation warm-up followed by human-guided real-world RL for robot manipulation.

First public date: 2026-02-09. Reviewed: 2026-09-17.

Classification: RL · digital twins · sim-to-real.

Status: Paper; initial preprint date shown.

## Method

The pipeline combines synthetic demonstrations, critic-based learning in reconstructed scenes, and twin-guided human-in-the-loop refinement on the physical robot.

## Evidence and limits

Four real manipulation tasks test the pipeline. Reported out-of-distribution evaluation concerns held-out workspace regions, not arbitrary new skills. Reconstruction, human feedback, and real interaction remain costs. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2602.09023).

[Official repository](https://github.com/zhourui9813/TwinRL) includes offline code, assets, and data. Real-world RL training code was still marked coming soon at review time.

[Back to the 2026 guide](2026.md).
