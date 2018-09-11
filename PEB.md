# Time Limits in Reinforcement Learning

> Fabio Pardo 1 Arash Tavakoli 1 Vitaly Levdik 1 Petar Kormushev 1

## Abstract
In reinforcement learning, it is common to let an agent interact for a fixed amount of time with its environment before resetting it and repeating the process in a series of episodes. 

The task that the agent has to learn can either be to maximize its performance over (i) that fixed period, or (ii) an indefinite period where time limits are only used during training to diversify experience. 

In this paper, we provide a formal account for how time limits could effectively be handled in each of the two cases and explain why not doing so can cause state-aliasing and invalidation of experience replay, leading to suboptimal policies and training instability. 

In case (i), we argue that the terminations due to time limits are in fact part of the environment, and thus a notion of the remaining time should be included as part of the agent’s input to avoid violation of the Markov property. 

In case (ii), the time limits are not part of the environment and are only used to facilitate learning. 

We argue that this insight should be incorporated by bootstrapping from the value of the state at the end of each partial episode. 

For both cases, we illustrate empirically the significance of our considerations in improving the performance and stability of existing reinforcement learning algorithms, showing state-of-the-art results on several control tasks.
