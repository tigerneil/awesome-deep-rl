# Verifiable Reinforcement Learning via Policy Extraction
> Osbert Bastani, Yewen Pu, Armando Solar-Lezama

While deep reinforcement learning has successfully solved many challenging control tasks, its real-world applicability has been limited by the inability to ensure the safety of learned policies. 

We propose an approach to verifiable reinforcement learning by training decision tree policies, which can represent complex policies (since they are nonparametric), yet can be efficiently verified using existing techniques (since they are highly structured). 

The challenge is that decision tree policies are difficult to train. 

We propose VIPER, an algorithm that combines ideas from model compression and imitation learning to learn decision tree policies guided by a DNN policy (called the oracle) and its Q-function, and show that it substantially outperforms two baselines. 

We use VIPER to 
- (i) learn a provably robust decision tree policy for a variant of Atari Pong with a symbolic state space, 
- (ii) learn a decision tree policy for a toy game based on Pong that provably never loses, and
- (iii) learn a provably stable decision tree policy for cart-pole. 

In each case, the decision tree policy achieves performance equal to that of the original DNN policy.
