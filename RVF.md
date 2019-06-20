# Recurrent Value Functions
> Pierre Thodoroff, Nishanth Anand, Lucas Caccia, Doina Precup, Joelle Pineau

## Abstract
Despite recent successes in Reinforcement Learning, value-based methods often suffer from high variance hindering performance. 

In this paper, we illustrate this in a continuous control setting where state of the art methods perform poorly whenever sensor noise is introduced. 

To overcome this issue, we introduce Recurrent Value Functions (RVFs) as an alternative to estimate the value function of a state. 

We propose to estimate the value function of the current state using the value function of past states visited along the trajectory. 

Due to the nature of their formulation, RVFs have a natural way of learning an emphasis function that selectively emphasizes important states. 

First, we establish RVF’s asymptotic convergence properties in tabular settings. 

We then demonstrate their robustness on a partially observable domain and continuous control tasks. 

Finally, we provide a qualitative interpretation of the learned emphasis function.
