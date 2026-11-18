# Diffusion Policy: Visuomotor Policy Learning via Action Diffusion

First public date: 2023-03-07. Conference venue: RSS 2023 / IJRR 2024.

Authors: Cheng Chi, Zhenjia Xu, Siyuan Feng, Eric Cousineau, Yilun Du, Benjamin Burchfiel, Russ Tedrake, Shuran Song.

## Method summary

Unimodal Gaussian policies average across distinct valid manipulation strategies (e.g., passing left vs. right around an obstacle), causing catastrophic mode-averaging failures. **Diffusion Policy** represents a robot's visuomotor policy $\pi_\theta(\mathbf{A}_t \mid \mathbf{O}_t)$ as a conditional Denoising Diffusion Probabilistic Model (**DDPM**) over receding-horizon **action chunks**, capturing high-dimensional multimodal action distributions and inspiring flow-matching VLAs ([π0](Pi0-Flow-VLA.md)) and 2026 RL steering methods ([LPS](Latent-Policy-Steering.md), [NSPG](NSPG.md), [LARBRID](LARBRID.md)).

## Mathematical formulation

Conditioned on observation history $\mathbf{O}_t$, Diffusion Policy generates a future action sequence $\mathbf{A}_t^0 = (a_t, \dots, a_{t+T_p-1})$ (executing the first $T_a \le T_p$ actions closed-loop) by iteratively denoising Gaussian noise $\mathbf{A}_t^K \sim \mathcal{N}(0, I)$ with learned score/noise network $\varepsilon_\theta(\mathbf{O}_t, \mathbf{A}_t^k, k)$:

$$
\mathbf{A}_t^{k-1} = \alpha_k\!\left(\mathbf{A}_t^k - \gamma_k\,\varepsilon_\theta\big(\mathbf{O}_t, \mathbf{A}_t^k, k\big) + \mathcal{N}(0, \sigma_k^2 I)\right), \qquad k = K, \dots, 1
$$

Training minimizes the variational denoising score-matching objective across diffusion step $k \sim \mathcal{U}\{1, \dots, K\}$ and Gaussian perturbation $\varepsilon^k \sim \mathcal{N}(0, I)$:

$$
\mathcal{L}_{\text{DDPM}}(\theta) = \mathbb{E}_{(\mathbf{O}_t, \mathbf{A}_t^0) \sim \mathcal{D},\, k,\, \varepsilon^k}\!\left[\Big\|\varepsilon^k - \varepsilon_\theta\big(\mathbf{O}_t,\, \sqrt{\bar{\alpha}_k}\mathbf{A}_t^0 + \sqrt{1 - \bar{\alpha}_k}\varepsilon^k,\, k\big)\Big\|_2^2\right]
$$

## Sources and artifacts

* Paper: [arXiv:2303.04137](https://arxiv.org/abs/2303.04137)
* Code: [https://github.com/real-stanford/diffusion_policy](https://github.com/real-stanford/diffusion_policy)
* Project page: [https://diffusion-policy.cs.columbia.edu/](https://diffusion-policy.cs.columbia.edu/)
