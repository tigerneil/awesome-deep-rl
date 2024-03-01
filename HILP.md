# Foundation Policies with Hilbert Representations
> Seohong Park UC Berkeley
> Tobias Kreiman UC Berkeley
> Sergey Levine UC Berkeley

## Abstract 
Unsupervised and self-supervised objectives, such as next token prediction, have enabled pre-training generalist models from large amounts of unlabeled data. 

In reinforcement learning (RL), however, finding a **truly** general and scalable unsupervised pre-training objective for **generalist policies** from offline data remains a major open question. 

While a number of methods have been proposed to enable generic self-supervised RL, based on principles such as goal-conditioned RL, behavioral cloning, and unsupervised skill learning, such methods remain limited in terms of either the diversity of the discovered behaviors, the need for high-quality demonstration data, or the lack of a clear prompting or adaptation mechanism for downstream tasks. 

In this work, we propose a novel unsupervised framework to pre-train **generalist** policies that capture **diverse, optimal, long-horizon behaviors** from unlabeled offline data such that they can be quickly adapted to any arbitrary new tasks in a zero-shot manner. 

Our key insight is to learn a **structured representation** that preserves the **temporal** structure of the underlying environment, and then to span this learned latent space with directional movements, which enables various zero-shot policy "prompting" schemes for downstream tasks. 

Through our experiments on simulated robotic locomotion and manipulation benchmarks, we show that our unsupervised policies can solve goal-conditioned and general RL tasks in a zero-shot fashion, even often outperforming prior methods designed specifically for each setting. 

Our code and videos are available at this [website](https://seohong.me/projects/hilp/). 

The repo is [code](https://github.com/seohongpark/HILP)
