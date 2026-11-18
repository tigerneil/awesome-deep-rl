# Conservative Q-Learning for Offline Reinforcement Learning (CQL)

First public date: 2020-06-08. Conference venue: NeurIPS 2020.

Authors: Aviral Kumar, Aurick Zhou, George Tucker, Sergey Levine.

## Method summary

When standard off-policy RL ([DQN](DQN.md), [SAC](SAC.md)) is trained purely on a static offline dataset $\mathcal{D}$ without online interaction, Bellman maximization queries out-of-distribution (**OOD**) actions where function-approximation errors produce severe optimistic value divergence. **Conservative Q-Learning (CQL)** augments the Bellman error with a simple value regularizer that pushes down $Q$-values on unseen high-value actions while pushing up $Q$-values on in-dataset transitions, guaranteeing that the learned $Q$-function lower-bounds the true policy value $V^\pi(s)$ in expectation.

## Mathematical formulation

In its canonical entropy-regularized `CQL(H)` form, CQL solves a log-sum-exp penalized empirical Bellman regression at iteration $k+1$:

$$
\hat{Q}^{k+1} \leftarrow \arg\min_{Q}\; \alpha\,\mathbb{E}_{s \sim \mathcal{D}}\!\left[\log \sum_{a \in \mathcal{A}} \exp Q(s, a) - \mathbb{E}_{a \sim \hat{\pi}_\beta(\cdot \mid s)}\!\big[Q(s, a)\big]\right] + \frac{1}{2}\,\mathbb{E}_{(s, a, r, s') \sim \mathcal{D}}\!\left[\big(Q(s, a) - \hat{\mathcal{B}}^\pi \hat{Q}^k(s, a)\big)^2\right]
$$

For sufficiently large conservative weight $\alpha > 0$, CQL guarantees pessimistic policy evaluation $\mathbb{E}_{s \sim d^{\pi}(s),\, a \sim \pi(\cdot \mid s)}[\hat{Q}^\pi(s, a)] \le V^\pi(s)$, enabling safe policy improvement without explicit behavior-policy density estimation.

## Sources and artifacts

* Paper: [arXiv:2006.04779](https://arxiv.org/abs/2006.04779)
* Code: [https://github.com/aviralkumar2907/CQL](https://github.com/aviralkumar2907/CQL)
