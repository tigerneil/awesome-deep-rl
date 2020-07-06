# An operator view of policy gradient methods
> Dibya Ghosh, Marlos C. Machado, and Nicolas Le Roux

## Abstract
We cast policy gradient methods as the repeated application of two operators: a policy improvement operator I, which maps any policy π to a better one Iπ, and a projection operator P, which finds the best approximation of Iπ in the set of realizable policies. 

We use this framework to introduce operator-based versions of traditional policy gradient methods such as Reinforce and PPO, which leads to a better understanding of their original counterparts. 

We also use the understanding we develop of the role of I and P to propose a new global lower bound of the expected return. 

This new perspective allows us to further bridge the gap between policy-based and value-based methods, showing how Reinforce and the Bellman optimality operator, for example, can be seen as two sides of the same coin.

download link: https://arxiv.org/pdf/2006.11266.pdf
