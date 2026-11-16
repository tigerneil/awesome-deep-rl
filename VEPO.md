# VEPO: Aligning LLM Exploration via Effective Entropy

First public date: 2026-11-11 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Xiaoliang Fu, Jiaye Lin, Yangyi Fang, Cong Qin, Binbin Zheng, Chaowen Hu, Zekai Shao.

Classification: 2026 · Conference RL (NeurIPS 2026).

## Method summary

*The Illusion of Diversity: Aligning LLM Exploration via Effective Entropy* shows that standard token-level or sequence-level entropy bonuses in RL with Verifiable Rewards (RLVR) fail to distinguish valid alternative reasoning strategies from incoherent hallucinations. The paper formalizes **Effective Entropy** and instantiates **Validity-aware Entropy Policy Optimization (VEPO)**:

1. **Subspace-restricted Effective Entropy**: Quantifies policy diversity strictly within the verified-valid trajectory subspace, filtering out entropy inflation caused by degenerate or incorrect rollouts.
2. **Adaptive attraction dynamic**: Incorporates Effective Entropy directly into the RLVR objective so under-explored *valid* trajectories receive amplified positive pull—matched to the small sequence-probability regime of autoregressive LLMs.
3. **Distinct strategy discovery**: Prevents mode collapse onto a single canonical solution path without degrading precision via blind exploration noise.

## Mathematical formulation

Let $\mathcal{V}(x) = \{y \in \mathcal{Y} : r(x, y) = 1\}$ denote the verified-valid reasoning subspace with total valid probability mass $Z_\theta(x) = \sum_{y \in \mathcal{V}(x)} \pi_\theta(y \mid x)$ and conditional valid distribution $\tilde{\pi}_\theta(y \mid x) = \pi_\theta(y \mid x) / Z_\theta(x)$. **Effective Entropy** measures diversity strictly inside $\mathcal{V}(x)$:

$$
\mathcal{H}_{\text{eff}}(\pi_\theta \mid x) = -\sum_{y \in \mathcal{V}(x)} \tilde{\pi}_\theta(y \mid x)\log \tilde{\pi}_\theta(y \mid x)
$$

VEPO augments the RLVR objective with $\alpha\,\mathcal{H}_{\text{eff}}(\pi_\theta \mid x)$, yielding an adaptive positive attraction weight on rare valid trajectories ($y \in \mathcal{V}(x)$ with small $\tilde{\pi}_\theta(y \mid x)$) while assigning zero entropy bonus to invalid hallucinations $y \notin \mathcal{V}(x)$.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across three random seeds on six mathematical reasoning benchmarks with 1.5B and 7B DeepSeek-R1-Distill-Qwen models, improving aggregate `pass@1` and `pass@k` over GRPO while discovering statistically more distinct valid solution strategies on MATH500.
* **Evidence boundary**: Requires an automatic validity verifier to partition valid from invalid rollouts when estimating Effective Entropy, and is evaluated on mathematical reasoning rather than continuous control (`arXiv:2611.15493`).

## Sources and artifacts

* Paper: [arXiv:2611.15493](https://arxiv.org/abs/2611.15493)
