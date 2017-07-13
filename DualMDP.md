Learning to Design Games: Strategic Environments in Deep Reinforcement Learning
Haifeng Zhang, Jun Wang, Zhiming Zhou, Weinan Zhang, Ying Wen, Yong Yu, Wenxin Li

In typical reinforcement learning (RL), the environment is assumed given and the
goal of the learning is to identify an optimal policy for the agent taking actions
through its interactions with the environment. In this paper, we extend this setting
by considering the environment is not given, but controllable and learnable
through its interaction with the agent at the same time. Theoretically, we find a dual
Markov decision process (MDP) w.r.t. the environment to that w.r.t. the agent, and
solving the dual MDP-policy pair yields a policy gradient solution to optimizing
the parametrized environment. Furthermore, environments with non-differentiable
parameters are addressed by a proposed general generative framework. Experiments
on a Maze generation task show the effectiveness of generating diverse and
challenging Mazes against agents with various settings.
