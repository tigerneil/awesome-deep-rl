Prioritized Experience Replay
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
