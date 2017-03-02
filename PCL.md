# Bridging the Gap Between Value and Policy Based Reinforcement Learning

Ofir Nachum, Mohammad Norouzi, Kelvin Xu, Dale Schuurmans

A new notion of softmax temporal consistency that generalizes the standard hardmax Bellman consistency usually considered in 
value based reinforcement learning (RL). 


softmax consistent action values correspond to optimal policies that maximize
entropy regularized expected reward. 

softmax consistent action values and the optimal policy must 
satisfy a mutual compatibility property that holds across any state-action subsequence. 

## New algorithm
Path Consistency Learning (PCL), that minimizes the total inconsistency measured along multi-step subsequences extracted from both on and off policy traces. 

An experimental evaluation demonstrates that PCL significantly outperforms strong actor-critic and Q-learning baselines across several benchmark tasks.
