# Language-Conditioned World Modeling for Visual Navigation (LCVN)

First public date: 2026-03-23 (arXiv v1). Conference venue: NeurIPS 2026 Oral (0.36% acceptance).

Authors: Yifei Dong, Fengyi Wu, Yilong Dai, Lingdong Kong, Guangyu Chen, Yetong Sha, Qiyu Hu, Feng Liu, Siyu Huang, Qi Dai, et al.

Classification: 2026 · Embodied RL (NeurIPS 2026 Oral).

## Method and benchmark summary

Language-Conditioned Visual Navigation (LCVN) studies embodied navigation in which an agent receives only an initial egocentric image and a free-form natural-language instruction—without goal images—and must execute continuous visual navigation:

1. **LCVN Dataset**: Introduces 39,016 navigation trajectories paired with 117,048 human-verified natural-language instructions across diverse environments and instruction styles.
2. **Latent-imagination actor-critic RL (`LCVN-WM` + `LCVN-AC`)**: Trains a diffusion-based language-conditioned world model (`LCVN-WM`) to roll out imagined future latent states and optimizes an actor-critic policy (`LCVN-AC`) purely inside the imagined latent space.
3. **Unified autoregressive world-action baseline (`LCVN-Uni`)**: Compares latent-imagination RL head-to-head against a single multimodal autoregressive transformer that jointly predicts future observation tokens and actions in one forward pass.

## Evaluation and evidence boundary

* **Reported scope**: Isolates trade-offs between the two paradigms across seen and unseen navigation scenes: latent-imagination RL (`LCVN-AC`) produces stronger multi-step temporal coherence during rollouts, whereas unified autoregressive prediction (`LCVN-Uni`) transfers better zero-shot to unseen environments.
* **Evidence boundary**: Demonstrates a clean diagnostic split between language-grounding bottlenecks and dynamics-modeling errors on the LCVN benchmark, rather than claiming latent-imagination RL universally dominates unified world-action modeling or establishing physical outdoor deployment (`arXiv:2603.26741`).

## Sources and artifacts

* Paper: [arXiv:2603.26741](https://arxiv.org/abs/2603.26741)
* Code & benchmark: [https://github.com/UWMILab/LCVN](https://github.com/UWMILab/LCVN)
