# JEPA4R: Embodied JEPA World Models with 4D Point Planning

First public date: 2026-11-15 (arXiv v1).

Authors: Jiarui Dong, Zhiheng Liang, Yanjun Li, Zeyu Zhang, Heejeong Nam, Haoyu Chen, Hao Tang.

Classification: 2026 · Embodied RL / World-Model Planning (recent preprint).

## Method summary

2D pixel Joint-Embedding Predictive Architecture (`JEPA`) world models entangle 3D manipulation geometry with lighting/appearance and keep imagined trajectories opaque. **JEPA4R** learns a latent world model directly over single-depth-camera 3D point clouds—termed **4D point planning**—predicting and planning over metric-grounded latent embeddings while training policy heads on frozen latents and auditing 200-step rollouts via a diagnostic 4D point-cloud decoder (within $1.1\text{ cm}$ mean point error).

## Mathematical formulation

Given depth point cloud $P_t \in \mathbb{R}^{N \times 3}$ encoded into latent $z_t = E_\theta(P_t)$ with EMA target encoder $E_{\bar{\theta}}$, the action-conditioned latent predictor $F_\psi(z_t, a_t)$ minimizes multi-step latent prediction error without pixel reconstruction during world-model training:

$$
\mathcal{L}_{\text{JEPA4R}}(\theta, \psi) = \mathbb{E}_{(P_{0:H}, a_{0:H-1}) \sim \mathcal{D}}\!\left[\sum_{h=1}^{H} \Big\|\hat{z}_h - \operatorname{sg}\!\big(E_{\bar{\theta}}(P_h)\big)\Big\|_2^2\right], \qquad \hat{z}_{h} = F_\psi(\hat{z}_{h-1}, a_{h-1}),\; \hat{z}_0 = E_\theta(P_0)
$$

Downstream control combines latent trajectory planning and policy-head learning $\pi_\phi(a_t \mid z_t)$ over frozen $E_\theta$ latents across offline/online policy-learning suites (`OGBench`, `CortexBench`).

## Evaluation and evidence boundary

* **Reported scope**: Outperforms 2D pixel JEPA baselines on `OGBench` (`Cube-Single`, `Cube-Double`, `Cube-Triple`, `Scene`), reaches 98.4% on MetaWorld and 88.0% on Adroit Relocate (vs. 96.0% / 65.3% for R3M), and transfers digital-twin-trained policies zero-shot to a physical arm and dexterous hand.
* **Evidence boundary**: Recent arXiv preprint (`arXiv:2611.19771`); requires depth-camera point clouds and digital-twin calibration for zero-shot physical deployment.

## Sources and artifacts

* Paper: [arXiv:2611.19771](https://arxiv.org/abs/2611.19771)
* Code: [https://github.com/AIGeeksGroup/JEPA4R](https://github.com/AIGeeksGroup/JEPA4R)
* Project page: [https://aigeeksgroup.github.io/JEPA4R](https://aigeeksgroup.github.io/JEPA4R)
