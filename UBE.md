# The Uncertainty Bellman Equation and Exploration (UBE)

Brendan O’Donoghue, Ian Osband, Remi Munos, Volodymyr Mnih
Deepmind
{bodonoghue, iosband, munos, vmnih}@google.com
September 19, 2017

Abstract

We consider the exploration/exploitation problem in reinforcement learning. For exploitation, it is
well known that the Bellman equation connects the value at any time-step to the expected value at
subsequent time-steps. In this paper we consider a similar uncertainty Bellman equation (UBE), which
connects the uncertainty at any time-step to the expected uncertainties at subsequent time-steps, thereby
extending the potential exploratory benefit of a policy beyond individual time-steps. We prove that the
unique fixed point of the UBE yields an upper bound on the variance of the estimated value of any fixed
policy. This bound can be much tighter than traditional count-based bonuses that compound standard
deviation rather than variance. Importantly, and unlike several existing approaches to optimism, this
method scales naturally to large systems with complex generalization. Substituting our UBE-exploration
strategy for $\epsilon$-greedy improves DQN performance on 51 out of 57 games in the Atari suite.

## Mathematical formulation

Let $v(s, a)$ upper-bound the local one-step posterior variance of expected reward and transition value at $(s, a)$. The Uncertainty Bellman Equation propagates epistemic variance—rather than standard deviation—across horizons to bound $\operatorname{Var}[\widehat{Q}^\pi(s, a)] \le u^\pi(s, a)$:

$$
u^\pi(s, a) = v(s, a) + \gamma^2 \mathbb{E}_{s' \sim P(\cdot \mid s, a),\, a' \sim \pi(\cdot \mid s')}\!\big[u^\pi(s', a')\big], \qquad a_t = \arg\max_a \left(\widehat{Q}(s_t, a) + \beta \sqrt{u(s_t, a)}\right)
$$

