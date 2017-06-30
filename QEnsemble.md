UCB and InfoGain Exploration via Q-Ensembles

Richard Y. Chen
OpenAI
richardchen@openai.com
Szymon Sidor
OpenAI
szymon@openai.com
Pieter Abbeel
OpenAI
University of California, Berkeley
pieter@openai.com
John Schulman
OpenAI
joschu@openai.com

We show how an ensemble of Q∗
-functions can be leveraged for more effective
exploration in deep reinforcement learning. We build on well established algorithms
from the bandit setting, and adapt them to the Q-learning setting. First we
propose an exploration strategy based on upper-confidence bounds (UCB). Next,
we define an “InfoGain” exploration bonus, which depends on the disagreement of
the Q-ensemble. Our experiments show significant gains on the Atari benchmark.
