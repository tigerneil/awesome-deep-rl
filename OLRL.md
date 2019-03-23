# Observational Learning by Reinforcement Learning
Diana Borsa, Bilal Piot, Rémi Munos, Olivier Pietquin

## Abstract
Observational learning is a type of learning that occurs as a function of observing, retaining and possibly replicating or imitating the behaviour of another agent. 

It is a core mechanism appearing in various instances of social learning and has been found to be employed in several intelligent species, including humans. 

In this paper, we investigate to what extent the explicit modelling of other agents is necessary to achieve observational learning through machine learning. 

Especially, we argue that observational learning can emerge from pure Reinforcement Learning (RL), potentially coupled with memory. 

Through simple scenarios, we demonstrate that an RL agent can leverage the information provided by the observations of an other agent performing a task in a shared environment. 

The other agent is only observed through the effect of its actions on the environment and never explicitly modeled. 

Two key aspects are borrowed from observational learning: 
1. the observer behaviour needs to change as a result of viewing a ’teacher’ (another agent) and
2. the observer needs to be motivated somehow to engage in making use of the other agent’s behaviour. 

The later is naturally modeled by RL, by correlating the learning agent’s reward with the teacher agent’s behaviour.
