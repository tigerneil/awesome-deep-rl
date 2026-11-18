# QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning

First public date: 2018-03-30. Conference venue: ICML 2018.

Authors: Tabish Rashid, Mikayel Samvelyan, Christian Schroeder de Witt, Gregory Farquhar, Jakob Foerster, Shimon Whiteson.

## Method summary

Centralized Training with Decentralized Execution (**CTDE**) requires individual greedy action selections to remain consistent with the centralized joint action-value function $Q_{\text{tot}}$—a property known as **Individual-Global-Max (IGM)**. Whereas VDN restricts $Q_{\text{tot}}$ to an additive sum, **QMIX** represents $Q_{\text{tot}}$ as a nonlinear monotonic mixing network whose weights are conditioned on global state $s$ via hypernetworks, establishing a foundational cooperative MARL baseline on the StarCraft Multi-Agent Challenge (`SMAC`).

## Mathematical formulation

Let $\tau_a$ and $u_a$ denote agent $a$'s local action-observation history and action, with utility $Q_a(\tau_a, u_a; \theta_a)$. QMIX guarantees the IGM consistency condition $\arg\max_{\mathbf{u}} Q_{\text{tot}}(\boldsymbol{\tau}, \mathbf{u}, s) = \big(\arg\max_{u_1} Q_1(\tau_1, u_1), \dots, \arg\max_{u_n} Q_n(\tau_n, u_n)\big)$ by enforcing non-negative partial derivatives via absolute-valued hypernetwork weights $W_k(s) \ge 0$:

$$
\frac{\partial Q_{\text{tot}}(\boldsymbol{\tau}, \mathbf{u}, s)}{\partial Q_a(\tau_a, u_a)} \ge 0, \qquad \forall a \in \{1, \dots, n\}
$$

$$
\mathcal{L}(\theta) = \mathbb{E}_{(\boldsymbol{\tau}, \mathbf{u}, s, r, \boldsymbol{\tau}', s') \sim \mathcal{D}}\!\left[\Big(r + \gamma \max_{\mathbf{u}'} Q_{\text{tot}}(\boldsymbol{\tau}', \mathbf{u}', s'; \theta^-) - Q_{\text{tot}}(\boldsymbol{\tau}, \mathbf{u}, s; \theta)\Big)^2\right]
$$

## Sources and artifacts

* Paper: [arXiv:1803.11485](https://arxiv.org/abs/1803.11485)
* Code: [https://github.com/oxwhirl/pymarl](https://github.com/oxwhirl/pymarl)
