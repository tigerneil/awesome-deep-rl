# TD-MPC2: Scalable, Robust World Models for Continuous Control

First public date: 2023-10-25. Conference venue: ICLR 2024 Spotlight.

Authors: Nicklas Hansen, Hao Su, Xiaolong Wang.

## Method summary

Combining the decoder-free latent value equivalence of [MuZero](MuZero.md) with continuous-action Model Predictive Path Integral (**MPPI**) trajectory optimization and a maximum-entropy policy prior ([SAC](SAC.md)), **TD-MPC2** learns an implicit `SimNorm`-constrained latent world model capable of controlling dozens of heterogeneous locomotion and manipulation embodiments within a single 317M-parameter multi-task world model without reconstructing pixels.

## Mathematical formulation

TD-MPC2 encodes observations into simplex-normalized latents $z_t = h_\theta(s_t, e)$ (with task embedding $e$), evolves latent dynamics $\hat{z}_{t+1} = d_\theta(z_t, a_t, e)$, and jointly trains reward $\hat{r}_\theta$, action-value ensemble $\hat{Q}_\theta$, and policy prior $p_\theta(a \mid z, e)$ over $H$ unrolled steps:

$$
\mathcal{L}(\theta) = \mathbb{E}_{(s,a,r,s')_{0:H} \sim \mathcal{B}}\!\left[\sum_{t=0}^{H} \lambda^t \Big(c_1 \|\hat{z}_{t+1} - \operatorname{sg}(z_{t+1})\|_2^2 + c_2 \operatorname{CE}(\hat{r}_t, r_t) + c_3 \operatorname{CE}(\hat{q}_t, q_t)\Big)\right]
$$

At decision time, TD-MPC2 performs derivative-free MPPI planning in latent space warm-started by samples from the MaxEnt prior $p_\theta$, selecting the first action of the trajectory distribution maximizing bootstrapped $H$-step return:

$$
J_{\text{MPPI}}(a_{t:t+H}) = \mathbb{E}\!\left[\sum_{h=0}^{H-1} \gamma^h \hat{r}_\theta(\hat{z}_{t+h}, a_{t+h}, e) + \gamma^H \hat{Q}_\theta(\hat{z}_{t+H}, a_{t+H}, e)\right]
$$

## Sources and artifacts

* Paper: [arXiv:2310.16828](https://arxiv.org/abs/2310.16828)
* Code: [https://github.com/nicklashansen/tdmpc2](https://github.com/nicklashansen/tdmpc2)
