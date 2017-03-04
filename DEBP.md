# Reinforcement Learning with Deep Energy-Based Policies

Tuomas Haarnoja, Haoran Tang, Pieter Abbeel, Sergey Levine

## Contribution
A method for learning expressive energy-based policies for continuous states and actions, which has been feasible only in tabular domains before. 

## Algorithm
We apply our method to learning maximum entropy policies, resulting into a new algorithm, called soft Q-learning, that expresses the optimal policy via a Boltzmann distribution.

## Tricks
We use the recently proposed amortized Stein variational gradient descent to learn a stochastic sampling network that approximates samples from this distribution. 

The benefits of the proposed algorithm include:
* improved exploration
* compositionality that allows transferring skills between tasks, which we confirm in simulated experiments with swimming and walking robots. 

We also draw a connection to actor-critic methods, which can be viewed performing approximate inference on the corresponding energy-based model.
