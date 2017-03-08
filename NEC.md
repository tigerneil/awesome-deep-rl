# Neural Episodic Control
Alexander Pritzel, Benigno Uria, Sriram Srinivasan, Adria, Oriol Vinyals, Demis Hassabis, Daan Wierstra, Charles Blundell

Deep reinforcement learning methods attain
super-human performance in a wide range of environments.
Such methods are grossly inefficient,
often taking orders of magnitudes more data than
humans to achieve reasonable performance. We
propose Neural Episodic Control: a deep reinforcement
learning agent that is able to rapidly
assimilate new experiences and act upon them.
Our agent uses a semi-tabular representation of
the value function: a buffer of past experience containing
slowly changing state representations and
rapidly updated estimates of the value function.
We show across a wide range of environments
that our agent learns significantly faster than other
state-of-the-art, general purpose deep reinforcement
learning agents.
