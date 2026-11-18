# Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model (MuZero)

First public date: 2019-11-19. Journal venue: Nature (2020).

Authors: Julian Schrittwieser, Ioannis Antonoglou, Thomas Hubert, Karen Simonyan, Laurent Sifre, Simon Schmitt, Arthur Guez, Edward Lockhart, Demis Hassabis, Thore Graepel, Timothy Lillicrap, David Silver.

## Method summary

Model-based planning in visually complex domains traditionally failed when pixel-reconstruction errors compounded over rollouts. **MuZero** abandons observation reconstruction altogether, learning a **value-equivalent** latent model trained strictly to predict the three quantities directly required for MCTS planning—reward, policy prior, and value—matching [AlphaZero](AlphaZero.md) in board games while surpassing model-free baselines across 57 Atari games and inspiring [Self-Consistent Models and Values](sc.md) and [TD-MPC2](TD-MPC2.md).

## Mathematical formulation

MuZero comprises a representation network $s^0 = h_\theta(o_1, \dots, o_t)$, a latent dynamics network $(r^k, s^k) = g_\theta(s^{k-1}, a_{t+k})$, and a prediction network $(\mathbf{p}^k, v^k) = f_\theta(s^k)$. Unrolling $K$ hypothetical steps from $s^0$ along executed actions $(a_{t+1}, \dots, a_{t+K})$, MuZero optimizes end-to-end value equivalence without decoding $o_{t+k}$:

$$
\mathcal{L}_t(\theta) = \sum_{k=0}^{K} \Big(\ell^r(u_{t+k}, r_t^k) + \ell^v(z_{t+k}, v_t^k) + \ell^p(\boldsymbol{\pi}_{t+k}, \mathbf{p}_t^k)\Big) + c\|\theta\|_2^2
$$

where $u_{t+k}$ is the observed step reward, $\boldsymbol{\pi}_{t+k}$ is the MCTS visit distribution from latent root search, and $z_{t+k}$ is an $n$-step bootstrapped value target.

## Sources and artifacts

* Paper: [arXiv:1911.08265](https://arxiv.org/abs/1911.08265) · [Nature DOI](https://www.nature.com/articles/s41586-020-03051-4)
