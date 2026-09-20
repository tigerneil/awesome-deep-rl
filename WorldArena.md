# WorldArena: A Unified Benchmark for Evaluating Perception and Functional Utility of Embodied World Models

An embodied world-model benchmark measures functional usefulness alongside video quality; it is evaluation infrastructure rather than an RL algorithm.

First public date: 2026-02-09. Reviewed: 2026-09-17.

Classification: Benchmark · embodied world models · RL-adjacent.

Status: Preprint; original February version.

## Method

The benchmark evaluates models as synthetic-data generators, policy evaluators, and action planners. It tests whether perceptual quality predicts usefulness for embodied tasks.

## Evidence and limits

The initial paper uses RoboTwin 2.0 Clean-50 simulated manipulation. Functional scores also depend on downstream policy, inverse-dynamics, and judging components. Later WorldArena 2.0 extensions should not be attributed to the February paper. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2602.08971).

[Project](https://world-arena.ai/) and [code](https://github.com/tsinghua-fib-lab/WorldArena). The repository records the code/leaderboard release on February 13, 2026.

[Back to the 2026 guide](2026.md).
