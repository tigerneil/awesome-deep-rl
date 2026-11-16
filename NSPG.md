# Noisy-Space Policy Gradient (NSPG) for Diffusion Policies in Offline Reinforcement Learning

First public date: 2026-09-07 (arXiv v1). Conference venue: ICML 2026.

Authors: Mahmoud Selim, Cristina Cipriani, Karl H. Johansson.

Classification: 2026 · Conference RL (ICML 2026 — Offline RL & Diffusion Policies).

## Method summary

Integrating expressive diffusion policies with offline reinforcement learning typically requires either backpropagating value gradients through the iterative denoising chain or approximating the terminal policy distribution. NSPG reformulates policy improvement directly in the intermediate diffusion latent space:

1. **Noisy-space action-value ($Q$-) function**: Assigns values to intermediate noisy diffusion latents via the distribution of clean executed actions induced by the remaining denoising process.
2. **Noisy-Space Policy Gradient (NSPG)**: Derives an exact policy gradient that optimizes noisy latents using only clean action-space value estimates.
3. **Diffusion-compatible KL-regularized regression**: Formulates KL-regularized offline policy improvement over noisy latents as a weighted denoising regression objective, completely avoiding backpropagation through time across denoising steps.

## Mathematical formulation

For a reverse diffusion chain $p_\theta(a_{k-1} \mid s, a_k)$ generating clean actions $a_0$ from intermediate noisy latents $a_k$, NSPG defines the noisy-space value via clean-action projection without unrolling gradients through denoising steps:

$$
\widetilde{Q}(s, a_k, k) = \mathbb{E}_{a_0 \sim p_{\theta_{\text{old}}}(a_0 \mid s, a_k)}\!\big[Q_\phi(s, a_0)\big]
$$

KL-regularized policy improvement $\max_\theta \mathbb{E}[\widetilde{Q}(s, a_k, k)] - \tau D_{\text{KL}}(p_\theta \,\|\, p_{\text{BC}})$ reduces to advantage-weighted score/denoising regression at randomly sampled diffusion steps $k \sim \mathcal{U}\{1,\dots,K\}$:

$$
\mathcal{L}_{\text{NSPG}}(\theta) = \mathbb{E}_{(s, a_0) \sim \mathcal{D},\, k,\, a_k \sim q(a_k \mid a_0)}\!\left[\exp\!\left(\frac{Q_\phi(s, a_0) - V(s)}{\tau}\right) \big\|\epsilon_\theta(s, a_k, k) - \epsilon\big\|_2^2\right]
$$

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across state-based D4RL benchmarks and vision-based OGBench tasks, outperforming prior diffusion-offline-RL baselines in stability and return.
* **Evidence boundary**: Offline RL performance remains bounded by dataset coverage and accurate clean-action $Q$-evaluation on out-of-distribution actions; evaluated in simulated D4RL and OGBench suites.

## Sources and artifacts

* Paper: [arXiv:2609.06882](https://arxiv.org/abs/2609.06882)
* Project page: [https://mahmoud-selim.github.io/NSPG/](https://mahmoud-selim.github.io/NSPG/)
