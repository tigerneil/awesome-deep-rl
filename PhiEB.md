Count-Based Exploration in Feature Space for Reinforcement Learning
Jarryd Martin, Suraj Narayanan S., Tom Everitt, Marcus Hutter

We introduce a new count-based optimistic exploration
algorithm for reinforcement learning
(RL) that is feasible in environments with highdimensional
state-action spaces. The success of
RL algorithms in these domains depends crucially
on generalisation from limited training experience.
Function approximation techniques enable
RL agents to generalise in order to estimate the
value of unvisited states, but at present few methods
enable generalisation regarding uncertainty. This
has prevented the combination of scalable RL algorithms
with efficient exploration strategies that
drive the agent to reduce its uncertainty. We
present a new method for computing a generalised
state visit-count, which allows the agent to estimate
the uncertainty associated with any state. Our
φ-pseudocount achieves generalisation by exploiting
the same feature representation of the state
space that is used for value function approximation.
States that have less frequently observed features
are deemed more uncertain. The φ-ExplorationBonus
algorithm rewards the agent for exploring
in feature space rather than in the untransformed
state space. The method is simpler and less computationally
expensive than some previous proposals,
and achieves near state-of-the-art results on highdimensional
RL benchmarks.

https://arxiv.org/pdf/1706.08090.pdf
