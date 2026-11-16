# Robust Reinforcement Learning for Continuous Control with Model Misspecification
> Daniel J. Mankowitz, Nir Levine, Rae Jeong, Abbas Abdolmaleki, Jost Tobias Springenberg, Timothy Mann, Todd Hester, Martin Riedmiller

## Abstract
We provide a framework for incorporating robustness – to perturbations in the transition dynamics which we refer to as model misspecification – into continuous control Reinforcement Learning (RL) algorithms. 

We specifically focus on incorporating robustness into a state-of-the-art continuous control RL algorithm called Maximum a-posteriori Policy Optimization (MPO). 

We achieve this by learning a policy that optimizes for a worst case, entropy-regularized, expected return objective and derive a corresponding robust entropy-regularized Bellman contraction operator. 

In addition, we introduce a less conservative, soft-robust, entropy-regularized objective with a corresponding Bellman operator. 

We show that both, robust and soft-robust policies, outperform their non-robust counterparts in nine Mujoco domains with environment perturbations. 

Finally, we present multiple investigative experiments that provide a deeper insight into the robustness framework; including an adaptation to another continuous control RL algorithm as well as comparing this approach to domain randomization. 

Performance videos can be found online at https://sites.google.com/view/robust-rl.

## Mathematical formulation

Under transition uncertainty set $\mathcal{P}(s, a)$, Robust-MPO defines a $\gamma$-contractive **robust entropy-regularized Bellman operator** for worst-case model misspecification:

$$
\mathcal{T}_{\mathcal{P}}^\pi Q(s, a) = r(s, a) + \gamma \inf_{p \in \mathcal{P}(s, a)} \mathbb{E}_{s' \sim p}\!\left[\mathbb{E}_{a' \sim \pi(\cdot \mid s')}\big[Q(s', a')\big] - \tau\, D_{\text{KL}}\!\big(\pi(\cdot \mid s')\,\big\|\,\bar{\pi}(\cdot \mid s')\big)\right]
$$

Policy improvement alternates a non-parametric variational **E-step** under KL temperature $\eta > 0$ with a parametric **M-step** trust-region projection:

$$
q(a \mid s) \propto \pi_{\theta_k}(a \mid s)\exp\!\left(\frac{Q_\psi^{\text{rob}}(s, a)}{\eta}\right), \qquad \theta_{k+1} = \arg\max_{\theta}\; \mathbb{E}_{s \sim \mathcal{D},\, a \sim q(\cdot \mid s)}\!\big[\log \pi_\theta(a \mid s)\big]
$$

