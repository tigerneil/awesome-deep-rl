# MEND: RL For Flow Models via Proximal Velocity Matching

Reward post-training for flow-based image generators using accepted reward-gradient moves and velocity regression.

First public date: 2026-10-05. Reviewed: 2026-10-05.

Authors: Shreshth Saini, Neil Birkbeck, Yilin Wang, Balu Adsumilli, Alan C. Bovik.

Classification: RL · flow-model reward post-training · text-to-image generation.

Status: Preprint.

## Method

MEND caps rewards within each prompt group. Samples below the cap receive candidate moves along a differentiable reward gradient; a move is accepted only when its capped reward gain exceeds a quadratic displacement cost. The model regresses onto the resulting velocity targets without a KL penalty or frozen reference model.

## Mathematical formulation

Given a prompt group with reward cap $\tau_c$ and differentiable reward $R(x_1, c)$, samples below the cap propose a proximal reward-gradient move $\tilde{x}_1 = x_1 + \eta \nabla_{x_1} R(x_1, c)$ accepted iff its capped gain exceeds quadratic transport cost:

$$
x_1^* = \begin{cases} \tilde{x}_1, & \text{if } \min\!\big(R(\tilde{x}_1, c), \tau_c\big) - \min\!\big(R(x_1, c), \tau_c\big) > \frac{1}{2\alpha}\|\tilde{x}_1 - x_1\|_2^2, \\ x_1, & \text{otherwise.} \end{cases}
$$

The flow velocity network $v_\theta(x_t, t, c)$ then minimizes the proximal velocity-matching objective along linear interpolants $x_t = (1 - t)x_0 + t x_1^*$:

$$
\mathcal{L}_{\text{MEND}}(\theta) = \mathbb{E}_{t, x_0, x_1^*}\!\Big[\big\|v_\theta\big((1-t)x_0 + t x_1^*,\, t,\, c\big) - (x_1^* - x_0)\big\|_2^2\Big]
$$

## Evidence and limits

The paper evaluates image-generation reward post-training and compares MEND with Flow-GRPO, ReFL, and DiffusionNFT. The method requires a differentiable reward; it is not a general solution for arbitrary environment rewards. Findings are author-reported and have not been independently reproduced for this catalog.

## Sources and artifacts

[Paper](https://arxiv.org/abs/2610.05954) · [Official code](https://github.com/shreshthsaini/MEND-RL) · [Project page](https://shreshthsaini.github.io/MEND-RL/).

[Back to applications](README.md#applications).
