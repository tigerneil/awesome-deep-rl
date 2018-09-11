# DISTRIBUTED DISTRIBUTIONAL DETERMINISTIC POLICY GRADIENTS
> Gabriel Barth-Maron˚, Matthew W. Hoffman˚, David Budden, Will Dabney,
Dan Horgan, Dhruva TB, Alistair Muldal, Nicolas Heess, Timothy Lillicrap
DeepMind

## ABSTRACT
This work adopts the very successful distributional perspective on reinforcement learning and adapts it to the continuous control setting. 

We combine this within a distributed framework for off-policy learning in order to develop what we call the Distributed Distributional Deep Deterministic Policy Gradient algorithm, D4PG.

We also combine this technique with a number of additional, simple improvements such as the use of N-step returns and prioritized experience replay. 

Experimentally we examine the contribution of each of these individual components, and show how they interact, as well as their combined contributions. 

Our results show that across a wide variety of simple control tasks, difficult manipulation tasks, and a set of hard obstacle-based locomotion tasks the D4PG algorithm achieves state of the art performance.
