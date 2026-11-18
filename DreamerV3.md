# Mastering Diverse Domains through World Models (DreamerV3)

First public date: 2023-01-10. Journal venue: Nature (2025).

Authors: Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, Timothy Lillicrap.

## Method summary

Scaling RL across disparate domains traditionally required per-benchmark reward clipping, loss scaling, and replay tuning. **DreamerV3** trains a single Recurrent State-Space Model (**RSSM**) with **fixed hyperparameters** across over 150 tasks—including solving the Minecraft diamond challenge from scratch without human data—by combining categorical latent variables, KL balancing with free bits, `symlog` / `twohot` magnitude-invariant predictions, and percentile-normalized actor-critic updates in latent imagination.

## Mathematical formulation

Given deterministic recurrent state $h_t = f_\phi(h_{t-1}, z_{t-1}, a_{t-1})$ and categorical stochastic state $z_t$, the RSSM world model minimizes reconstruction, symlog-twohot reward/continuation losses, and stop-gradient-balanced KL divergence with free bits:

$$
\mathcal{L}_{\text{KL}}(\phi) = \beta_{\text{dyn}} \max\!\Big(1,\, D_{\text{KL}}\big[\operatorname{sg}(q_\phi(z_t \mid h_t, x_t)) \,\|\, p_\phi(z_t \mid h_t)\big]\Big) + \beta_{\text{rep}} \max\!\Big(1,\, D_{\text{KL}}\big[q_\phi(z_t \mid h_t, x_t) \,\|\, \operatorname{sg}(p_\phi(z_t \mid h_t))\big]\Big)
$$

Over $H$-step imagined latent trajectories $\hat{s}_\tau = (\hat{h}_\tau, \hat{z}_\tau)$ using `symlog` compression $\operatorname{symlog}(x) = \operatorname{sign}(x)\ln(|x| + 1)$, the actor $\pi_\theta$ normalizes $\lambda$-returns $R_\tau^\lambda$ by the exponential moving $5^{\text{th}}$–$95^{\text{th}}$ return percentile range $S = \max\!\big(1, \operatorname{Per}(R^\lambda, 95) - \operatorname{Per}(R^\lambda, 5)\big)$:

$$
\mathcal{L}_\pi(\theta) = -\sum_{\tau=t}^{t+H} \left[\operatorname{sg}\!\left(\frac{R_\tau^\lambda - v_\psi(\hat{s}_\tau)}{S}\right)\log \pi_\theta(\hat{a}_\tau \mid \hat{s}_\tau) + \eta\,\mathcal{H}\big(\pi_\theta(\cdot \mid \hat{s}_\tau)\big)\right]
$$

## Sources and artifacts

* Paper: [arXiv:2301.04104](https://arxiv.org/abs/2301.04104)
* Code: [https://github.com/danijar/dreamerv3](https://github.com/danijar/dreamerv3)
