# VLA-Precision: Asymmetric Co-Bootstrapping for Efficient Real-World Online RL of Vision-Language-Action Models

Real-robot VLA post-training couples human intervention with value calibration and a streaming training architecture for precision manipulation.

First public date: 2026-09-03. Reviewed: 2026-09-17.

Classification: RL · real-world online learning · VLA post-training.

Status: Preprint; revision checked: 2026-09-09.

## Method

Asymmetric Co-Bootstrapping combines rapid behavioral learning with return propagation and local preference ranking. ACoB-Stream reuses frozen model context to reduce training overhead.

## Evidence and limits

The paper evaluates nine chemistry manipulation tasks across four robot embodiments. Training is task-specific; joint multi-task training and longer bimanual sequences are identified as future work. Human interventions remain part of the training setup. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2609.04355).

[Project](https://vla-precision.github.io/) and [code repository](https://github.com/scy-v/VLA-Precision) are available. Repository presence does not establish independent reproduction.

[Back to the 2026 guide](2026.md).
