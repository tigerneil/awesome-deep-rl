Learning with Opponent-Learning Awareness

Jakob N. Foerster2,†
jakob.foerster@cs.ox.ac.uk
Richard Y. Chen1,†
richardchen@openai.com
Maruan Al-Shedivat4
alshedivat@cs.cmu.edu
Shimon Whiteson2
shimon.whiteson@cs.ox.ac.uk
Pieter Abbeel1,3
pieter@openai.com
Igor Mordatch1
mordatch@openai.com

https://arxiv.org/pdf/1709.04326.pdf

Multi-agent settings are quickly gathering importance in machine
learning. Beyond a plethora of recent work on deep
multi-agent reinforcement learning, hierarchical reinforcement
learning, generative adversarial networks and decentralized
optimization can all be seen as instances of this setting.
However, the presence of multiple learning agents in
these settings renders the training problem non-stationary
and often leads to unstable training or undesired final results.
We present Learning with Opponent-Learning Awareness
(LOLA), a method that reasons about the anticipated
learning of the other agents. The LOLA learning rule includes
an additional term that accounts for the impact of
the agent’s policy on the anticipated parameter update of the
other agents. We show that the LOLA update rule can be ef-
ficiently calculated using an extension of the likelihood ratio
policy gradient update, making the method suitable for
model-free reinforcement learning. This method thus scales
to large parameter and input spaces and nonlinear function
approximators. Preliminary results show that the encounter
of two LOLA agents leads to the emergence of tit-for-tat
and therefore cooperation in the infinitely iterated prisoners’
dilemma, while independent learning does not. In this
domain, LOLA also receives higher payouts compared to a
naive learner, and is robust against exploitation by higher order
gradient-based methods. Applied to infinitely repeated
matching pennies, only LOLA agents converge to the Nash
equilibrium. We also apply LOLA to a grid world task with
an embedded social dilemma using deep recurrent policies.
Again, by considering the learning of the other agent, LOLA
agents learn to cooperate out of selfish interests.
