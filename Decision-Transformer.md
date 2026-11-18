# Decision Transformer: Reinforcement Learning via Sequence Modeling

First public date: 2021-06-02. Conference venue: NeurIPS 2021.

Authors: Lili Chen, Kevin Lu, Aravind Rajeswaran, Kimin Lee, Aditya Grover, Michael Laskin, Pieter Abbeel, Aravind Srinivas, Igor Mordatch.

## Method summary

Casting offline reinforcement learning as **conditional autoregressive sequence modeling** rather than Bellman dynamic programming, **Decision Transformer (DT)** feeds interleaved return-to-go, state, and action tokens into a causal GPT architecture. Conditioning generation on a desired future return $\hat{R}_1$ bypasses temporal-difference bootstrapping instabilities ("deadly triad") and enables long-horizon credit assignment via self-attention across Atari, D4RL locomotion, and Key-to-Door sparse-reward tasks.

## Mathematical formulation

A trajectory of length $T$ is tokenized as an interleaved sequence of returns-to-go $\hat{R}_t = \sum_{t'=t}^{T} r_{t'}$, states $s_t$, and actions $a_t$:

$$
\tau = \big(\hat{R}_1, s_1, a_1, \hat{R}_2, s_2, a_2, \dots, \hat{R}_T, s_T, a_T\big)
$$

Over context window $K$, a causal Transformer $\pi_\theta$ attends solely to past and current tokens $\tau_{\le t}$ to predict action $a_t$, minimizing supervised negative log-likelihood (or $\ell_2$ error for continuous actions) without discounting or Bellman backups:

$$
\mathcal{L}_{\text{DT}}(\theta) = \mathbb{E}_{\tau \sim \mathcal{D}}\!\left[\frac{1}{K}\sum_{t=1}^{K} -\log \pi_\theta\big(a_t \mid \hat{R}_{1:t}, s_{1:t}, a_{1:t-1}\big)\right]
$$

At evaluation, $\hat{R}_1$ is initialized to target expert return $R_{\text{target}}$ and decremented online via $\hat{R}_{t+1} = \hat{R}_t - r_t$.

## Sources and artifacts

* Paper: [arXiv:2106.01345](https://arxiv.org/abs/2106.01345)
* Code: [https://github.com/kzl/decision-transformer](https://github.com/kzl/decision-transformer)
