# Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm (AlphaZero)

First public date: 2017-12-05. Journal venue: Science (2018).

Authors: David Silver, Thomas Hubert, Julian Schrittwieser, Ioannis Antonoglou, Matthew Lai, Arthur Guez, Marc Lanctot, Laurent Sifre, Dharshan Kumaran, Thore Graepel, Timothy Lillicrap, Karen Simonyan, Demis Hassabis.

## Method summary

Eliminating all human game records, handcrafted evaluation features, and domain-specific symmetries used in earlier game engines, **AlphaZero** couples a two-headed deep residual network $\big(\mathbf{p}_\theta(s), v_\theta(s)\big)$ with Monte Carlo Tree Search (**MCTS**) inside an iterative policy-improvement / self-play loop across Go, Chess, and Shogi—establishing the general **Expert Iteration** paradigm later extended without known simulators in [MuZero](MuZero.md) and searchless distillation in [PGS](PGS.md).

## Mathematical formulation

During tree search at state $s$, MCTS selects actions maximizing the Predictor + Upper Confidence Bound (`PUCT`) score using neural prior $P(s, a) = p_\theta(a \mid s)$, action-value mean $Q(s, a)$, and visit counts $N(s, a)$:

$$
a^* = \arg\max_{a \in \mathcal{A}} \left(Q(s, a) + c_{\text{puct}}\,P(s, a)\frac{\sqrt{\sum_b N(s, b)}}{1 + N(s, a)}\right)
$$

MCTS visit counts induce an improved search policy $\pi_{\text{MCTS}}(a \mid s_t) \propto N(s_t, a)^{1/\tau}$. Given terminal self-play outcome $z \in \{-1, 0, +1\}$, network parameters $\theta$ minimize value mean-squared error plus search-policy cross-entropy:

$$
\mathcal{L}(\theta) = (z - v_\theta(s_t))^2 - \boldsymbol{\pi}_{\text{MCTS}}(s_t)^\top \log \mathbf{p}_\theta(s_t) + c\|\theta\|_2^2
$$

## Sources and artifacts

* Paper: [arXiv:1712.01815](https://arxiv.org/abs/1712.01815) · [Science DOI](https://www.science.org/doi/10.1126/science.aar6404)
