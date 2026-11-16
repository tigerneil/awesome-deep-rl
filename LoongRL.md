# LoongRL: Reinforcement Learning for Advanced Reasoning over Long Contexts

First public date: 2025-10-22 (arXiv v1). Conference venue: ICLR 2026 Oral.

Authors: Siyuan Wang, Gaokai Zhang, Li Lyna Zhang, Ning Shang, Fan Yang, Dongyao Chen, Mao Yang.

Classification: 2026 · Agent RL (ICLR 2026 Oral).

## Method summary

LoongRL targets long-context multi-hop reasoning with reinforcement learning without incurring prohibitive full-length rollout costs across 128K-token prompts:

1. **`KeyChain` synthetic long-context curriculum**: Converts short multi-hop QA instances into controllable long-context tasks by embedding UUID pointer chains that hide the target question amidst large collections of multi-level distractor documents.
2. **Emergent `plan-retrieve-reason-recheck` behavior**: Group Relative Policy Optimization (GRPO) over `KeyChain` tasks induces structured multi-step retrieval and verification loops rather than shallow keyword guessing.
3. **Short-to-long length generalization**: Training RL rollouts at 16K context length transfers zero-shot to 128K-token tasks while preserving short-context mathematical and general reasoning accuracy.

## Mathematical formulation

Given a `KeyChain` instance $x_{L_{\text{train}}}$ embedding an $m$-hop UUID pointer chain $(u_0 \to u_1 \to \dots \to u_m \to q^*)$ inside distractor context of length $L_{\text{train}} = 16\text{K}$, LoongRL optimizes the clipped group-relative objective over rollout groups $\{y_i\}_{i=1}^G$ with verifiable exact-match reward $r_i \in \{0, 1\}$:

$$
\mathcal{J}_{\text{LoongRL}}(\theta) = \mathbb{E}_{x_{L_{\text{train}}},\, \{y_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}}\!\left[\frac{1}{G}\sum_{i=1}^G \frac{1}{|y_i|}\sum_{t=1}^{|y_i|} \min\!\Big(\rho_{i,t}(\theta)\hat{A}_i,\; \operatorname{clip}\big(\rho_{i,t}(\theta), 1-\epsilon, 1+\epsilon\big)\hat{A}_i\Big)\right], \qquad \hat{A}_i = \frac{r_i - \bar{r}}{\sigma_r + \delta}
$$

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on Qwen2.5-7B and Qwen2.5-14B, improving long-context multi-hop QA accuracy by +23.5 and +21.1 percentage points respectively (reaching 74.2 on LoongRL-14B) and passing 128K needle-in-a-haystack stress tests.
* **Evidence boundary**: First posted on arXiv in October 2025 (`arXiv:2510.19363`) and presented as an ICLR 2026 Oral; relies on synthetic UUID-chain structure during RL training and evaluates document QA/retrieval rather than interactive physical environments.

## Sources and artifacts

* Paper: [arXiv:2510.19363](https://arxiv.org/abs/2510.19363)
* Code: [https://github.com/rStar-RL/LoongRL](https://github.com/rStar-RL/LoongRL)
