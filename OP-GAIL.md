# ADDRESSING SAMPLE INEFFICIENCY AND REWARD BIAS IN INVERSE REINFORCEMENT LEARNING
> Ilya Kostrikov, Kumar Krishna Agrawal, Sergey Levine, Jonathan Tompson

## ABSTRACT
The Generative Adversarial Imitation Learning (GAIL) framework from Ho & Ermon (2016) is known for being surprisingly sample efficient in terms of demonstrations provided by an expert policy. 

However, the algorithm requires a significantly larger number of policy interactions with the environment in order to imitate the expert. 

In this work we address this problem by proposing a sample efficient algorithm for inverse reinforcement learning that incorporates both offpolicy reinforcement learning and adversarial imitation learning. 

We also show that GAIL has a number of biases associated with the choice of reward function, which can unintentionally encode prior knowledge of some tasks, and prevent learning in others. 

We address these shortcomings by analyzing the issue and correcting invalid assumptions used when defining the learned reward function. 

We demonstrate that our algorithm achieves state-of-the-art performance for an inverse reinforcement learning framework on a variety of standard benchmark tasks, and from demonstrations provided from both learned agents and human experts. 
