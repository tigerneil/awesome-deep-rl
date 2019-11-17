# Provably Convergent Off-Policy Actor-Critic with Function Approximation
> Shangtong Zhang, Bo Liu, Hengshuai Yao, Shimon Whiteson

## Abstract
We present the first provably convergent offpolicy actor-critic algorithm (COF-PAC) with function approximation in a two-timescale form.

Key to COF-PAC is the introduction of a new critic, the emphasis critic, which is trained via Gradient Emphasis Learning (GEM), a novel combination of the key ideas of Gradient Temporal Difference Learning and Emphatic Temporal Difference Learning. 

With the help of the emphasis critic and the canonical value function critic, we show convergence for COF-PAC, where the critics are linear and the actor can be nonlinear.
