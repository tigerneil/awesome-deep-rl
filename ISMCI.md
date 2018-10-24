# INTRINSIC SOCIAL MOTIVATION VIA CAUSAL INFLUENCE IN MULTI-AGENT RL
> Natasha Jaques, Angeliki Lazaridou, Edward Hughes, Caglar Gulcehre, Pedro A. Ortega, DJ Strouse, Joel Z. Leibo, Nando de Freitas

## ABSTRACT
We derive a new intrinsic social motivation for multi-agent reinforcement learning (MARL), in which agents are rewarded for having causal influence over another agent’s actions. 

Causal influence is assessed using counterfactual reasoning. The reward does not depend on observing another agent’s reward function, and is thus a more realistic approach to MARL than taken in previous work. 

We show that the causal influence reward is related to maximizing the mutual information between agents’ actions. 

We test the approach in challenging social dilemma environments, where it consistently leads to enhanced cooperation between agents and higher collective reward. 

Moreover, we find that rewarding influence can lead agents to develop emergent communication protocols. 

We therefore employ influence to train agents to use an explicit communication channel, and find that it leads to more effective communication and higher collective reward. 

Finally, we show that influence can be computed by equipping each agent with an internal model that predicts the actions of other agents. 

This allows the social influence reward to be computed without the use of a centralised controller, and as such represents a significantly more general and scalable inductive bias for MARL with independent agents.
