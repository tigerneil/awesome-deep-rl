# Meta-Gradient Reinforcement Learning
> Zhongwen Xu, Hado van Hasselt, David Silver

## Abstract
The goal of reinforcement learning algorithms is to estimate and/or optimise the value function. 

However, unlike supervised learning, no teacher or oracle is available to provide the true value function. 

Instead, the majority of reinforcement learning algorithms estimate and/or optimise a proxy for the value function. 

This proxy is typically based on a sampled and bootstrapped approximation to the true value function, known as a return. 

The particular choice of return is one of the chief components determining the nature of the algorithm: the rate at which future rewards are discounted; when and how values should be bootstrapped; or even the nature of the rewards themselves. 

It is well-known that these decisions are crucial to the overall success of RL algorithms. 

We discuss a gradient-based meta-learning algorithm that is able to adapt the nature of the return, online, whilst interacting and learning from the environment. 

When applied to 57 games on the Atari 2600 environment over 200 million frames, our algorithm achieved a new state-of-the-art performance.
