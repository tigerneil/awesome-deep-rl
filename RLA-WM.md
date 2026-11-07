# RLA-WM: Learning Visual Feature-Based World Models via Residual Latent Action

First public date: 2026-05-08 (arXiv v1; updated October 2026). Conference venue: NeurIPS 2026.

Authors: Xinyu Zhang, Zhengtong Xu, Yutian Tao, Yeping Wang, Yu She, Abdeslam Boularias.

Classification: 2026 · Embodied RL (NeurIPS 2026).

## Method summary

Visual world models that generate raw RGB video via diffusion are computationally heavy, whereas direct regression in visual feature spaces (such as DINO tokens) often produces blurry or collapsed multi-step rollouts. RLA-WM introduces:

1. **Residual Latent Action (RLA)**: Learns a compact latent transition representation directly from DINO token residuals between consecutive frames, capturing temporal progression rather than reconstructing full static states.
2. **Flow-matching feature dynamics (RLA-WM)**: Trains an ODE flow-matching network conditioned on current DINO tokens and robot actions to predict RLA latents, achieving lower feature prediction error on ManiSkill and real-world IWS datasets at a fraction of video-diffusion FLOPs.
3. **Actionless video VLA adaptation & offline visual RL**: Uses RLA to (a) extend visuomotor/VLA policies to learn from actionless videos on LIBERO and physical robots, and (b) run PPO policy optimization entirely inside the frozen RLA-WM using video-alignment rewards without online environment interaction.

## Evaluation and evidence boundary

* **Reported scope**: Validated on ManiSkill, LIBERO, Push-T, and real-world manipulation datasets (including rope routing and tabletop manipulation), reporting lower feature L1 error than direct-regression feature world models and ~300× lower inference FLOPs than pixel video-diffusion world models.
* **Evidence boundary**: Offline visual RL inside RLA-WM relies on an external UNet decoder and video-alignment reward against reference trajectories; physical robot gains depend on offline video coverage of relevant contact transitions.

## Sources and artifacts

* Paper: [arXiv:2605.07079](https://arxiv.org/abs/2605.07079)
* Project page: [https://mlzxy.github.io/rla-wm/](https://mlzxy.github.io/rla-wm/)
* Code: [https://github.com/mlzxy/rla-wm](https://github.com/mlzxy/rla-wm)
