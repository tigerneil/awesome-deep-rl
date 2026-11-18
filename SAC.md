# Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor (SAC)

First public date: 2018-01-04. Conference venue: ICML 2018.

Authors: Tuomas Haarnoja, Aurick Zhou, Pieter Abbeel, Sergey Levine.

## Method summary

On-policy algorithms ([TRPO](TRPO.md), [PPO](PPO.md)) require fresh rollouts at every update, whereas deterministic off-policy methods ([DDPG](DDPG.md)) are brittle to hyperparameters and exploration settings. **Soft Actor-Critic (SAC)** unifies off-policy experience replay with the maximum-entropy RL framework ([DEBP](DEBP.md), [PGSQL](PGSQL.md)), pairing clipped twin soft-$Q$ critics ([TD3](TD3.md)) with a reparameterized squashed-Gaussian actor and dual temperature auto-tuning.

## Mathematical formulation

SAC maximizes expected return augmented by policy Shannon entropy $\mathcal{H}\big(\pi(\cdot \mid s_t)\big) = \mathbb{E}_{a_t \sim \pi}[-\log \pi(a_t \mid s_t)]$ with temperature $\alpha > 0$:

$$
J_{\text{MaxEnt}}(\pi) = \sum_{t=0}^{\infty} \mathbb{E}_{(s_t, a_t) \sim \rho_\pi}\!\left[\gamma^t \Big(r(s_t, a_t) + \alpha\,\mathcal{H}\big(\pi(\cdot \mid s_t)\big)\Big)\right]
$$

Soft policy evaluation applies the contractive soft Bellman backup using twin target networks, while policy improvement minimizes KL divergence toward the Boltzmann distribution via the reparameterization $a_\theta(s, \xi) = \tanh(\mu_\theta(s) + \sigma_\theta(s) \odot \xi)$:

$$
y_t = r_t + \gamma\,\mathbb{E}_{a' \sim \pi_\theta(\cdot \mid s_{t+1})}\!\left[\min_{i \in \{1,2\}} Q_{\phi_i^-}(s_{t+1}, a') - \alpha \log \pi_\theta(a' \mid s_{t+1})\right]
$$

$$
\mathcal{L}_\pi(\theta) = \mathbb{E}_{s \sim \mathcal{D},\, \xi \sim \mathcal{N}(0,I)}\!\left[\alpha \log \pi_\theta\big(a_\theta(s,\xi) \mid s\big) - \min_{i \in \{1,2\}} Q_{\phi_i}\big(s, a_\theta(s,\xi)\big)\right]
$$

Dual temperature tuning updates $\alpha$ via $\mathcal{L}(\alpha) = \mathbb{E}_{a_t \sim \pi_\theta}\!\big[-\alpha(\log \pi_\theta(a_t \mid s_t) + \bar{\mathcal{H}})\big]$ to maintain a target entropy $\bar{\mathcal{H}}$.

## Sources and artifacts

* Paper: [arXiv:1801.01290](https://arxiv.org/abs/1801.01290)
* Follow-up (auto-tuned $\alpha$): [arXiv:1812.05905](https://arxiv.org/abs/1812.05905)
