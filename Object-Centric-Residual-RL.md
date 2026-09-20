# Object-Centric Residual RL for Zero-Shot Sim-to-Real VLA Enhancement

A simulation-trained correction policy improves a frozen VLA on a physical robot without real-world RL fine-tuning.

First public date: 2026-06-17. Reviewed: 2026-09-17.

Classification: RL · residual policy · sim-to-real.

Status: Preprint and official research release.

## Method

A TD3 residual observes object poses, proprioception, and the base action rather than raw images. The learned correction is added to the frozen VLA at deployment.

## Evidence and limits

The authors evaluate five physical tasks on a Franka Research 3 with 20 real trials per task. Manually specified objects and pose tracking are needed; severe occlusion, clutter, and states far outside base-policy coverage remain limitations. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2606.18953).

[Microsoft Research project](https://www.microsoft.com/en-us/research/articles/object-centric-residual-rl/). No implementation repository was linked in the checked sources.

[Back to the 2026 guide](2026.md).
