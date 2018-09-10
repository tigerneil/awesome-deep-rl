# An Analysis of Categorical Distributional Reinforcement Learning

Distributional approaches to value-based reinforcement learning model the entire distribution of returns, rather than just their expected values, and have recently been shown to yield state-of-the-art empirical performance.

This was demonstrated by the recently proposed C51 algorithm, based on categorical distributional reinforcement learning (CDRL) [Bellemare et al., 2017a]. However, the theoretical properties of CDRL algorithms are not yet well understood. 

In this paper, we introduce a framework to analyse CDRL algorithms, establish the importance of the projected distributional Bellman operator
in distributional RL, draw fundamental connections between CDRL and the Cram´er distance, and give a proof of convergence for sample-based categorical distributional reinforcement
learning algorithms.
