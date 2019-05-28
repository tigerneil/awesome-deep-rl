# PPO-CMA: Proximal Policy Optimization with Covariance Matrix Adaptation
> Perttu Hämäläinen, Amin Babadi, Xiaoxiao Ma, Jaakko Lehtinen

## Abstract

Proximal Policy Optimization (PPO) is a highly popular model-free reinforcement learning (RL) approach. 

However, we observe that in a continuous action space, PPO can prematurely shrink the exploration variance, which leads to slow progress and may make the algorithm prone to getting stuck in local optima. 

Drawing inspiration from CMA-ES, a black-box evolutionary optimization method designed for robustness in similar situations, we propose PPO-CMA, a proximal policy optimization approach that adaptively expands the exploration variance to speed up progress. 

This can be considered as a form of action-space momentum. 

With only minor changes to PPO, our algorithm considerably improves performance in Roboschool continuous control benchmarks.
