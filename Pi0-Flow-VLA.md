# π0: A Vision-Language-Action Flow Model for General Robot Control

First public date: 2024-10-31. Conference venue: RSS 2025.

Authors: Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Sergey Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, James Tanner, Quan Vuong, Anna Walling, Haohuan Wang, Ury Zhilinsky.

## Method summary

Discrete action-bin tokenization ([OpenVLA](OpenVLA.md)) struggles with high-frequency ($50\text{ Hz}$) dexterous bimanual control such as laundry folding or box assembly. **$\pi_0$ (`Pi-Zero`)** couples a pretrained Vision-Language Model (`PaliGemma`) with a dedicated continuous **Flow Matching Action Expert** via blockwise causal attention, bridging multimodal semantic reasoning with continuous [Diffusion Policy](Diffusion-Policy.md) / ODE action-chunk generation—forming the continuous-flow prior steered by 2026 RL algorithms such as [RL Token](RL-Token.md), [LPS](Latent-Policy-Steering.md), and [S2C](S2C.md).

## Mathematical formulation

Given multimodal observation $o_t = (I_t^{1:n}, \ell_t, q_t)$ (multi-view images, language prompt, proprioception $q_t$) and a continuous $H$-step action chunk $\mathbf{A}_t = (a_t, \dots, a_{t+H-1})$, $\pi_0$ interpolates linearly between Gaussian noise $\boldsymbol{\epsilon} \sim \mathcal{N}(0, I)$ and target actions at flow time $\tau \in [0, 1]$ via $\mathbf{A}_t^\tau = \tau \mathbf{A}_t + (1 - \tau)\boldsymbol{\epsilon}$, training velocity field $v_\theta(\mathbf{A}_t^\tau, o_t, \tau)$ by Conditional Flow Matching:

$$
\mathcal{L}_{\text{CFM}}(\theta) = \mathbb{E}_{(o_t, \mathbf{A}_t) \sim \mathcal{D},\, \boldsymbol{\epsilon} \sim \mathcal{N}(0, I),\, \tau \sim p(\tau)}\!\left[\Big\|v_\theta\big(\tau \mathbf{A}_t + (1 - \tau)\boldsymbol{\epsilon},\, o_t,\, \tau\big) - (\mathbf{A}_t - \boldsymbol{\epsilon})\Big\|_2^2\right]
$$

where $\tau$ is sampled from a shifted Beta distribution emphasizing low-signal-to-noise regimes, and deployment integrates $K = 10$ forward Euler steps $\mathbf{A}_t^{\tau + \delta} = \mathbf{A}_t^\tau + \delta\,v_\theta(\mathbf{A}_t^\tau, o_t, \tau)$ from $\mathbf{A}_t^0 \sim \mathcal{N}(0, I)$.

## Sources and artifacts

* Paper: [arXiv:2410.24164](https://arxiv.org/abs/2410.24164)
* Open implementation (`openpi`): [https://github.com/Physical-Intelligence/openpi](https://github.com/Physical-Intelligence/openpi)
