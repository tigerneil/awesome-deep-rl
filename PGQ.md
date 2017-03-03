# PGQ: COMBINING POLICY GRADIENT AND Q-LEARNING
Brendan O’Donoghue, Rémi Munos, Koray Kavukcuoglu & Volodymyr Mnih {Deepmind}

Policy gradient is an efficient technique for improving a policy in a reinforcement learning setting. 

However, vanilla online variants are on-policy only and not able to take advantage of off-policy data.

A new technique that combines policy gradient with off-policy Q-learning, drawing experience from a replay buffer. 

**Making a connection between the fixed points of the regularized policy gradient algorithm and the Q-values.**

we can estimate the Q-values from the action preferences of the policy, to which we apply Q-learning updates. 

## Algorithm
‘PGQ’, for policy gradient and Q-learning. 

An equivalency between action-value fitting techniques and actor-critic algorithms, 
showing that regularized policy gradient techniques can be interpreted as advantage function learning algorithms. 


We conclude with some numerical examples that demonstrate improved data efficiency and stability of PGQ. 

We tested PGQ on the full suite of Atari games and achieved performance exceeding that of both asynchronous advantage 
actor-critic (A3C) and Q-learning.
