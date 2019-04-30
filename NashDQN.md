# Deep Q-Learning for Nash Equilibria: Nash-DQN
> Philippe Casgrain, Brian Ning, and Sebastian Jaimungal

## Abstract
Model-free learning for multi-agent stochastic games is an active area of research.

Existing reinforcement learning algorithms, however, are often restricted to zero-sum games, and are applicable only in small state-action spaces or other simplified settings. 

Here, we develop a new data efficient Deep-Q-learning methodology for model-free learning of Nash equilibria for general-sum stochastic games. 

The algorithm uses a local linear-quadratic expansion of the stochastic game, which leads to analytically solvable optimal actions. 

The expansion is parametrized by deep neural networks to give it sufficient flexibility to learn the environment without the need to experience all state-action pairs.

We study symmetry properties of the algorithm stemming from label-invariant stochastic games and as a proof of concept, apply our algorithm to learning optimal trading strategies in competitive electronic markets
