## Quantifying Generalization in Reinforcement Learning
> Karl Cobbe, Oleg Klimov, Chris Hesse, Taehoon Kim, John Schulman

### Abstract
In this paper, we investigate the problem of overfitting in deep reinforcement learning. 

Among the most common benchmarks in RL, it is customary to use the same environments for both training and testing. 

This practice offers relatively little insight into an agent’s ability to generalize. 

We address this issue by using procedurally generated environments to construct distinct training and test sets. 

Most notably, we introduce a new environment called CoinRun, designed as a benchmark for generalization in RL. 

Using CoinRun, we find that agents overfit to surprisingly large training sets. 

We then show that deeper convolutional architectures improve generalization, as do methods traditionally found in supervised learning, including L2 regularization, dropout, data augmentation and batch normalization.
