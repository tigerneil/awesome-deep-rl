# MDF++: Visuo-Tactile World Action Model with End-to-End Representation Learning

First public date: 2026-11-06 (arXiv v1). Conference venue: CoRL 2026.

Authors: Zixuan Huang, Jinhao Yu, Zachary Charlick, Dmitry Berenson.

Classification: 2026 · Embodied context (CoRL 2026 visuo-tactile world-action model, not an online RL algorithm).

## Method summary

World-Action Models (WAMs) jointly predict future observations and robot actions, yet relying on frozen reconstruction-pretrained visual encoders often omits subtle contact cues needed for tight-tolerance assembly. MDF++ learns multisensory latent representations end-to-end with a diffusion WAM backbone:

1. **End-to-end visuo-tactile diffusion WAM**: Jointly encodes camera images and tactile signals into compact control-oriented latents alongside a diffusion backbone that predicts both future multisensory latents and robot actions.
2. **Cross-modal multi-task anti-collapse training**: Prevents latent feature collapse during joint latent prediction by enforcing cross-modal correlation objectives between vision and touch.
3. **Contact-rich physical manipulation**: Targets high-precision assembly regimes where visual occlusion makes tactile dynamics essential for anticipating contact outcomes.

## Evaluation boundary

* **What it establishes**: Evaluated on contact-rich manipulation tasks including physical bolt screwing and nut mating, outperforming WAM baselines built on frozen pretrained visual encoders by up to 50% in task success.
* **What it does not establish**: MDF++ is trained offline from multisensory demonstrations as a diffusion world-action model rather than via closed-loop reinforcement learning reward maximization, and requires tactile sensor hardware (`arXiv:2611.09293`).

## Sources and artifacts

* Paper: [arXiv:2611.09293](https://arxiv.org/abs/2611.09293)
* Project page & videos: [https://jointmdf.github.io/](https://jointmdf.github.io/)
