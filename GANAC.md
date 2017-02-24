# Connecting Generative Adversarial Networks and Actor-Critic Methods
David Pfau, Oriol Vinyals

Both generative adversarial networks (GAN) in unsupervised learning and actor-critic methods in reinforcement learning (RL) have gained a reputation for being
difficult to optimize. 

Practitioners in both fields have amassed a large number of strategies to mitigate these instabilities and improve training. Here we show that
GANs can be viewed as actor-critic methods in an environment where the actor cannot affect the reward. 

We review the strategies for stabilizing training for each class of models, both those that generalize between the two and those that are particular to that model. We also review a number of extensions to GANs and RL
algorithms with even more complicated information flow. 

We hope that by highlighting this formal connection we will encourage both GAN and RL communities to develop general, scalable, and stable algorithms for multilevel optimization with deep networks, and to draw inspiration across communities.
