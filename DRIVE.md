# DRIVE: Diversity-Driven RL Fine-Tuning for VLA Generalization

Success-conditioned behavioral diversity rewards prevent mode collapse during VLA reinforcement learning and improve out-of-distribution manipulation.

First public date: 2026-10-08. Reviewed: 2026-11-06.

Classification: RL · VLA post-training · behavioral diversity and generalization.

Status: Preprint.

## Method

DRIVE groups rollouts collected under matched task conditions, aligns trajectories temporally, and computes an intrinsic reward from relative behavioral diversity among successful trajectories. This encourages coverage of distinct task-valid strategies without rewarding diverse failures or timing drift.

## Evidence and limits

The authors evaluate π0 and π0.5 backbones on LIBERO-Plus, ManiSkill3, RoboTwin 2.0, and a physical dual-arm AgileX PiPER-X platform under out-of-domain shifts. Because diversity is conditioned on task success, the base policy must already achieve non-zero success to supply varied positive rollouts. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2610.09943).

Paper and HTML are available; standalone repository release was not established in this review.

[Back to the 2026 guide](2026.md).
