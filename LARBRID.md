# LARBRID: Efficient Diffusion Policy Fine-Tuning with Latent Noise Representation Bridging

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Yuanchu Liang, Yue Yang, An-Chi He, Hanna Kurniawati.

Classification: 2026 · Embodied RL (NeurIPS 2026).

## Method summary

Fine-tuning pretrained diffusion and flow-matching robot policies with reinforcement learning often suffers from either expensive backpropagation through the multi-step denoising chain or "noise aliasing" when steering initial Gaussian noise directly (because initial noise latents lack a direct value correspondence with executed actions). LARBRID introduces:

1. **Latent Noise Linear Markov Decision Process (LNL-MDP)**: Formulates diffusion policy adaptation through a shared representation bridging initial noise space and executed action space.
2. **Bridge Equation**: Analytically links noise-space values to action-space values via the shared representation, eliminating noise aliasing while inheriting near-optimality guarantees under FineTuneRL theory.
3. **Latent Representation Bridging for Diffusion (LARBRID)**: Learns the bridging representation online and optimizes the initial noise distribution that steers the frozen or pretrained diffusion backbone without backpropagating through the full denoising trajectory.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across simulated robotic locomotion and manipulation benchmarks, reporting up to 2–3× sample-efficiency and return gains over prior diffusion-RL fine-tuning baselines.
* **Evidence boundary**: Gains are demonstrated on simulated locomotion and manipulation control suites; steering via the initial noise distribution assumes the pretrained diffusion policy already covers feasible task trajectories within its support.

## Sources and artifacts

* Paper: [arXiv:2611.07275](https://arxiv.org/abs/2611.07275)
* Code: [https://github.com/Maincode-Research/LARBRID](https://github.com/Maincode-Research/LARBRID)
