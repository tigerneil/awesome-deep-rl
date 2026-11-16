# Prioritized Experience Replay

Tom Schaul, John Quan, Ioannis Antonoglou, David Silver

Experience replay lets online reinforcement learning agents remember and reuse
experiences from the past. In prior work, experience transitions were uniformly
sampled from a replay memory. However, this approach simply replays transitions
at the same frequency that they were originally experienced, regardless of their
significance. In this paper we develop a framework for prioritizing experience,
so as to replay important transitions more frequently, and therefore learn more
efficiently. We use prioritized experience replay in Deep Q-Networks (DQN), a
reinforcement learning algorithm that achieved human-level performance across
many Atari games. DQN with prioritized experience replay achieves a new stateof-the-art,
outperforming DQN with uniform replay on 41 out of 49 games.

## Mathematical formulation

Each replay transition $i$ with TD error $\delta_i$ receives priority $p_i = |\delta_i| + \epsilon$ (or rank-based $p_i = 1/\operatorname{rank}(i)$), inducing stochastic sampling distribution $P(i)$ and annealed importance-sampling weights $w_i$ to correct non-uniform replay bias:

$$
P(i) = \frac{p_i^\alpha}{\sum_k p_k^\alpha}, \qquad w_i = \left(\frac{1}{N \cdot P(i)}\right)^\beta \Big/\, \max_j w_j
$$

