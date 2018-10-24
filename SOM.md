# Modeling Others using Oneself in Multi-Agent Reinforcement Learning

> Roberta Raileanu, Emily Denton, Arthur Szlam, Rob Fergus

## Abstract
We consider the multi-agent reinforcement learning setting with imperfect information. 

The reward function depends on the hidden goals of both agents, so the agents must infer the other players’ goals from their observed behavior in order to maximize their returns. 

We propose a new approach for learning in these domains: Self Other-Modeling (SOM), in which an agent uses its own policy to predict the other agent’s actions and update its belief of their hidden goal in an online manner. 

We evaluate this approach on three different tasks and show that the agents are able to learn better policies using their estimate of the other players’ goals, in both cooperative and competitive settings.
