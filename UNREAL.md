# REINFORCEMENT LEARNING WITH UNSUPERVISED AUXILIARY TASKS

Max Jaderberg, Volodymyr Mnih, Wojciech Marian Czarnecki
Tom Schaul, Joel Z Leibo, David Silver & Koray Kavukcuoglu

This paper brings together the state-of-the-art Asynchronous Advantage Actor-Critic (A3C) framework (Mnih et al., 2016), outlined in Section 2, with auxiliary control tasks and auxiliary reward tasks, defined in sections Section 3.1 and Section 3.2 respectively. 

* A3C
* Auxiliary control tasks
* Auxiliary reward tasks

![(a) The base agent is a CNN-LSTM agent trained on-policy with the A3C loss (Mnih et al., 2016). Observations, rewards, and actions are stored in a small replay buffer which encapsulates a short history of agent experience. This experience is used by auxiliary learning tasks. (b) Pixel Control – auxiliary policies Qaux are trained to maximise change in pixel intensity of different regions of the input. The agent CNN and LSTM are used for this task along with an auxiliary deconvolution network. This auxiliary control task requires the agent to learn how to control the environment. (c) Reward Prediction – given three recent frames, the network must predict the reward that will be obtained in the next unobserved timestep. This task network uses instances of the agent CNN, and is trained on reward biased sequences to remove the perceptual sparsity of rewards. (d) Value Function Replay – further training of the value function using the agent network is performed to promote faster value iteration. Further visualisation of the agent can be found in https://youtu.be/Uz- zGYrYEjA](images/unreal.png)
