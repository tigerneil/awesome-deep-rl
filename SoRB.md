# Search on the Replay Buffer: Bridging Planning and Reinforcement Learning
> Benjamin Eysenbach, Ruslan Salakhutdinov, Sergey Levine

## Abstract
The history of learning for control has been an exciting back and forth between two broad classes of algorithms: planning and reinforcement learning. 

Planning algorithms effectively reason over long horizons, but assume access to a local policy and distance metric over collision-free paths. 

Reinforcement learning excels at learning policies and the relative values of states, but fails to plan over long horizons. 

Despite the successes of each method in various domains, tasks that require reasoning over long horizons with limited feedback and high-dimensional observations remain exceedingly challenging for both planning and reinforcement learning algorithms. 

Frustratingly, these sorts of tasks are potentially the most useful, as they are simple to design (a human only need to provide an example goal state) and avoid reward shaping, which can bias the agent towards finding a sub-optimal solution. We introduce a general-purpose control algorithm that combines the strengths of planning and reinforcement learning to effectively solve these tasks. 

Our aim is to decompose the task of reaching a distant goal state into a sequence of easier tasks, each of which corresponds to reaching a particular subgoal. 

Planning algorithms can automatically find these waypoints, but only if provided with suitable abstractions of the environment – namely, a graph consisting of nodes and edges. 

Our main insight is that this graph can be constructed via reinforcement learning, where a goal-conditioned value function provides edge weights, and nodes are taken to be previously seen observations in a replay buffer. 

Using graph search over our replay buffer, we can automatically generate this sequence of subgoals, even in image-based environments. 

Our algorithm, search on the replay buffer (SoRB), enables agents to solve sparse reward tasks over one hundred steps, and generalizes substantially better than standard RL algorithms.
