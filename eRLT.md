# eRLT: Efficient VLA Reinforcement Learning via Action-Relevant Token Routing

Learned token and layer routing extracts task-specific, action-relevant representations from a frozen VLA for sample-efficient online reinforcement learning.

First public date: 2026-10-02. Reviewed: 2026-11-06.

Classification: RL · real-world online learning · VLA representation routing.

Status: Preprint.

## Method

Instead of fixed compression of frozen VLA features, learned routing tokens aggregate visual-language features across multiple transformer depths and a lightweight layer router combines them into a compact RL token. The routing module is initialized from expert demonstrations and refined online with critic feedback for action-value estimation.

## Evidence and limits

Evaluation covers seven LIBERO and RoboTwin tasks plus physical USB connector and motherboard ribbon-cable insertion. Routing initialization still relies on expert demonstrations, and online refinement is evaluated on task-specific precision skills. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2610.00913).

[Project page](https://red0orange.github.io/eRLT_site/). Complete training-code availability was not independently verified.

[Back to the 2026 guide](2026.md).
