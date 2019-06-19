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
