# Zero-Shot Task Generalization with Multi-Task Deep Reinforcement Learning

> Junhyuk Oh 1 Satinder Singh 1 Honglak Lee 1 2 Pushmeet Kohli 3

As a step towards developing zero-shot task generalization capabilities in reinforcement learning(RL), we introduce a new RL problem where the
agent should learn to execute sequences of instructions after learning useful skills that solve subtasks. 

In this problem, we consider two types of generalizations: 

* to previously unseen instructions 
  For generalization over unseen instructions, we propose a new objective which encourages learning correspondences between similar subtasks by making analogies. For generalization over sequential instructions, we present a hierarchical architecture where a meta controller learns to use the acquired skills for executing the instructions.
  
* to longer sequences of instructions. 
  To deal with delayed reward, we propose a new neural architecture in the meta controller that learns when to update the subtask, which makes learning more efficient. Experimental results on a stochastic 3D domain show that the proposed ideas are crucial for generalization to longer instructions as well as unseen instructions.
