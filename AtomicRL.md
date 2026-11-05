# AtomicRL: Atomic Reinforcement Learning for Long-Horizon Robotic Manipulation

Subtask-gated credit assignment and bottleneck-aware exploration improve long-horizon VLA reinforcement learning in simulation and Real2Sim2Real transfer.

First public date: 2026-10-21. Reviewed: 2026-11-06.

Classification: RL · long-horizon manipulation · credit assignment and sim-to-real.

Status: Preprint.

## Method

Semantic-Aware Policy Optimization (SAPO) gates temporal-difference residuals at atomic subtask boundaries so later subtask failures do not contaminate credit for earlier completed subtasks. Bottleneck-Adaptive Target Exploration (BATE) focuses sampling on unmastered subtasks, and a Real2Sim2Real pipeline transfers simulation-refined policies to physical hardware.

## Evidence and limits

Experiments report gains over PPO across two VLA architectures on LIBERO-LONG, CALVIN ABC-D, and physical Real2Sim2Real tasks. The method relies on identifiable atomic subtask boundaries and simulated scene alignment for physical transfer. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2610.30097).

Paper and HTML are available; public code release was not established in this review.

[Back to the 2026 guide](2026.md).
