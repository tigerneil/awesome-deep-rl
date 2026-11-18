# World Models

First public date: 2018-03-27. Conference venue: NeurIPS 2018.

Authors: David Ha, Jürgen Schmidhuber.

## Method summary

Inspired by human cognitive predictive models, **World Models** decomposes visual RL into three compact modules: a Variational Autoencoder (**V**) that compresses high-dimensional image frames into latent vectors $z_t$, a Mixture Density Network RNN (**M**, `MDN-RNN`) that predicts stochastic latent transitions $p(z_{t+1} \mid a_t, z_t, h_t)$, and a compact linear controller (**C**) optimized entirely inside hallucinated ("dream") rollouts via Covariance Matrix Adaptation Evolution Strategy (`CMA-ES`)—inaugurating the modern latent-imagination lineage culminating in [DreamerV3](DreamerV3.md) and 2026 embodied world models ([K-PWM](K-PWM.md), [LCVN](LCVN.md), [WoVR+](WoVR-Plus.md)).

## Mathematical formulation

Frame observations $x_t$ are encoded via $q_\phi(z_t \mid x_t) = \mathcal{N}(\mu_\phi(x_t), \Sigma_\phi(x_t))$, while the recurrent world model (`MDN-RNN`) parameterizes multimodal latent transitions as a $K$-component Gaussian mixture conditioned on hidden state $h_t$:

$$
p_\psi(z_{t+1} \mid a_t, z_t, h_t) = \sum_{k=1}^{K} \pi_k(z_t, h_t, a_t)\,\mathcal{N}\!\Big(z_{t+1} \;\Big|\; \mu_k(z_t, h_t, a_t),\, \tau\,\sigma_k^2(z_t, h_t, a_t) I\Big)
$$

where sampling temperature $\tau \ge 1$ inflates transition uncertainty during imagined training to prevent controller $a_t = W_c [z_t; h_t] + b_c$ from exploiting deterministic model flaws before zero-shot deployment in the true environment.

## Sources and artifacts

* Paper: [arXiv:1803.10122](https://arxiv.org/abs/1803.10122)
* Interactive article: [https://worldmodels.github.io/](https://worldmodels.github.io/)
