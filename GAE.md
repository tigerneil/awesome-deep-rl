# High-Dimensional Continuous Control Using Generalized Advantage Estimation (GAE)

First public date: 2015-06-08. Conference venue: ICLR 2016.

Authors: John Schulman, Philipp Moritz, Sergey Levine, Michael Jordan, Pieter Abbeel.

## Method summary

Policy gradient estimators face an acute bias–variance trade-off when assigning credit over long horizons: Monte Carlo returns are unbiased but suffer high variance, while one-step TD residuals have low variance at the cost of critic bias. **Generalized Advantage Estimation (GAE)** introduces an exponentially weighted average of $k$-step advantage estimators analogous to $\operatorname{TD}(\lambda)$, providing explicit two-parameter $(\gamma, \lambda)$ control over variance reduction in [TRPO](TRPO.md), [PPO](PPO.md), and continuous-control actor-critics.

## Mathematical formulation

Define the one-step Bellman temporal-difference residual of a learned state-value baseline $V_\phi$ as $\delta_t^V = r_t + \gamma V_\phi(s_{t+1}) - V_\phi(s_t)$. The $\operatorname{GAE}(\gamma, \lambda)$ estimator blends $k$-step advantages $\hat{A}_t^{(k)} = \sum_{l=0}^{k-1} \gamma^l \delta_{t+l}^V$ with geometric weights $(1-\lambda)\lambda^{k-1}$:

$$
\hat{A}_t^{\text{GAE}(\gamma,\lambda)} = (1 - \lambda)\sum_{k=1}^{\infty} \lambda^{k-1} \hat{A}_t^{(k)} = \sum_{l=0}^{\infty} (\gamma\lambda)^l \delta_{t+l}^V
$$

At $\lambda = 0$, $\hat{A}_t^{\text{GAE}(\gamma,0)} = \delta_t^V$ recovers high-bias, low-variance one-step TD; at $\lambda = 1$, $\hat{A}_t^{\text{GAE}(\gamma,1)} = \sum_{l=0}^{\infty} \gamma^l r_{t+l} - V_\phi(s_t)$ recovers unbiased Monte Carlo returns minus baseline.

## Sources and artifacts

* Paper: [arXiv:1506.02438](https://arxiv.org/abs/1506.02438)
