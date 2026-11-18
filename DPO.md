# Direct Preference Optimization: Your Language Model is Secretly a Reward Model (DPO)

First public date: 2023-05-29. Conference venue: NeurIPS 2023.

Authors: Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn.

## Method summary

Classical [RLHF](RLHF-InstructGPT.md) requires fitting a separate reward network and running online actor-critic rollouts ([PPO](PPO.md)). **Direct Preference Optimization (DPO)** derives a closed-form mapping between the KL-constrained optimal policy $\pi^*$ and its underlying reward function $r(x, y)$, substituting that analytic reward directly into the Bradley–Terry preference likelihood to optimize $\pi_\theta$ via a single stable binary cross-entropy loss without online sampling or a separate critic.

## Mathematical formulation

Because the KL-regularized RL objective $\max_\pi \mathbb{E}_{y \sim \pi}[r(x, y)] - \beta D_{\text{KL}}(\pi \,\|\, \pi_{\text{ref}})$ admits the closed-form solution $\pi_r(y \mid x) = \frac{1}{Z(x)}\pi_{\text{ref}}(y \mid x)\exp\!\big(\frac{1}{\beta}r(x, y)\big)$, reparameterizing $r(x, y) = \beta \log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)} + \beta \log Z(x)$ cancels the intractable partition function $Z(x)$ inside pairwise differences:

$$
\mathcal{L}_{\text{DPO}}(\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}}\!\left[\log \sigma\!\left(\beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)}\right)\right]
$$

Note the **evidence boundary** separating offline DPO from online RL: DPO optimizes over a static preference dataset without online exploration, motivating online verifiable RL ([GRPO / DeepSeek-R1](GRPO-DeepSeek-R1.md), [NOPO](NOPO.md), [SDPO](SDPO.md)) for multi-step reasoning.

## Sources and artifacts

* Paper: [arXiv:2305.18290](https://arxiv.org/abs/2305.18290)
* Code: [https://github.com/eric-mitchell/direct-preference-optimization](https://github.com/eric-mitchell/direct-preference-optimization)
