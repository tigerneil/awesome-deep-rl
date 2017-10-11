# Learning from Demonstrations for Real World Reinforcement Learning

Todd Hester, Matej Vecerik, Olivier Pietquin, Marc Lanctot, Tom Schaul, Bilal Piot, Dan Horgan, John Quan, Andrew Sendonaris, Gabriel Dulac-Arnold, Ian Osband, John Agapiou, Joel Z. Leibo, Audrunas Gruslys

DeepMind

https://arxiv.org/pdf/1704.03732.pdf

Deep reinforcement learning (RL) has achieved several high profile successes in
difficult decision-making problems. However, these algorithms typically require
a huge amount of data before they reach reasonable performance. In fact, their
performance during learning can be extremely poor. This may be acceptable for
a simulator, but it severely limits the applicability of deep RL to many real-world
tasks, where the agent must learn in the real environment. In this paper we study a
setting where the agent may access data from previous control of the system. We
present an algorithm, Deep Q-learning from Demonstrations (DQfD), that leverages
this data to massively accelerate the learning process even from relatively
small amounts of demonstration data and is able to automatically assess the necessary
ratio of demonstration data while learning thanks to a prioritized replay
mechanism. DQfD works by combining temporal difference updates with supervised
classification of the demonstrator’s actions. We show that DQfD has better
initial performance than Prioritized Dueling Double Deep Q-Networks (PDD
DQN) as it starts with better scores on the first million steps on 41 of 42 games
and on average it takes PDD DQN 82 million steps to catch up to DQfD’s performance.
DQfD learns to out-perform the best demonstration given in 14 of 42
games. In addition, DQfD leverages human demonstrations to achieve state-ofthe-art
results for 17 games. Finally, we show that DQfD performs better than
three related algorithms for incorporating demonstration data into DQN.
