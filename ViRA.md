# ViRA: Ultra-High-Resolution Visual Agents via Cross-Input Relative Policy Optimization

First public date: 2026-11-16 (arXiv v1).

Authors: Huawei Lin, Jinting Liu, Tongyan Wang, Xuyang Chen, Ruihua Shi, Zhichao Xu, Jiaxin Qin, Guoshenghui Zhao, Baijian Yang, Yingjie Victor Chen, Tan Yu, Weijie Zhao.

Classification: 2026 · Agent RL (recent preprint).

## Method summary

Visual tool-using agents that inspect ultra-high-resolution images by cropping/zooming frequently shortcut standard outcome RL ([GRPO](GRPO-DeepSeek-R1.md)): when an agent guesses the right answer from language/world priors without zooming into the target region, single-input outcome reward reinforces ungrounded guessing equally with genuine visual evidence gathering. **ViRA** introduces **Cross-Input Relative Policy Optimization (CrossRPO)** over minimally edited **visual contrast sets**—groups of images identical everywhere except inside a small localized evidence patch—so only active visual inspection achieves positive cross-input advantage.

## Mathematical formulation

Let $\mathcal{C}(q) = \{(I^{(m)}, y^{*(m)})\}_{m=1}^M$ denote a contrast set sharing question $q$ across $M$ minimally perturbed high-resolution images with distinct ground-truth answers $y^{*(m)}$. Sampling rollouts $\tau_{m,g} \sim \pi_{\theta_{\text{old}}}(\cdot \mid I^{(m)}, q)$ with binary verification rewards $r_{m,g} = \mathbb{I}[\hat{y}(\tau_{m,g}) = y^{*(m)}]$, CrossRPO couples within-image relative advantages with a cross-input consistency factor $w_{\text{cross}}(\mathcal{C})$ that suppresses lucky prior guesses failing on counterfactual variants:

$$
\hat{A}_{m,g}^{\text{CrossRPO}} = w_{\text{cross}}\!\big(\{r_{m',g'}\}_{m'=1}^M\big)\cdot \frac{r_{m,g} - \mu_{m}}{\sigma_{m} + \varepsilon} - \lambda_{\text{prior}}\,\mathbb{I}\!\left[\text{consistency across } m \text{ fails}\right]
$$

Policy parameters $\theta$ are updated via clipped importance ratios over zoom/crop tool-call trajectories $\tau_{m,g}$.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on ultra-high-resolution visual agent benchmarks requiring multi-step zoom/crop inspection, reducing prior-driven hallucination and improving grounded evidence localization over standard single-image GRPO.
* **Evidence boundary**: Recent arXiv preprint (`arXiv:2611.21605`); requires constructing localized counterfactual visual contrast sets during training and targets 2D visual tool agents rather than physical manipulation.

## Sources and artifacts

* Paper: [arXiv:2611.21605](https://arxiv.org/abs/2611.21605)
* Code: [https://github.com/huawei-lin/ViRA](https://github.com/huawei-lin/ViRA)
