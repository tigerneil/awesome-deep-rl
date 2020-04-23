# Harnessing Structures for Value-Based Planning and Reinforcement Learning
> Yuzhe Yang, Guo Zhang, Zhi Xu, Dina Katabi

## Abstract
Value-based methods constitute a fundamental methodology in planning and deep reinforcement learning (RL). 

In this paper, we propose to exploit the underlying structures of the state-action value function, i.e., Q function, for both planning and deep RL. 

In particular, if the underlying system dynamics lead to some global structures of the Q function, one should be capable of inferring the function better by leveraging such structures. 

Specifically, we investigate the low-rank structure, which widely exists for big data matrices. We verify empirically the existence of low-rank Q functions in the context of control and deep RL tasks. 

As our key contribution, by leveraging Matrix Estimation (ME) techniques, we propose a general framework to exploit the underlying low-rank structure in Q functions. 

This leads to a more efficient planning procedure for classical control, and additionally, a simple scheme that can be applied to value-based RL techniques to consistently achieve better performance on "low-rank" tasks. 

Extensive experiments on control tasks and Atari games confirm the efficacy of our approach.
