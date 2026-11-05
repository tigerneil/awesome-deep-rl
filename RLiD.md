# RLiD: Reinforcement Learning in the Decision Plane for Language Agents and LLMs

Decision-plane RL optimizes action-option probabilities in a single forward pass and distills the resulting trajectories into generative language models.

First public date: 2026-11-02. Reviewed: 2026-11-06.

Classification: RL · language agents · decision-plane policy optimization.

Status: Preprint.

## Method

RLiD compiles observations, compact memory, and a labeled action menu into the prompt so a large decision model selects an executable action without autoregressive token generation or action-parsing failures. Marginalizing over surface-form phrasing removes realization variance during RL updates, and trained decision policies are subsequently distilled into generative LLMs.

## Evidence and limits

Evaluation covers ALFWorld, ARC, Countdown, and Sokoban, showing faster rollouts and higher ALFWorld success than token-level RL baselines. Decision-plane training requires compiling candidate actions into a discrete menu, so it does not directly replace open-ended text or code synthesis during rollout. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2611.02455).

Paper and HTML are available; standalone repository release was not established in this review.

[Back to the 2026 guide](2026.md).
