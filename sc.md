# Self-Consistent Models and Values
> Gregory Farquhar, Matteo Hessel, Kate Baumli Zita Marinho, Hado van Hasselt, Angelos Filos, David Silver

## Abstract
Learned models of the environment provide reinforcement learning (RL) agents with flexible ways of making predictions about the environment. 
 
In particular, models enable planning, i.e. using more computation to improve value functions or policies, without requiring additional environment interactions. 
 
In this work, we investigate a way of augmenting model-based RL, by additionally encouraging a learned model and value function to be jointly self-consistent. 
 
Our approach differs from classic planning methods such as Dyna, which only update values to be consistent with the model. 
 
We propose multiple self-consistency updates, evaluate these in both tabular and function approximation settings, and find that, with appropriate choices, self-consistency helps both policy evaluation and control.
