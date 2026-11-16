# HyperSkill: Training-Free Omnimodal GRPO via Hypergraph-Indexed Skill-Library Evolution

First public date: 2026-11-11 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Haoran Luo, Shangkai Lin, Jinyang Wu, Xinliang Zhou, Luu Anh Tuan.

Classification: 2026 · Agent RL (NeurIPS 2026; training-free non-parametric skill-library evolution).

## Method summary

HyperSkill adapts Group Relative Policy Optimization (GRPO) group-advantage signals to evolve a structured external skill library while keeping the underlying omnimodal foundation model weights completely frozen:

1. **Hypergraph-indexed skill library**: Represents individual skills as advantage-bearing nodes and multi-skill compositions as hyperedges, replacing flat correlation-based text memories with auditable relational structure.
2. **Counterfactual training-time skill distillation**: Admits candidate skills only after counterfactual advantage verification across group rollouts and distills an explicit execution-protocol skill from failure trajectories.
3. **Gated hypergraph retrieval and answer commitment**: Uses a per-dataset gate to inject advantage-ranked skills and multi-skill hyperedges at inference time, paired with a commitment protocol for the frozen backbone.

## Mathematical formulation

With frozen backbone parameters $\theta_0$, HyperSkill optimizes a discrete skill hypergraph $\mathcal{H} = (\mathcal{V}, \mathcal{E})$ rather than weights. A candidate skill or hyperedge $e \subseteq \mathcal{V}$ is admitted when its counterfactual group-relative advantage across $G$ rollouts is strictly positive:

$$
\Delta \widehat{A}(e \mid x) = \frac{1}{G}\sum_{i=1}^G R\!\big(y_i^{(+e)}, x\big) - \frac{1}{G}\sum_{i=1}^G R\!\big(y_i^{(-e)}, x\big) > \tau_{\text{adm}}, \qquad y_i^{(+e)} \sim \pi_{\theta_0}\!\big(\cdot \mid x, \mathcal{R}_{\mathcal{H}}(x) \cup \{e\}\big)
$$

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across 11 text, vision-language, and omnimodal reasoning benchmarks, matching or outperforming training-free memory baselines on every dataset (+13.0 average F1 points over the strongest baseline) without updating model parameters.
* **Evidence boundary**: "Training-Free GRPO" refers to optimizing discrete edits and advantage rankings inside an external textual hypergraph library rather than performing gradient-based RL weight updates; bounded by the frozen backbone's in-context instruction-following capacity (`arXiv:2611.15178`).

## Sources and artifacts

* Paper: [arXiv:2611.15178](https://arxiv.org/abs/2611.15178)
* Code & data: [https://github.com/LHRLAB/HyperSkill](https://github.com/LHRLAB/HyperSkill)
