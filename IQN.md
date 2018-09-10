# Implicit Quantile Networks for Distributional Reinforcement Learning

> Will Dabney, Georg Ostrovski, David Silver, Remi Munos

## Abstract
In this work, we build on recent advances in distributional reinforcement learning to give a generally applicable, flexible, and state-of-the-art distributional variant of DQN. 

We achieve this by using quantile regression to approximate the full quantile function for the state-action return distribution. 

By reparameterizing a distribution over the sample space, this yields an implicitly defined return distribution and gives rise to a large class of risk-sensitive policies. 

We demonstrate improved performance on the 57 Atari 2600 games in the ALE, and use our algorithm’s implicitly defined distributions to study the effects of risk-sensitive policies in Atari games.
