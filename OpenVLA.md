# OpenVLA: An Open-Source Vision-Language-Action Model

First public date: 2024-06-13. Conference venue: CoRL 2024.

Authors: Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, Quan Vuong, Thomas Kollar, Benjamin Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey Levine, Percy Liang, Chelsea Finn.

## Method summary

Establishing an open-weights foundation policy stack for generalist robot manipulation, **OpenVLA** fuses dual visual encoders (`SigLIP` semantic features + `DINOv2` spatial geometry) onto a 7B `Llama 2` language backbone pretrained across 970K real-robot episodes from Open X-Embodiment. While OpenVLA itself is trained via behavioral cloning rather than online RL, it serves as the primary base policy for 2026 online, residual, and world-model RL post-training ([eRLT](eRLT.md), [AtomicRL](AtomicRL.md), [VLaRL](VLaRL.md), [DRIVE](DRIVE.md), [WoVR+](WoVR-Plus.md)).

## Mathematical formulation

Continuous 7-DoF robot end-effector actions $\mathbf{a}_t = (\Delta x, \Delta y, \Delta z, \Delta \phi, \Delta \theta, \Delta \psi, g) \in \mathbb{R}^7$ are quantile-discretized ($1^{\text{st}}$–$99^{\text{th}}$ percentiles per dimension) into $B = 256$ discrete action bins mapped onto the LLM vocabulary $\mathcal{V}_{\text{act}}$, optimizing autoregressive next-action-token cross-entropy over fused visual tokens $E_{\text{vis}}(I_t) = \operatorname{MLP}\!\big([\operatorname{DINOv2}(I_t); \operatorname{SigLIP}(I_t)]\big)$ and instruction $\ell$:

$$
\mathcal{L}_{\text{OpenVLA}}(\theta) = -\mathbb{E}_{(I_t, \ell, \mathbf{a}_t) \sim \mathcal{D}_{\text{OXE}}}\!\left[\sum_{d=1}^{7} \log p_\theta\Big(\operatorname{bin}(a_{t,d}) \;\Big|\; E_{\text{vis}}(I_t),\, \ell,\, \operatorname{bin}(a_{t,<d})\Big)\right]
$$

**Evidence boundary**: Base OpenVLA training is supervised imitation over Open X-Embodiment; downstream contact-rich precision and out-of-distribution recovery motivate targeted RL fine-tuning.

## Sources and artifacts

* Paper: [arXiv:2406.09246](https://arxiv.org/abs/2406.09246)
* Code & checkpoints: [https://github.com/openvla/openvla](https://github.com/openvla/openvla)
