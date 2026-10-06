# MEND: RL For Flow Models via Proximal Velocity Matching

Reward post-training for flow-based image generators using accepted reward-gradient moves and velocity regression.

First public date: 2026-10-05. Reviewed: 2026-10-05.

Authors: Shreshth Saini, Neil Birkbeck, Yilin Wang, Balu Adsumilli, Alan C. Bovik.

Classification: RL · flow-model reward post-training · text-to-image generation.

Status: Preprint.

## Method

MEND caps rewards within each prompt group. Samples below the cap receive candidate moves along a differentiable reward gradient; a move is accepted only when its capped reward gain exceeds a quadratic displacement cost. The model regresses onto the resulting velocity targets without a KL penalty or frozen reference model.

## Evidence and limits

The paper evaluates image-generation reward post-training and compares MEND with Flow-GRPO, ReFL, and DiffusionNFT. The method requires a differentiable reward; it is not a general solution for arbitrary environment rewards. Findings are author-reported and have not been independently reproduced for this catalog.

## Sources and artifacts

[Paper](https://arxiv.org/abs/2610.05954) · [Official code](https://github.com/shreshthsaini/MEND-RL) · [Project page](https://shreshthsaini.github.io/MEND-RL/).

[Back to applications](README.md#applications).
