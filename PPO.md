# Proximal Policy Optimization Algorithms (PPO)

John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov

We propose a new family of policy gradient methods for reinforcement learning, which alternate between sampling data through interaction with the environment, and optimizing a "surrogate" objective function using stochastic gradient ascent. Whereas standard policy gradient methods perform one gradient update per data sample, we propose a novel objective function that enables multiple epochs of minibatch updates. The new methods, which we call proximal policy optimization (PPO), have some of the benefits of trust region policy optimization (TRPO), but they are much simpler to implement, more general, and have better sample complexity (empirically). Our experiments test PPO on a collection of benchmark tasks, including simulated robotic locomotion and Atari game playing, and we show that PPO outperforms other online policy gradient methods, and overall strikes a favorable balance between sample complexity, simplicity, and wall-time.

## Mathematical formulation

Let $\rho_t(\theta) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}$ denote the probability ratio and $\hat{A}_t$ denote the Generalized Advantage Estimator (GAE):

$$
\hat{A}_t^{\text{GAE}(\gamma,\lambda)} = \sum_{l=0}^{\infty} (\gamma\lambda)^l \delta_{t+l}^V, \qquad \delta_t^V = r_t + \gamma V_\phi(s_{t+1}) - V_\phi(s_t)
$$

PPO maximizes the clipped surrogate objective across multiple minibatch epochs without second-order Fisher-vector products:

$$
L^{\text{CLIP}}(\theta) = \hat{\mathbb{E}}_t\!\left[\min\!\Big(\rho_t(\theta)\hat{A}_t,\; \operatorname{clip}\big(\rho_t(\theta), 1 - \epsilon, 1 + \epsilon\big)\hat{A}_t\Big)\right]
$$

Combined with value-function regression $L_t^{\text{VF}}(\phi) = (V_\phi(s_t) - V_t^{\text{targ}})^2$ and entropy bonus $\mathcal{H}[\pi_\theta](s_t)$, the joint objective is $L_t^{\text{CLIP+VF+S}}(\theta, \phi) = \hat{\mathbb{E}}_t\!\big[L_t^{\text{CLIP}}(\theta) - c_1 L_t^{\text{VF}}(\phi) + c_2 \mathcal{H}[\pi_\theta](s_t)\big]$.

