# Continuous Control with Deep Reinforcement Learning (DDPG)

Timothy P. Lillicrap, Jonathan J. Hunt, Alexander Pritzel, Nicolas Heess, Tom Erez, Yuval Tassa, David Silver, Daan Wierstra

We adapt the ideas underlying the success of Deep Q-Learning to the continuous action domain.
We present an actor-critic, model-free algorithm based on the deterministic policy gradient that can operate over continuous action spaces.
Using the same learning algorithm, network architecture and hyper-parameters, our algorithm robustly solves more than 20 simulated physics tasks, including classic problems such as cartpole swing-up, dexterous manipulation, legged locomotion and car driving.
Our algorithm is able to find policies whose performance is competitive with those found by a planning algorithm with full access to the dynamics of the domain and its derivatives.
We further demonstrate that for many of the tasks the algorithm can learn policies end-to-end: directly from raw pixel inputs.

## Mathematical formulation

DDPG maintains a deterministic actor $\mu(s \mid \theta^\mu)$ and action-value critic $Q(s, a \mid \theta^Q)$ alongside Polyak-averaged target networks $\theta' \leftarrow \tau \theta + (1 - \tau)\theta'$. The critic minimizes off-policy Bellman error over replay buffer $\mathcal{R}$:

$$
\mathcal{L}(\theta^Q) = \mathbb{E}_{(s_t, a_t, r_t, s_{t+1}) \sim \mathcal{R}}\!\left[\Big(r_t + \gamma\,Q\big(s_{t+1}, \mu(s_{t+1} \mid \theta^{\mu'}) \mid \theta^{Q'}\big) - Q(s_t, a_t \mid \theta^Q)\Big)^2\right]
$$

Applying the chain rule via Silver et al.'s Deterministic Policy Gradient theorem updates the actor along critic action-gradients:

$$
\nabla_{\theta^\mu} J \approx \mathbb{E}_{s_t \sim \rho^\beta}\!\left[\nabla_a Q(s, a \mid \theta^Q)\big|_{s=s_t,\, a=\mu(s_t)}\,\nabla_{\theta^\mu}\mu(s \mid \theta^\mu)\big|_{s=s_t}\right]
$$

