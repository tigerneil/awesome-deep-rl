# VLaRL: Augmenting Vision-Language-Action Models with Simulation-Trained Latent-Conditioned Residual RL

Simulation-trained residual RL transfers to physical robots by conditioning on and aligning internal VLA latent representations rather than raw pixels.

First public date: 2026-09-25. Reviewed: 2026-11-06.

Classification: RL · residual policy · latent sim-to-real transfer.

Status: Preprint.

## Method

VLaRL freezes the base VLA and trains a residual policy in simulation conditioned on the VLA's internal vision-language latent representation. A lightweight latent mapper aligns simulation-derived latents toward the real-world latent distribution, enabling zero-shot physical deployment without online real-robot RL.

## Evidence and limits

The authors evaluate four contact-rich physical manipulation tasks across two VLA backbones. Transfer still requires constructing task-aligned simulation environments and remains bounded to residual corrections around the frozen base policy. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2609.30868).

Paper and HTML are available; public code repository was not established in this review.

[Back to the 2026 guide](2026.md).
