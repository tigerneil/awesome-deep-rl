Counterfactual Multi-Agent Policy Gradients
Jakob N. Foerster1,†
jakob.foerster@cs.ox.ac.uk
Gregory Farquhar1,†
gregory.farquhar@cs.ox.ac.uk
Triantafyllos Afouras1
afourast@robots.ox.ac.uk
Nantas Nardelli1
nantas@robots.ox.ac.uk
Shimon Whiteson1
shimon.whiteson@cs.ox.ac.uk

Cooperative multi-agent systems can be naturally used to model many real world
problems, such as network packet routing or the coordination of autonomous vehicles.
There is a great need for new reinforcement learning methods that can
efficiently learn decentralised policies for such systems. To this end, we propose
a new multi-agent actor-critic method called counterfactual multi-agent (COMA)
policy gradients. COMA uses a centralised critic to estimate the Q-function and
decentralised actors to optimise the agents’ policies. In addition, to address the
challenges of multi-agent credit assignment, it uses a counterfactual baseline that
marginalises out a single agent’s action, while keeping the other agents’ actions
fixed. COMA also uses a critic representation that allows the counterfactual baseline
to be computed efficiently in a single forward pass. We evaluate COMA in the
testbed of StarCraft unit micromanagement, using a decentralised variant with significant
partial observability. COMA significantly improves average performance
over other multi-agent actor-critic methods in this setting, and the best performing
agents are competitive with state-of-the-art centralised controllers that get access
to the full state.
