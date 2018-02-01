# Expected Policy Gradients for Reinforcement Learning

Kamil Ciosek kamil.ciosek@cs.ox.ac.uk
Shimon Whiteson shimon.whiteson@cs.ox.ac.uk
Department of Computer Science, University of Oxford

We propose expected policy gradients (EPG), which unify stochastic policy gradients (SPG) and deterministic policy gradients (DPG) for reinforcement learning. Inspired by expected
sarsa, EPG integrates (or sums) across actions when estimating the gradient, instead of relying only on the action in the sampled trajectory. For continuous action spaces, we first
derive a practical result for Gaussian policies and quadric critics and then extend it to an analytical method for the universal case, covering a broad class of actors and critics,
including Gaussian, exponential families, and reparameterised policies with bounded support. 


For Gaussian policies, we show that it is optimal to explore using covariance proportional to $e^H$, where $H$ is the scaled Hessian of the critic with respect to the actions. EPG also
provides a general framework for reasoning about policy gradient methods, which we use to establish a new general policy gradient theorem, of which the stochastic and deterministic
policy gradient theorems are special cases. Furthermore, we prove that EPG reduces the variance of the gradient estimates without requiring deterministic policies and with little
computational overhead. Finally, we show that EPG outperforms existing approaches on six challenging domains involving the simulated control of physical systems.
