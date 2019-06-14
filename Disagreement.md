# Self-Supervised Exploration via Disagreement
> Deepak Pathak, Dhiraj Gandhi, Abhinav Gupta

## Abstract
Efficient exploration is a long-standing problem in sensorimotor learning. 

Major advances have been demonstrated in noise-free, non-stochastic domains such as video games and simulation.

However, most of these formulations either get stuck in environments with stochastic dynamics or are too inefficient to be scalable to real robotics setups. 

In this paper, we propose a formulation for exploration inspired by the work in active learning literature. 

Specifically, we train an ensemble of dynamics models and incentivize the agent to explore such that the disagreement of those ensembles is maximized. 

This allows the agent to learn skills by exploring in a self-supervised manner without any external reward. 

Notably, we further leverage the disagreement objective to optimize the agent’s policy in a differentiable manner, without using reinforcement learning, which results in a sample-efficient exploration.

We demonstrate the efficacy of this formulation across a variety of benchmark environments including stochastic-Atari, Mujoco and Unity. 

Finally, we implement our differentiable exploration on a real robot which learns to interact with objects completely from scratch. 

Project videos and code are at https://pathak22.github.io/exploration-by-disagreement/.
