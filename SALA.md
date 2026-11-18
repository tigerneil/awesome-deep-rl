# SALA: Semantically Aligned Latent Actions Enable Dual-Axis Scaling of Embodied Foundation Models

First public date: 2026-11-15 (arXiv v1).

Authors: Jiachun Jin, Zetong Zhou, Haonan Wang, Zhijie Deng.

Classification: 2026 · Embodied context (Latent Action Model scaling, recent preprint).

## Method summary

Latent Action Models (`LAMs`, cf. [RLA-WM](RLA-WM.md)) extract inverse-dynamics pseudo-actions from unlabeled human videos, yet pure video-reconstruction objectives cluster latents by visual background/appearance rather than physical action semantics—misaligning human hands with robot grippers. **SALA** supervises cross-embodiment latent correspondence without paired videos by converting language-caption semantic similarities between unpaired human and robot clips into soft neighborhood alignment targets while grounding robot latents in real control actions.

## Mathematical formulation

Let $z_h = E_{\text{LAM}}(v_h)$ and $z_r = E_{\text{LAM}}(v_r)$ denote latent actions inferred from unpaired human clip $v_h$ (caption $c_h$) and robot clip $v_r$ (caption $c_r$, ground-truth action $a_r$). Define language-embedding soft neighborhood target $p_{ij}^{\text{sem}} \propto \exp\!\big(\operatorname{sim}(\phi_{\text{text}}(c_i), \phi_{\text{text}}(c_j))/\tau_s\big)$ and latent affinity $q_{ij}(\theta) \propto \exp\!\big(\operatorname{sim}(z_i, z_j)/\tau_z\big)$. SALA jointly optimizes video forward-dynamics reconstruction, semantic neighborhood KL alignment, and robot action decoding $D_\psi(z_r)$:

$$
\mathcal{L}_{\text{SALA}}(\theta, \psi) = \mathcal{L}_{\text{recon}}(\theta) + \lambda_{\text{sem}}\sum_{i} D_{\text{KL}}\!\big(p_{i,\cdot}^{\text{sem}} \,\big\|\, q_{i,\cdot}(\theta)\big) + \lambda_{\text{act}}\,\mathbb{E}_{(v_r, a_r)}\!\Big[\big\|D_\psi(z_r) - a_r\big\|_2^2\Big]
$$

## Evaluation and evidence boundary

* **Reported scope**: Demonstrates dual-axis scaling—pretraining on broader general human video monotonically lowers downstream robot action prediction error, while post-training on task-specific human video improves physical robot task success.
* **Evidence boundary**: Classified under **Embodied context** (`arXiv:2611.17110`); SALA aligns cross-embodiment latent action supervision from human/robot videos rather than running closed-loop reward-maximizing RL.

## Sources and artifacts

* Paper: [arXiv:2611.17110](https://arxiv.org/abs/2611.17110)
* Project page: [https://sala-vla.github.io/](https://sala-vla.github.io/)
