# Meta-learning of Sequential Strategies
> Pedro A. Ortega, Jane X. Wang, Mark Rowland, Tim Genewein, Zeb Kurth-Nelson, Razvan Pascanu,
Nicolas Heess, Joel Veness, Alex Pritzel, Pablo Sprechmann, Siddhant M. Jayakumar, Tom McGrath, Kevin
Miller, Mohammad Azar, Ian Osband, Neil Rabinowitz, András György, Silvia Chiappa, Simon Osindero,
Yee Whye Teh, Hado van Hasselt, Nando de Freitas, Matthew Botvinick, and Shane Legg


## Abstract

In this report we review memory-based metalearning as a tool for building sample-efficient strategies that learn from past experience to adapt to any task within a target class. 

Our goal is to equip the reader with the conceptual foundations of this tool for building new, scalable agents that operate on broad domains. 

To do so, we present basic algorithmic templates for building near-optimal predictors and reinforcement learners which behave as if they had a probabilistic model that allowed them to efficiently exploit task structure. 

Furthermore, we recast memory-based meta-learning within a Bayesian framework, showing that the meta-learned strategies are near-optimal because they amortize Bayes-filtered data, where the adaptation is implemented in the memory dynamics as a state-machine of sufficient statistics. 

Essentially, memory-based meta-learning translates the hard problem of probabilistic sequential inference into a regression problem.

### keywords:
meta-learning, generality, sample-efficiency, memory, sufficient statistics, Bayesian statistics, Thompson sampling, Bayes-optimality.
