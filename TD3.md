# Addressing Function Approximation Error in Actor-Critic Methods (TD3)

First public date: 2018-02-26. Conference venue: ICML 2018.

Authors: Scott Fujimoto, Herke van Hoof, David Meger.

## Method summary

Deterministic continuous-control actor-critics such as [DDPG](DDPG.md) suffer from systematic value overestimation analogous to discrete $Q$-learning ([DDQN](DDQN.md)), amplified by function-approximation error accumulation across Bellman backups. **Twin Delayed Deep Deterministic Policy Gradient (TD3)** eliminates this instability via three coupled mechanisms: clipped double-$Q$ learning, delayed policy and target updates, and target policy smoothing regularization.

## Mathematical formulation

TD3 trains two independent critics $Q_{\theta_1}, Q_{\theta_2}$ alongside a deterministic actor $\pi_\phi(s)$. To prevent exploitation of sharp erroneous peaks in $Q_\theta$, TD3 adds clipped Gaussian smoothing noise to the target action and takes the pessimistic minimum across the twin target critics:

$$
\tilde{a}' = \operatorname{clip}\!\Big(\pi_{\phi^-}(s') + \operatorname{clip}(\epsilon, -c, c),\; a_{\min},\; a_{\max}\Big), \qquad \epsilon \sim \mathcal{N}(0, \sigma^2 I)
$$

$$
y_t = r_t + \gamma \min_{i \in \{1, 2\}} Q_{\theta_i^-}(s_{t+1}, \tilde{a}'), \qquad \nabla_\phi J(\phi) = \mathbb{E}_{s \sim \mathcal{D}}\!\left[\nabla_\phi \pi_\phi(s)\,\nabla_a Q_{\theta_1}(s, a)\big|_{a = \pi_\phi(s)}\right]
$$

Actor $\phi$ and target parameters $(\theta_1^-, \theta_2^-, \phi^-)$ are updated once every $d$ critic steps so deterministic policy gradients follow low-variance value estimates.

## Sources and artifacts

* Paper: [arXiv:1802.09477](https://arxiv.org/abs/1802.09477)
* Code: [https://github.com/sfujim/TD3](https://github.com/sfujim/TD3)
