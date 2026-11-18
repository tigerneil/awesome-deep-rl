# Regularized Score Centering (RSC)

First public date: 2026-11-16 (arXiv v1).

Authors: Hao Bai, Chenlu Ye, Xuanchang Zhang, Aviral Kumar, Tong Zhang.

Classification: 2026 · Conference RL / Asynchronous Agentic RL (recent preprint).

## Method summary

Asynchronous RL post-training maximizes hardware throughput for long-horizon coding, tool-use, and web agents, but stale behavior-policy rollouts $\mu$ and inference–training numerical precision drift destabilize standard importance sampling (`IS`) and [GRPO](GRPO-DeepSeek-R1.md). While **Score Centering (SC)** eliminates reward-baseline sensitivity in expectation, SC diverges when $\pi_\theta$ drifts far from the behavior policy $\mu$. **Regularized Score Centering (RSC)** augments score-centered off-policy updates with a token-level reverse KL penalty anchoring $\pi_\theta$ toward the behavior policy $\mu$ (compatible with or without truncated importance sampling `TIS`, cf. [IMPALA](IMPALA.md)).

## Mathematical formulation

Given trajectories generated asynchronously by stale behavior policy $\mu$, Score Centering centers the score function $\nabla_\theta \log \pi_\theta(a_t \mid s_t) - \mathbb{E}_{a' \sim \pi_\theta(\cdot \mid s_t)}[\nabla_\theta \log \pi_\theta(a' \mid s_t)] = \nabla_\theta \log \pi_\theta(a_t \mid s_t)$ against centered return/advantage differences while RSC adds a token-level reverse KL trust anchor $D_{\text{KL}}\!\big(\pi_\theta(\cdot \mid s_t) \,\big\|\, \mu(\cdot \mid s_t)\big)$ with optional truncated importance weight $\tilde{w}_t = \min\!\big(\bar{c}, \frac{\pi_\theta(a_t \mid s_t)}{\mu(a_t \mid s_t)}\big)$:

$$
\mathcal{J}_{\text{RSC}}(\theta) = \mathbb{E}_{(s_t, a_t) \sim \mu}\!\left[\tilde{w}_t\,\big(R_t - \bar{R}(s_0)\big)\log \pi_\theta(a_t \mid s_t) - \eta\,D_{\text{KL}}\!\Big(\pi_\theta(\cdot \mid s_t) \,\Big\|\, \mu(\cdot \mid s_t)\Big)\right]
$$

Theoretical convergence bounds establish that reverse-KL regularization toward $\mu$ controls off-policy drift without collapsing gradient variance when actor lag grows.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across dense and Mixture-of-Experts (`MoE`) LLMs on mathematical reasoning and six multi-turn agentic benchmarks (AppWorld, BabyAI, online shopping, tool use, games, and fully asynchronous software engineering), reporting +14.3% on AppWorld and $9.9\times$ baseline score on BabyAI under equal sample budgets.
* **Evidence boundary**: Recent arXiv preprint (`arXiv:2611.21791`); evaluated on digital reasoning and asynchronous LLM agent environments rather than continuous robotic control.

## Sources and artifacts

* Paper: [arXiv:2611.21791](https://arxiv.org/abs/2611.21791)
