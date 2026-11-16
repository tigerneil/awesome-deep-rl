# Noisy Networks for Exploration (NoisyNet)

Meire Fortunato, Mohammad Gheshlaghi Azar, Bilal Piot,
Jacob Menick, Ian Osband, Alex Graves, Vlad Mnih,
Remi Munos, Demis Hassabis, Olivier Pietquin, Charles Blundell,
Shane Legg

https://arxiv.org/pdf/1706.10295.pdf

We introduce NoisyNet, a deep reinforcement learning agent with parametric noise
added to its weights, and show that the induced stochasticity of the agent’s policy
can be used to aid efficient exploration. The parameters of the noise are learned
with gradient descent along with the remaining network weights. NoisyNet is
straightforward to implement and adds little computational overhead. We find that
replacing the conventional exploration heuristics for A3C, DQN and dueling agents
(entropy reward and $\epsilon$-greedy respectively) with NoisyNet yields substantially
higher scores for a wide range of Atari games, in some cases advancing the agent
from sub to super-human performance.

## Mathematical formulation

NoisyNet replaces standard affine layers $y = wx + b$ with parameterized stochastic linear layers where $(\mu^w, \sigma^w, \mu^b, \sigma^b)$ are learnable parameters and $(\varepsilon^w, \varepsilon^b)$ are zero-mean noise variables:

$$
y \stackrel{D}{=} (\mu^w + \sigma^w \odot \varepsilon^w)x + \mu^b + \sigma^b \odot \varepsilon^b
$$

To reduce random-number generation from $pq + q$ to $p + q$ per layer, factorised Gaussian noise sets $\varepsilon_{i,j}^w = f(\varepsilon_i)f(\varepsilon_j)$ and $\varepsilon_j^b = f(\varepsilon_j)$ using $f(x) = \operatorname{sgn}(x)\sqrt{|x|}$.

