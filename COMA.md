# Counterfactual Multi-Agent Policy Gradients

> Jakob N. Foerster1,†
> Gregory Farquhar1,†
> Triantafyllos Afouras1
> Nantas Nardelli1
> Shimon Whiteson1
> from oxford

## existing problems for MAS
Cooperative multi-agent systems can be naturally used to model many real world problems, such as network packet routing or the coordination of autonomous vehicles.

There is a great need for new reinforcement learning methods that can efficiently learn decentralised policies for such systems. 

## solutions
To this end, we propose a new multi-agent actor-critic method called counterfactual multi-agent (COMA)
policy gradients. 

1. COMA uses a **centralised critic** to estimate the Q-function and **decentralised actors** to optimise the agents’ policies. 
2. To address the challenges of multi-agent credit assignment, it uses a **counterfactual baseline** that marginalises out a single agent’s action, while keeping the other agents’ actions fixed. 
3. COMA also uses a critic representation that allows the counterfactual baseline to be computed efficiently in a single forward pass. 

## evaluation
We evaluate COMA in the testbed of StarCraft unit micromanagement, using a decentralised variant with significant partial observability. 

COMA significantly improves average performance over other multi-agent actor-critic methods in this setting, and the best performing agents are competitive with state-of-the-art centralised controllers that get access to the full state.
