## Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments

Ryan Lowe∗, Yi Wu∗, Aviv Tamar, Jean Harb, Pieter Abbeel, Igor Mordatch

> McGill University, UC Berkeley, OpenAI

deep RL in MAS setting:

### Problems:

* Q-learning is challenged by an inherent non-stationarity of the environment, 
* Policy gradient suffers from a variance that increases as the number of agents grows.

Actor-critic methods that considers action policies of other agents and is able to successfully learn policies that require complex multiagent
coordination. 

Training regimen utilizing an **ensemble** of policies for each agent that leads to more robust multi-agent policies.

### Experimentation
We show the strength of our approach compared to existing methods in 
* cooperative
* competitive scenarios, 

agent populations are able to discover various physical and informational coordination strategies.
