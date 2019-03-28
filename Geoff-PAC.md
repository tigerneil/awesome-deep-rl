# Generalized Off-Policy Actor-Critic
> Shangtong Zhang, Wendelin Boehmer, Shimon Whiteson

[Download from arxiv](https://arxiv.org/pdf/1903.11329.pdf)

## Abstract
We propose a new objective, the counterfactual objective, unifying existing objectives for off-policy policy gradient algorithms in the continuing reinforcement learning (RL) setting. 

Compared to the commonly used excursion objective, which can be misleading about the performance of the target policy when deployed, our new objective better predicts such performance. 

We prove the Generalized Off-Policy Policy Gradient Theorem to compute the policy gradient of the counterfactual objective and use an emphatic approach to get an unbiased sample from this policy gradient, yielding the Generalized Off-Policy Actor-Critic (Geoff-PAC) algorithm. 

We demonstrate the merits of Geoff-PAC over existing algorithms in Mujoco robot simulation tasks, the first empirical success of emphatic algorithms in prevailing deep RL benchmarks.
