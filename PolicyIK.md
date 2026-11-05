# PolicyIK: High-Precision Inverse Kinematics for Robot Arms with Reinforcement Learning

Goal-conditioned reinforcement learning trains closed-loop inverse-kinematics policies that reach and hold millimeter-level end-effector poses through a joint-position interface.

First public date: 2026-11-03. Reviewed: 2026-11-06.

Classification: RL · low-level robot control · high-precision inverse kinematics.

Status: Preprint.

## Method

PolicyIK updates joint-position references from pose feedback while observing the accumulated joint reference relative to measured joint angles so the controller retains steady-state offsets against gravity and finite gains. Coarse- and fine-scale pose errors paired with an error-dependent action gain resolve millimeter residuals, while progress and dwell rewards train both reaching and holding. Policies are trained with PPO in parallel simulation or directly on hardware with FlashSAC and hindsight goal relabeling.

## Evidence and limits

Evaluation covers simulated workspace reaching, direct off-policy training on physical OpenArm and xArm7 arms (1 mm and 0.2° tolerance), and executing π0.5 VLA end-effector commands in simulated pick-and-place. This addresses low-level pose tracking rather than high-level task planning or contact-rich force control. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2611.05372).

[Official code](https://github.com/Tinaliu0123/PolicyIK) was linked in the checked paper.

[Back to the 2026 guide](2026.md).
