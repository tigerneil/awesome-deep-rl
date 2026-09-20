# FMAPPO: Learning Multi-Agent Task Assignment and Navigation in the Factory

Decentralized multi-agent RL transfers task assignment and navigation policies from simulation to physical mobile robots; the real experiments disable the robot arms.

First public date: 2026-09-13. Reviewed: 2026-09-17.

Classification: RL · sim-to-real multi-robot coordination.

Status: Preprint.

## Method

Feature-fusion MAPPO combines 2D LiDAR with task state. A simulation-to-ROS2 deployment pipeline tests decentralized coordination and sensitivity to command update frequency.

## Evidence and limits

The authors compare policies in simulation and demonstrate physical multi-robot navigation. Arms are disabled, so this is not evidence of learned physical manipulation or complete autonomous machine tending. Safety scores and observed collisions are evaluation outcomes, not a safety guarantee. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2609.14567).

The paper links demonstration videos; training-code availability was not established in this review.

[Back to the 2026 guide](2026.md).
