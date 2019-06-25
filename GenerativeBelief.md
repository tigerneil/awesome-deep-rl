# Shaping Belief States with Generative Environment Models for RL
> Karol Gregor, Danilo Jimenez Rezende, Frederic Besse, Yan Wu, Hamza Merzic, Aäron van den Oord

## Abstract
When agents interact with a complex environment, they must form and maintain beliefs about the relevant aspects of that environment. 

We propose a way to efficiently train expressive generative models in complex environments. 

We show that a predictive algorithm with an expressive generative model can form stable belief-states in visually rich and dynamic 3D environments. 

More precisely, we show that the learned representation captures the layout of the environment as well as the position and orientation of the agent. 

Our experiments show that the model substantially improves data-efficiency on a number of reinforcement learning (RL) tasks compared with strong model-free baseline agents. 

We find that predicting multiple steps into the future (overshooting), in combination with an expressive generative model, is critical for stable representations to emerge. 

In practice, using expressive generative models in RL is computationally expensive and we propose a scheme to reduce this computational burden, allowing us to build agents that are competitive with model-free baselines.
