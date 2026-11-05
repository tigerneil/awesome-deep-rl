# FIND: Agentic Real-World Reinforcement Learning for Self-Improving VLA Models

A vision-language agent selects feasible practice tasks and evaluates outcomes in a persistent workspace to drive residual off-policy RL without manual resets.

First public date: 2026-09-25. Reviewed: 2026-11-06.

Classification: RL · autonomous real-world practice · residual VLA post-training.

Status: Preprint; revision checked: 2026-10-01.

## Method

Instead of resetting to a fixed initial state after every episode, FIND treats the resulting scene as the starting state for the next practice attempt. A vision-language agent identifies feasible tasks from a predefined library, prioritizes tasks with lower recent success rates, and scores outcomes from paired pre- and post-execution images while a residual off-policy RL learner refines a frozen π0.5 VLA.

## Evidence and limits

Across eight physical manipulation tasks, a representative 6-hour run completes 456 autonomous episodes with 30 manual scene-recovery interventions and no human reward labels. Autonomous practice remains bounded to a predefined task library, and occasional human recovery is still required when objects drop into unrecoverable poses. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2609.32069).

Paper and HTML are available; standalone training-code release was not established in this review.

[Back to the 2026 guide](2026.md).
