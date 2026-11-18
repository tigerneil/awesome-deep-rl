# The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games (MAPPO)

First public date: 2021-03-02. Conference venue: NeurIPS 2022 Datasets and Benchmarks Track.

Authors: Chao Yu, Akash Velu, Eugene Vinitsky, Jiaxuan Gao, Yu Wang, Alexandre Bayen, Yi Wu.

## Method summary

Off-policy value factorization ([QMIX](QMIX.md)) and deterministic multi-agent critics ([MADDPG](MADDPG.md)) were long assumed to dominate cooperative MARL in sample efficiency. **Multi-Agent PPO (MAPPO)** demonstrates that adapting [PPO](PPO.md) to Centralized Training with Decentralized Execution (`CTDE`)—with a centralized global-state value critic $V_\phi(s)$, value target normalization (`PopArt`), death masking, and small clipping epochs—matches or exceeds off-policy MARL across SMAC, MPE, Hanabi, and Google Research Football, inspiring embodied extensions such as [FMAPPO](FMAPPO.md).

## Mathematical formulation

Each agent $i \in \{1, \dots, n\}$ executes a decentralized policy $\pi_\theta(u_t^i \mid o_t^i)$ conditioned solely on local observation $o_t^i$, while a centralized critic $V_\phi(s_t^i)$ conditions on agent-specific global state features $s_t^i$ to compute centralized $\operatorname{GAE}(\gamma, \lambda)$ advantages $\hat{A}_t^i$ ([GAE](GAE.md)):

$$
L^{\text{MAPPO}}(\theta) = \frac{1}{B n}\sum_{b=1}^{B}\sum_{i=1}^{n} \min\!\Big(\rho_{b,i}(\theta)\,\hat{A}_{b,i},\; \operatorname{clip}\big(\rho_{b,i}(\theta), 1 - \epsilon, 1 + \epsilon\big)\hat{A}_{b,i}\Big) + \sigma \frac{1}{B n}\sum_{b,i} \mathcal{H}\big(\pi_\theta(\cdot \mid o_{b,i})\big)
$$

where $\rho_{b,i}(\theta) = \frac{\pi_\theta(u_{b,i} \mid o_{b,i})}{\pi_{\theta_{\text{old}}}(u_{b,i} \mid o_{b,i})}$ and the centralized critic minimizes clipped Huber error against PopArt-normalized multi-step returns.

## Sources and artifacts

* Paper: [arXiv:2103.01955](https://arxiv.org/abs/2103.01955)
* Code: [https://github.com/marlbenchmark/on-policy](https://github.com/marlbenchmark/on-policy)
