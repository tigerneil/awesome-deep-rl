# Offline Reinforcement Learning with Implicit Q-Learning (IQL)

First public date: 2021-10-12. Conference venue: ICLR 2022.

Authors: Ilya Kostrikov, Ashvin Nair, Sergey Levine.

## Method summary

Unlike [CQL](CQL.md), which penalizes sampled out-of-distribution actions, **Implicit Q-Learning (IQL)** completely avoids querying any action outside the offline dataset $\mathcal{D}$ during critic training. By fitting an asymmetric **expectile regression** state-value function $V_\psi(s)$ exclusively over dataset actions, IQL approximates the in-support maximum of $Q_\theta(s, a)$ and extracts the policy via Advantage-Weighted Regression (`AWR`), enabling stable multi-step dynamic programming and seamless offline-to-online fine-tuning.

## Mathematical formulation

Let $L_2^\tau(u) = |\tau - \mathbb{I}(u < 0)|\,u^2$ denote the asymmetric $\tau$-expectile loss for $\tau \in (0.5, 1)$. IQL alternates completely in-sample value expectile regression with SARSA-style $Q$-regression:

$$
\mathcal{L}_V(\psi) = \mathbb{E}_{(s, a) \sim \mathcal{D}}\!\Big[L_2^\tau\!\big(Q_{\theta^-}(s, a) - V_\psi(s)\big)\Big], \qquad \mathcal{L}_Q(\theta) = \mathbb{E}_{(s, a, r, s') \sim \mathcal{D}}\!\Big[\big(r + \gamma V_\psi(s') - Q_\theta(s, a)\big)^2\Big]
$$

As $\tau \to 1$, $V_\psi(s) \to \max_{a \in \operatorname{supp}(\pi_\beta(\cdot \mid s))} Q^*(s, a)$. The actor $\pi_\phi$ is extracted without critic backpropagation via advantage-weighted behavioral cloning with inverse temperature $\beta > 0$:

$$
\mathcal{L}_\pi(\phi) = -\mathbb{E}_{(s, a) \sim \mathcal{D}}\!\left[\exp\!\Big(\beta\big(Q_{\theta^-}(s, a) - V_\psi(s)\big)\Big)\log \pi_\phi(a \mid s)\right]
$$

## Sources and artifacts

* Paper: [arXiv:2110.06169](https://arxiv.org/abs/2110.06169)
* Code: [https://github.com/ikostrikov/implicit_q_learning](https://github.com/ikostrikov/implicit_q_learning)
