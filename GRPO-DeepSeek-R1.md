# DeepSeek-R1 & Group Relative Policy Optimization (GRPO): Incentivizing Reasoning via Verifiable RL

First public date: 2024-02-05 (DeepSeekMath GRPO) / 2025-01-22 (DeepSeek-R1). Journal venue: Nature (2025).

Authors: Daya Guo, Dejian Yang, Haowei Zhang, Junxiao Song, Ruoyu Zhang, Runxin Xu, Qihao Zhu, Shirong Ma, Peiyi Wang, Xiao Bi, Xiaokang Zhang, Xingkai Yu, Yu Wu, Z. F. Wu, Zhibin Gou, Zhihong Shao et al. (DeepSeek-AI).

## Method summary

Training a token-level value critic $V_\phi$ alongside a frontier LLM in [PPO](PPO.md) doubles memory footprint and struggles under sparse terminal verification rewards. **Group Relative Policy Optimization (GRPO)** eliminates the learned critic completely by sampling a group of $G$ completions per prompt and normalizing outcome rewards within each group. In **DeepSeek-R1-Zero** and **DeepSeek-R1**, large-scale verifiable RL with GRPO induces emergent self-verification, reflection, and long chain-of-thought reasoning—inspiring 2026 advances in long-context RL ([LoongRL](LoongRL.md)), reward budgeting ([Reward Budgeting](Reward-Budgeting.md)), likelihood gating ([LGPO](LGPO.md)), effective entropy ([VEPO](VEPO.md)), and embodied pointing ([Embodied-R1](Embodied-R1.md)).

## Mathematical formulation

For each prompt $q \sim \mathcal{D}$, GRPO samples a group $\{o_1, \dots, o_G\} \sim \pi_{\theta_{\text{old}}}(\cdot \mid q)$ with verifiable scalar rewards $\{r_1, \dots, r_G\}$, computes group-standardized advantages $\hat{A}_{i,t} = \frac{r_i - \operatorname{mean}(\mathbf{r})}{\operatorname{std}(\mathbf{r}) + \varepsilon}$, and maximizes the clipped surrogate with an unbiased non-negative KL estimator:

$$
\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{q,\, \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}}\!\left[\frac{1}{G}\sum_{i=1}^G \frac{1}{|o_i|}\sum_{t=1}^{|o_i|} \left(\min\!\Big(\rho_{i,t}(\theta)\hat{A}_{i,t},\; \operatorname{clip}\big(\rho_{i,t}(\theta), 1-\epsilon, 1+\epsilon\big)\hat{A}_{i,t}\Big) - \beta D_{\text{KL}}\!\big(\pi_\theta \,\|\, \pi_{\text{ref}}\big)\right)\right]
$$

where $\rho_{i,t}(\theta) = \frac{\pi_\theta(o_{i,t} \mid q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} \mid q, o_{i,<t})}$ and $D_{\text{KL}}(\pi_\theta \,\|\, \pi_{\text{ref}}) = \frac{\pi_{\text{ref}}(o_{i,t} \mid q, o_{i,<t})}{\pi_\theta(o_{i,t} \mid q, o_{i,<t})} - \log \frac{\pi_{\text{ref}}(o_{i,t} \mid q, o_{i,<t})}{\pi_\theta(o_{i,t} \mid q, o_{i,<t})} - 1$.

## Sources and artifacts

* DeepSeek-R1 (2025): [arXiv:2501.12948](https://arxiv.org/abs/2501.12948)
* DeepSeekMath / GRPO (2024): [arXiv:2402.03300](https://arxiv.org/abs/2402.03300)
* Code & weights: [https://github.com/deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
