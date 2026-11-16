# Playing Atari with Deep Reinforcement Learning (DQN)

Volodymyr Mnih, Koray Kavukcuoglu, David Silver, Alex Graves, Ioannis Antonoglou, Daan Wierstra, Martin Riedmiller — DeepMind Technologies

We present the first deep learning model to successfully learn control policies directly
from high-dimensional sensory input using reinforcement learning. The
model is a convolutional neural network, trained with a variant of Q-learning,
whose input is raw pixels and whose output is a value function estimating future
rewards. We apply our method to seven Atari 2600 games from the Arcade Learning
Environment, with no adjustment of the architecture or learning algorithm. We
find that it outperforms all previous approaches on six of the games and surpasses
a human expert on three of them.

## Mathematical formulation

DQN approximates the optimal action-value function $Q^*(s, a) = \max_\pi \mathbb{E}\!\left[\sum_{k=0}^{\infty} \gamma^k r_{t+k} \mid s_t = s, a_t = a, \pi\right]$ with a convolutional network $Q(s, a; \theta)$ trained over experience-replay transitions $(s, a, r, s') \sim \mathcal{D}$ using a periodically updated target parameter vector $\theta^-$:

$$
\mathcal{L}_i(\theta_i) = \mathbb{E}_{(s, a, r, s') \sim \mathcal{U}(\mathcal{D})}\!\left[\Big(r + \gamma \max_{a' \in \mathcal{A}} Q(s', a'; \theta_i^-) - Q(s, a; \theta_i)\Big)^2\right]
$$

Differentiating with respect to the online network weights $\theta_i$ yields the semi-gradient update:

$$
\nabla_{\theta_i}\mathcal{L}_i(\theta_i) = \mathbb{E}_{(s, a, r, s') \sim \mathcal{U}(\mathcal{D})}\!\left[\Big(Q(s, a; \theta_i) - y_i\Big)\,\nabla_{\theta_i} Q(s, a; \theta_i)\right], \qquad y_i = r + \gamma \max_{a'} Q(s', a'; \theta_i^-)
$$

