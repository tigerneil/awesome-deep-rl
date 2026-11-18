# Training Language Models to Follow Instructions with Human Feedback (RLHF / InstructGPT)

First public date: 2022-03-04. Conference venue: NeurIPS 2022.

Authors: Long Ouyang, Jeff Wu, Xu Jiang, Diogo Almeida, Carroll L. Wainwright, Pamela Mishkin, Chong Zhang, Sandhini Agarwal, Katarina Slama, Alex Ray, John Schulman, Jacob Hilton, Fraser Kelton, Luke Miller, Maddie Simens, Amanda Askell, Peter Welinder, Paul Christiano, Jan Leike, Ryan Lowe.

## Method summary

Pretraining on next-token prediction optimizes internet likelihood rather than user intent, helpfulness, or truthfulness. **InstructGPT** crystallized the three-stage **Reinforcement Learning from Human Feedback (RLHF)** pipeline—Supervised Fine-Tuning (`SFT`), pairwise Bradley–Terry Reward Modeling (`RM`), and KL-regularized [PPO](PPO.md) post-training—demonstrating that a 1.3B RLHF model can be preferred by human evaluators over a 175B unaligned base model and laying the foundation for [DPO](DPO.md), [GRPO](GRPO-DeepSeek-R1.md), and 2026 post-training methods ([SDPO](SDPO.md), [RcRL](RcRL.md)).

## Mathematical formulation

Given prompt $x$ and human preference $y_w \succ y_l$, the reward model $r_\psi(x, y)$ minimizes the pairwise Bradley–Terry negative log-likelihood:

$$
\mathcal{L}_{\text{RM}}(\psi) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}_{\text{pref}}}\!\Big[\log \sigma\!\big(r_\psi(x, y_w) - r_\psi(x, y_l)\big)\Big]
$$

In the RL phase, policy $\pi_\theta$ maximizes reward-model score regularized by a per-token reverse KL penalty against $\pi_{\text{SFT}}$ (optionally mixed with pretraining log-likelihood $\gamma_{\text{ptx}}$ in `PPO-ptx` to mitigate alignment tax):

$$
J_{\text{RLHF}}(\theta) = \mathbb{E}_{(x, y) \sim \mathcal{D}_{\pi_\theta}}\!\left[r_\psi(x, y) - \beta \log \frac{\pi_\theta(y \mid x)}{\pi_{\text{SFT}}(y \mid x)}\right] + \gamma_{\text{ptx}}\,\mathbb{E}_{x \sim \mathcal{D}_{\text{pretrain}}}\!\big[\log \pi_\theta(x)\big]
$$

## Sources and artifacts

* Paper: [arXiv:2203.02155](https://arxiv.org/abs/2203.02155)
