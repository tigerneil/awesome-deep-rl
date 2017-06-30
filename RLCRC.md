Reinforcement Learning with Corrupted Reward Channel

Tom Everitt, Victoria Krakovna, Laurent Orseau, Marcus Hutter, and Shane Legg

https://arxiv.org/pdf/1705.08417.pdf

No real-world reward function is perfect. Sensory errors and software bugs may result in RL agents
observing higher (or lower) rewards than they should. For example, a reinforcement learning agent may
prefer states where a sensory error gives it the maximum reward, but where the true reward is actually
small. We formalise this problem as a generalised Markov Decision Problem called Corrupt Reward MDP.
Traditional RL methods fare poorly in CRMDPs, even under strong simplifying assumptions and when
trying to compensate for the possibly corrupt rewards. Two ways around the problem are investigated.
First, by giving the agent richer data, such as in inverse reinforcement learning and semi-supervised
reinforcement learning, reward corruption stemming from systematic sensory errors may sometimes be
completely managed. Second, by using randomisation to blunt the agent’s optimisation, reward corruption
can be partially managed under some assumptions.
