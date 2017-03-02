# Bridging the Gap Between Value and Policy Based Reinforcement Learning

Ofir Nachum, Mohammad Norouzi, Kelvin Xu, Dale Schuurmans

A new notion of softmax temporal consistency that generalizes the standard hardmax Bellman consistency usually considered in value based reinforcement learning (RL). 

softmax consistent action values correspond to optimal policies that maximize entropy regularized expected reward. 

softmax consistent action values and the optimal policy must satisfy a mutual compatibility property that holds across any state-action subsequence. 

## New algorithm
Path Consistency Learning (PCL), that minimizes the total inconsistency measured along multi-step subsequences extracted from both on and off policy traces.

## Contributions
* A complete characterization of softmax temporal consistency, which generalizes the commonly used hardmax Bellman consistency.
* A proof that Q-values satisfying softmax temporal consistency directly determine the optimal policy that maximizes entropy regularized expected discounted reward.
* Identification of a new multi-step path-wise softmax consistency property that relates the optimal Q-values at the end points of any path to the log-probabilities of the optimal policy along actions of that path.
* An effective RL algorithm, Path Consistency Learning, that exploits multi-step path-wise consistency and combines elements of value and policy based RL.
* Strong experimental results versus current actor-critic and Q-learning baselines.
