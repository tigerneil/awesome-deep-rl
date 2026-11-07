# Noisy-Space Policy Gradient (NSPG) for Diffusion Policies in Offline Reinforcement Learning

First public date: 2026-09-07 (arXiv v1). Conference venue: ICML 2026.

Authors: Mahmoud Selim, Cristina Cipriani, Karl H. Johansson.

Classification: 2026 · Conference RL (ICML 2026 — Offline RL & Diffusion Policies).

## Method summary

Integrating expressive diffusion policies with offline reinforcement learning typically requires either backpropagating value gradients through the iterative denoising chain or approximating the terminal policy distribution. NSPG reformulates policy improvement directly in the intermediate diffusion latent space:

1. **Noisy-space action-value ($Q$-) function**: Assigns values to intermediate noisy diffusion latents via the distribution of clean executed actions induced by the remaining denoising process.
2. **Noisy-Space Policy Gradient (NSPG)**: Derives an exact policy gradient that optimizes noisy latents using only clean action-space value estimates.
3. **Diffusion-compatible KL-regularized regression**: Formulates KL-regularized offline policy improvement over noisy latents as a weighted denoising regression objective, completely avoiding backpropagation through time across denoising steps.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across state-based D4RL benchmarks and vision-based OGBench tasks, outperforming prior diffusion-offline-RL baselines in stability and return.
* **Evidence boundary**: Offline RL performance remains bounded by dataset coverage and accurate clean-action $Q$-evaluation on out-of-distribution actions; evaluated in simulated D4RL and OGBench suites.

## Sources and artifacts

* Paper: [arXiv:2609.06882](https://arxiv.org/abs/2609.06882)
* Project page: [https://mahmoud-selim.github.io/NSPG/](https://mahmoud-selim.github.io/NSPG/)
