Interpolated Policy Gradient: Merging On-Policy and
Off-Policy Gradient Estimation for Deep
Reinforcement Learning

Shixiang Gu, Timothy Lillicrap, Zoubin Ghahramani, Richard E. Turner, Bernhard Schölkopf, Sergey Levine
> from Cambridge, MPI, DeepMind, UberAI, Berkeley

## Background
* Off-policy model-free deep reinforcement learning methods using previously collected
data can improve sample efficiency over on-policy policy gradient techniques.
* On the other hand, on-policy algorithms are often more stable and easier to use.

## Goal
merging on- and off-policy updates for deep reinforcement learning. 

## Theoretical results
* show that off-policy updates with a value function estimator can be interpolated
with on-policy policy gradient updates whilst still satisfying performance bounds.

Tool used: control variate methods to produce a family of policy gradient
algorithms, with several recently proposed algorithms being special cases of this
family. 

## Empirical comparisons
these techniques with the
remaining algorithmic details fixed, and show how different mixing of off-policy
gradient estimates with on-policy samples contribute to improvements in empirical
performance. 

## IPG
The final algorithm provides a generalization and unification of existing deep policy gradient techniques, 
* theoretical guarantees on the bias introduced by off-policy updates
* improves on the state-of-the-art model-free deep RL methods on a number of OpenAI Gym continuous control benchmarks.
