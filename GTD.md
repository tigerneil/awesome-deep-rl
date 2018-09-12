# Nonlinear Distributional Gradient Temporal-Difference Learning
> Chao Qu, Shie Mannor, and Huan Xu

## Abstract
We devise a distributional variant of gradient temporal-difference (TD) learning.

Distributional reinforcement learning has been demonstrated to outperform the regular one in the recent study [Bellemare et al., 2017a]. 

In our paper, we design two new algorithms called distributional GTD2 and distributional TDC using the Cram´er distance on the distributional version of the Bellman error objective function, which inherits advantages of both the nonlinear gradient TD algorithms and the distributional RL approach. 

We prove the asymptotic almost-sure convergence to a local optimal solution for general smooth function approximators, which includes neural networks that have been widely used in recent study to solve the real-life RL problems. 

In each step, the computational complexity is linear w.r.t. the number of the parameters of the function approximator, thus can be implemented efficiently for neural networks.
