# ProMP: Proximal Meta-Policy Search
Jonas Rothfuss, Dennis Lee, Ignasi Clavera, Tamim Asfour, Pieter Abbeel

Credit assignment in Meta-reinforcement learning (Meta-RL) is still poorly understood. 

Existing methods either neglect credit assignment to pre-adaptation behavior or implement it naively. 

This leads to poor sample-efficiency during meta-training as well as ineffective task identification strategies. 

This paper provides a theoretical analysis of credit assignment in gradient-based Meta-RL.

Building on the gained insights we develop a novel meta-learning algorithm that overcomes both the issue of poor credit assignment and previous difficulties in estimating meta-policy gradients. 

By controlling the statistical distance of both pre-adaptation and adapted policies during meta-policy search, the proposed algorithm endows efficient and stable meta-learning. 

Our approach leads to superior pre-adaptation policy behavior and consistently outperforms previous Meta-RL algorithms in sample-efficiency, wall-clock time, and asymptotic performance.
