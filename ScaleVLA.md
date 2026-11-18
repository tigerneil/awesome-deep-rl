# ScaleVLA: Scaling Vision-Language-Action Models to 552 Billion Parameters

First public date: 2026-11-16 (arXiv v1).

Authors: Ruixi Yu, Dairu Liu, Xuchuan Chen, Zekun Qi, Zekai Li, Zhuo Cao, Luyang Niu, Yingsheng Zhang, Sikai Liang, Ke Fan, He Wang, Li Yi.

Classification: 2026 · Embodied context (VLA backbone scaling, recent preprint).

## Method summary

Most Vision-Language-Action policies ([OpenVLA](OpenVLA.md), [π0](Pi0-Flow-VLA.md)) pair action heads with relatively compact 2B–9B VLM backbones. **ScaleVLA** conducts a controlled scaling study connecting VLM backbones from **2B up to a 552B MoE (`DeepSeek-V4.1-Flash`)** to a trainable Diffusion Transformer (`DiT`) action expert under a shared training protocol, testing sample efficiency, out-of-distribution generalization (`LIBERO-PRO`), and real-world contact-sensitive charger insertion at $216\text{ ms}$ median action-chunk latency.

## Mathematical formulation

Conditioned on multi-layer semantic-spatial representations $H_{\text{VLM}}(I_t, \ell)$ extracted from a 552B sparse-MoE VLM backbone, the action `DiT` expert $v_\theta(\mathbf{A}_t^\tau, H_{\text{VLM}}(I_t, \ell), q_t, \tau)$ optimizes continuous flow-matching / denoising velocity error over action chunks $\mathbf{A}_t \in \mathbb{R}^{H \times d_a}$:

$$
\mathcal{L}_{\text{ScaleVLA}}(\theta) = \mathbb{E}_{(I_t, \ell, q_t, \mathbf{A}_t) \sim \mathcal{D},\, \tau,\, \boldsymbol{\epsilon}}\!\left[\Big\|v_\theta\big(\tau \mathbf{A}_t + (1-\tau)\boldsymbol{\epsilon},\, H_{\text{VLM}}(I_t, \ell),\, q_t,\, \tau\big) - (\mathbf{A}_t - \boldsymbol{\epsilon})\Big\|_2^2\right]
$$

## Evaluation and evidence boundary

* **Reported scope**: 10 demonstrations with the 552B backbone outperform 50 demonstrations on a 2B backbone (87.8% vs. 85.6%), raise `LIBERO-PRO` generalization from 31.3% to 45.1%, and improve physical charger insertion from 4/10 to 9/10 at 216 ms median chunk latency.
* **Evidence boundary**: Classified strictly under **Embodied context** (`arXiv:2611.21607`)—the reported gains come from VLM representation scaling + `DiT` imitation training rather than online reinforcement learning, providing high-capacity prior context for downstream VLA RL ([S2C](S2C.md), [eRLT](eRLT.md)).

## Sources and artifacts

* Paper: [arXiv:2611.21607](https://arxiv.org/abs/2611.21607)
* Project page: [https://galaxygeneralrobotics.github.io/scalevla/](https://galaxygeneralrobotics.github.io/scalevla/)
