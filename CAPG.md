# Clipped Action Policy Gradient
> Yasuhiro Fujita 1 Shin-ichi Maeda 1

## Abstract
Many continuous control tasks have bounded action spaces. 

When policy gradient methods are applied to such tasks, out-of-bound actions need to be clipped before execution, while policies are usually optimized as if the actions are not clipped.

We propose a policy gradient estimator that exploits the knowledge of actions being clipped to reduce the variance in estimation. 

We prove that our estimator, named clipped action policy gradient (CAPG), is unbiased and achieves lower variance than the conventional estimator that ignores action bounds. 

Experimental results demonstrate that CAPG generally outperforms the conventional estimator, indicating that it is a better policy gradient estimator for continuous controltasks. 

The source code is available at https://github.com/pfnet-research/capg.
