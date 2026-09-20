# WorldSample: Closed-loop Real-robot RL with World Modelling

A task-adapted video world model augments real robot experience with synthetic transitions for online reinforcement learning.

First public date: 2026-07-02. Reviewed: 2026-09-17.

Classification: RL · real-world online learning · world models.

Status: Preprint.

## Method

Policy-Paced Learning controls when and which generated experience is used for policy updates. Real interaction grounds the learned simulator; imagined data complements rather than replaces that interaction.

## Evidence and limits

The study uses five manipulation task categories on a Galaxea A1X arm, with demonstrations and human intervention. Training is single-task in relatively fixed scenes; broad scene and task generalization remains open. Numerical summaries differ between the abstract and main text, so this note does not repeat a headline gain. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2607.02431).

[Project](https://xxreinsno.github.io/worldsample/). Both RL framework and world-model releases were marked coming soon when reviewed.

[Back to the 2026 guide](2026.md).
