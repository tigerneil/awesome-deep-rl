# Awesome Deep Reinforcement Learning

Join our [slack channel](https://join.slack.com/t/universityai/shared_invite/enQtNjk1ODExMzM5Mjg1LTA5YTYyOGNkNDA3ZmQyMzI3MDFjN2EzYjgxZmRlZmUxZWY0ODIzOWZhODhhNTE3ODAxNmI1ZTNjYzI0ZmYwNDc) to have deeper discussions.

updated Landscape of **DRL**

![updated Landscape of **DRL**](images/awesome-drl.png)

Landscape of **DRL**

![Landscape of **DRL**/GAN](images/landscape.jpeg)
This project is built for people who are learning and researching on latest deep reinforcement learning methods.

Illustrations:

![](images/ACER.png)

**Recommendations and suggestions are welcome**. 
## General guidances

* [Multiagent Reinforcement Learning by Marc Lanctot RLSS @ Lille](http://mlanctot.info/files/papers/Lanctot_MARL_RLSS2019_Lille.pdf) 11 July 2019
* [RLDM 2019 Notes by David Abel](https://david-abel.github.io/notes/rldm_2019.pdf) 11 July 2019
* [A Survey of Reinforcement Learning Informed by Natural Language](RLNL.md) 10 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.03926.pdf)
* [Challenges of Real-World Reinforcement Learning](ChallengesRealWorldRL.md) 29 Apr 2019 [arxiv](https://arxiv.org/pdf/1904.12901.pdf)
* [Ray Interference: a Source of Plateaus in Deep Reinforcement Learning](RayInterference.md) 25 Apr 2019 [arxiv](https://arxiv.org/pdf/1904.11455.pdf)
* [Principles of Deep RL by David Silver](p10.md)
* [University AI's General introduction to deep rl (in Chinese)](https://www.jianshu.com/p/dfd987aa765a)
* [OpenAI's spinningup](https://spinningup.openai.com/en/latest/)
* [The Promise of Hierarchical Reinforcement Learning](https://thegradient.pub/the-promise-of-hierarchical-reinforcement-learning/) 9 Mar 2019
* [Deep Reinforcement Learning that Matters](reproducing.md) 30 Jan 2019 [arxiv](https://arxiv.org/pdf/1709.06560.pdf)

## Foundations and theory

* [General non-linear Bellman equations](GNLBE.md) 9 July 2019 [arxiv](https://arxiv.org/pdf/1907.07331.pdf)
* [Monte Carlo Gradient Estimation in Machine Learning](MCGE.md) 25 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.10652.pdf)

## General Benchmark Testing Frameworks

* [Quantifying Generalization in Reinforcement Learning](Coinrun.md) 20 Dec 2018 [arxiv](https://arxiv.org/pdf/1812.02341.pdf)
* [S-RL Toolbox: Environments, Datasets and Evaluation Metrics for State Representation Learning](SRL.md) 25 Sept 2018
* [dopamine](https://github.com/google/dopamine)
* [StarCraft II](https://github.com/deepmind/pysc2)
* [tfrl](https://github.com/deepmind/trfl)
* [chainerrl](https://github.com/chainer/chainerrl)
* [PARL](https://github.com/PaddlePaddle/PARL) 

## Value based methods


* [Recurrent Value Functions](RVF.md) 23 May 2019 [arxiv](https://arxiv.org/pdf/1905.09562.pdf)
* [Stochastic Lipschitz Q-Learning](LipschitzQ.md) 24 Apr 2019 [arxiv](https://arxiv.org/pdf/1904.10653.pdf)
* [TreeQN and ATreeC: Differentiable Tree-Structured Models for Deep Reinforcement Learning](https://arxiv.org/pdf/1710.11417) 8 Mar 2018
* [DISTRIBUTED PRIORITIZED EXPERIENCE REPLAY](https://arxiv.org/pdf/1803.00933.pdf) 2 Mar 2018
* [Rainbow: Combining Improvements in Deep Reinforcement Learning](Rainbow.md) 6 Oct 2017
* [Learning from Demonstrations for Real World Reinforcement Learning](DQfD.md) 12 Apr 2017
* [Dueling Network Architecture](Dueling.md)
* [Double DQN](DDQN.md)
* [Prioritized Experience](PER.md)
* [Deep Q-Networks](DQN.md)

## Policy gradient methods

* [Direct Policy Gradients: Direct Optimization of Policies in Discrete Action Spaces](DirPG.md) [arxiv](https://arxiv.org/pdf/1906.06062.pdf)
* [Policy Gradient Search: Online Planning and Expert Iteration without Search Trees](PGS.md) 7 Apr 2019 [arxiv](https://arxiv.org/pdf/1904.03646.pdf)
* [SUPERVISED POLICY UPDATE FOR DEEP REINFORCEMENT LEARNING](SPU.md) 24 Dec 2018 [arxiv](https://arxiv.org/pdf/1805.11706v4.pdf)
* [PPO-CMA: Proximal Policy Optimization with Covariance Matrix Adaptation](PPO-CMA.md) 5 Oct 2018 [arxiv](https://arxiv.org/pdf/1810.02541v6.pdf)
* [Clipped Action Policy Gradient](CAPG.md) 22 June 2018
* [Expected Policy Gradients for Reinforcement Learning](EPG.md) 10 Jan 2018
* [Proximal Policy Optimization Algorithms](PPO.md) 20 July 2017
* [Emergence of Locomotion Behaviours in Rich Environments](DPPO.md) 7 July 2017
* [Interpolated Policy Gradient: Merging On-Policy and Off-Policy Gradient Estimation for Deep Reinforcement Learning](IPG.md) 1 Jun 2017
* [Equivalence Between Policy Gradients and Soft Q-Learning](PGSQL.md)
* [Trust Region Policy Optimization](TRPO.md)
* [Reinforcement Learning with Deep Energy-Based Policies](DEBP.md)
* [Q-PROP: SAMPLE-EFFICIENT POLICY GRADIENT WITH AN OFF-POLICY CRITIC](QPROP.md)


## Explorations in DRL

* [Self-Supervised Exploration via Disagreement](Disagreement.md) 10 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.04161.pdf)
* [Approximate Exploration through State Abstraction](MBIE-EB.md) 24 Jan 2019
* [The Uncertainty Bellman Equation and Exploration](UBE.md) 15 Sep 2017
* [Noisy Networks for Exploration](NoisyNet.md) 30 Jun 2017 [implementation](https://github.com/Kaixhin/NoisyNet-A3C)
* [Count-Based Exploration in Feature Space for Reinforcement Learning](PhiEB.md) 25 Jun 2017
* [Count-Based Exploration with Neural Density Models](NDM.md) 14 Jun 2017
* [UCB and InfoGain Exploration via Q-Ensembles](QEnsemble.md) 11 Jun 2017
* [Minimax Regret Bounds for Reinforcement Learning](MMRB.md) 16 Mar 2017
* [Incentivizing Exploration In Reinforcement Learning With Deep Predictive Models](incentivizing.md)
* [EX2: Exploration with Exemplar Models for Deep Reinforcement Learning](EX2.md)

## Actor-Critic methods

* [Generalized Off-Policy Actor-Critic](Geoff-PAC.md) 27 Mar 2019
* [Soft Actor-Critic Algorithms and Applications](https://arxiv.org/pdf/1812.05905.pdf) 29 Jan 2019
* [The Reactor: A Sample-Efficient Actor-Critic Architecture](REACTOR.md) 15 Apr 2017
* [SAMPLE EFFICIENT ACTOR-CRITIC WITH EXPERIENCE REPLAY](ACER.md)
* [REINFORCEMENT LEARNING WITH UNSUPERVISED AUXILIARY TASKS](UNREAL.md)
* [Continuous control with deep reinforcement learning](DDPG.md)

## Model-based methods

* [When to use parametric models in reinforcement learning?](parametric.md) 12 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.05243.pdf)
* [Model Based Reinforcement Learning for Atari](https://arxiv.org/pdf/1903.00374.pdf) 5 Mar 2019
* [Model-Based Stabilisation of Deep Reinforcement Learning](MBDQN.md) 6 Sep 2018
* [Learning model-based planning from scratch](IBP.md) 19 July 2017

## Model-free + Model-based

* [Imagination-Augmented Agents for Deep Reinforcement Learning](I2As.md) 19 July 2017

## Hierarchical

* [Language as an Abstraction for Hierarchical Deep Reinforcement Learning](HAL.md) 18 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.07343.pdf)

## Option

* [Variational Option Discovery Algorithms](VALOR.md) 26 July 2018
* [A Laplacian Framework for Option Discovery in Reinforcement Learning](LFOD.md) 16 Jun 2017

## Connection with other methods

* [Robust Imitation of Diverse Behaviors](GVG.md)
* [Learning human behaviors from motion capture by adversarial imitation](GAIL.md)
* [Connecting Generative Adversarial Networks and Actor-Critic Methods](GANAC.md)

## Connecting value and policy methods

* [Bridging the Gap Between Value and Policy Based Reinforcement Learning](PCL.md)
* [Policy gradient and Q-learning](PGQ.md)

## Reward design

* [End-to-End Robotic Reinforcement Learning without Reward Engineering](VICE.md) 16 Apr 2019 [arxiv](https://arxiv.org/pdf/1904.07854.pdf)
* [Reinforcement Learning with Corrupted Reward Channel](RLCRC.md) 23 May 2017

## Unifying

* [Multi-step Reinforcement Learning: A Unifying Algorithm](MSRL.md)

## Faster DRL

* [Neural Episodic Control](NEC.md)

## Apply RL to other domains

* [TUNING RECURRENT NEURAL NETWORKS WITH REINFORCEMENT LEARNING](RLTUNER.md)

## Multiagent Settings

* [Evolutionary Reinforcement Learning for Sample-Efficient Multiagent Coordination](MERL.md) 18 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.07315.pdf)
* [A Regularized Opponent Model with Maximum Entropy Objective](ROMMEO.md) 17 May 2019 [arxiv](https://arxiv.org/pdf/1905.08087.pdf)
* [Deep Q-Learning for Nash Equilibria: Nash-DQN](NashDQN.md) 23 Apr 2019 [arxiv](https://arxiv.org/pdf/1904.10554.pdf)
* [Bayesian Action Decoder for Deep Multi-Agent Reinforcement Learning](bad.md) 4 Nov 2018
* [INTRINSIC SOCIAL MOTIVATION VIA CAUSAL INFLUENCE IN MULTI-AGENT RL](ISMCI.md) 19 Oct 2018
* [QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning](http://www.cs.ox.ac.uk/people/shimon.whiteson/pubs/rashidicml18.pdf) 30 Mar 2018
* [Modeling Others using Oneself in Multi-Agent Reinforcement Learning](SOM.md) 26 Feb 2018
* [The Mechanics of n-Player Differentiable Games](SGA.md) 15 Feb 2018 
* [Continuous Adaptation via Meta-Learning in Nonstationary and Competitive Environments](RoboSumo.md) 10 Oct 2017
* [Learning with Opponent-Learning Awareness](LOLA.md) 13 Sep 2017
* [Counterfactual Multi-Agent Policy Gradients](COMA.md) 
* [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](MADDPG.md) 7 Jun 2017
* [Multiagent Bidirectionally-Coordinated Nets for Learning to Play StarCraft Combat Games](BiCNet.md) 29 Mar 2017

## New design

* [IMPALA: Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures](https://arxiv.org/pdf/1802.01561.pdf) 9 Feb 2018
* [Reverse Curriculum Generation for Reinforcement Learning](RECUR.md)
* [Trial without Error: Towards Safe Reinforcement Learning via Human Intervention](HIRL.md)
* [Learning to Design Games: Strategic Environments in Deep Reinforcement Learning](DualMDP.md) 5 July 2017

## Multitask

* [Kickstarting Deep Reinforcement Learning](https://arxiv.org/pdf/1803.03835.pdf) 10 Mar 2018
* [Zero-Shot Task Generalization with Multi-Task Deep Reinforcement Learning](ZSTG.md) 7 Nov 2017
* [Distral: Robust Multitask Reinforcement Learning](Distral.md) 13 July 2017

## Observational Learning

* [Observational Learning by Reinforcement Learning](OLRL.md) 20 Jun 2017

## Meta Learning

* [Meta-learning of Sequential Strategies](MetaSS.md) 8 May 2019 [arxiv](https://arxiv.org/pdf/1905.03030.pdf)
* [Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables](PEARL.md) 19 Mar 2019 [arxiv](https://arxiv.org/pdf/1903.08254.pdf)
* [ProMP: Proximal Meta-Policy Search](ProMP.md) 16 Oct 2018 [arxiv](https://arxiv.org/pdf/1810.06784)
* [Unsupervised Meta-Learning for Reinforcement Learning](UML.md) 12 Jun 2018

## Distributional

* [GAN Q-learning](GANQL.md) 20 July 2018
* [Implicit Quantile Networks for Distributional Reinforcement Learning](IQN.md) 14 Jun 2018
* [Nonlinear Distributional Gradient Temporal-Difference Learning](GTD.md) 20 May 2018
* [DISTRIBUTED DISTRIBUTIONAL DETERMINISTIC POLICY GRADIENTS](D4PG.md) 23 Apr 2018
* [An Analysis of Categorical Distributional Reinforcement Learning](C51-analysis.md) 22 Feb 2018
* [Distributional Reinforcement Learning with Quantile Regression](QR-DQN.md) 27 Oct 2017
* [A Distributional Perspective on Reinforcement Learning](C51.md) 21 July 2017

## Planning

* [Search on the Replay Buffer: Bridging Planning and Reinforcement Learning](SoRB.md) 12 June 2019 [arxiv](https://arxiv.org/pdf/1906.05253.pdf)

## Safety

* [Robust Reinforcement Learning for Continuous Control with Model Misspecification](MPO.md) 18 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.07516.pdf)
* [Verifiable Reinforcement Learning via Policy Extraction](Viper.md) 22 May 2018 [arxiv](https://arxiv.org/pdf/1805.08328.pdf)

## Inverse RL

* [ADDRESSING SAMPLE INEFFICIENCY AND REWARD BIAS IN INVERSE REINFORCEMENT LEARNING](OP-GAIL.md) 9 Sep 2018

## No reward RL

* [Fast Task Inference with Variational Intrinsic Successor Features](VISR.md) 2 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.05030.pdf)
* [Curiosity-driven Exploration by Self-supervised Prediction](https://arxiv.org/pdf/1705.05363) 15 May 2017 

## Time

* [Time Limits in Reinforcement Learning](PEB.md)

## Applications
* [DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills](dmimic.md) 9 Apr 2018

## Adversarial learning

* [Sample-efficient Adversarial Imitation Learning from Observation](LQR+GAIfO.md) 18 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.07374.pdf) 

## Use Natural Language

* [Using Natural Language for Reward Shaping in Reinforcement Learning](LEARN.md) 31 May 2019 [arxiv](https://www.cs.utexas.edu/~ai-lab/downloadPublication.php?filename=http://www.cs.utexas.edu/users/ml/papers/goyal.ijcai19.pdf&pubid=127757)

## Generative and contrastive representation learning

* [Unsupervised State Representation Learning in Atari](ST-DIM.md) 19 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.08226.pdf)

## Belief

* [Shaping Belief States with Generative Environment Models for RL](GenerativeBelief.md) 24 Jun 2019 [arxiv](https://arxiv.org/pdf/1906.09237v2.pdf)
