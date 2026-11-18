# Generative Adversarial Imitation Learning & Motion-Capture Adversarial Control (GAIL)

First public date: 2016-06-10 (GAIL) / 2017-07-07 (Motion-Capture GAIL). Conference venue: NeurIPS 2016.

Authors: Jonathan Ho, Stefano Ermon (GAIL); Josh Merel, Yuval Tassa, Dhruva TB, Sriram Srinivasan, Jay Lemmon, Ziyu Wang, Greg Wayne, Nicolas Heess (Motion-Capture Adversarial Imitation).

## Method summary

Classical Inverse Reinforcement Learning recovers an explicit cost function inside an expensive nested RL loop. **Generative Adversarial Imitation Learning (GAIL)** proves that causal-entropy-regularized IRL is dual to occupancy-measure matching, directly training a policy $\pi_\theta$ via [TRPO](TRPO.md) or [PPO](PPO.md) against an adversarial discriminator $D_\omega$—extended by Merel et al. (2017) to state-only partial observations for human motion-capture behaviors without expert action labels, and later refined off-policy in [OP-GAIL](OP-GAIL.md) and embodied whole-body priors ([dmimic](dmimic.md), [HLO-AMP](HLO-AMP.md)).

## Mathematical formulation

Let $\rho_\pi(s, a) = \sum_{t=0}^\infty \gamma^t P(s_t = s, a_t = a \mid \pi)$ denote the discounted state-action occupancy measure. GAIL solves the saddle-point objective between policy $\pi_\theta$ and discriminator $D_\omega : \mathcal{S} \times \mathcal{A} \to (0, 1)$:

$$
\min_{\theta} \max_{\omega}\; \mathbb{E}_{(s, a) \sim \rho_{\pi_\theta}}\!\big[\log D_\omega(s, a)\big] + \mathbb{E}_{(s, a) \sim \rho_{\pi_E}}\!\big[\log\!\big(1 - D_\omega(s, a)\big)\big] - \lambda \mathcal{H}(\pi_\theta)
$$

At optimal $D^*$, minimizing the policy objective minimizes the Jensen–Shannon divergence $D_{\text{JS}}(\rho_{\pi_\theta} \,\|\, \rho_{\pi_E}) - \lambda \mathcal{H}(\pi_\theta)$ using surrogate RL reward $r_\omega(s, a) = -\log D_\omega(s, a)$. For motion-capture imitation from observations alone, the discriminator operates on observation transitions $D_\omega(o_t, o_{t+1})$.

## Sources and artifacts

* GAIL (Ho & Ermon, NeurIPS 2016): [arXiv:1606.03476](https://arxiv.org/abs/1606.03476)
* Adversarial Imitation from Motion Capture (Merel et al., 2017): [arXiv:1707.02201](https://arxiv.org/abs/1707.02201)
