# SDPO: Reinforcement Learning via Self-Distillation

First public date: 2026-01-28 (arXiv v1). Conference venue: ICML 2026.

Authors: Jonas Hübotter, Frederike Lübeck, Lejs Behric, Anton Baumann, Marco Bagatella, Daniel Marta, Ido Hakimi, Idan Shenfeld, Thomas Kleine Buening, Carlos Guestrin, Andreas Krause.

Classification: 2026 · Agent RL (ICML 2026).

## Method summary

Standard RL with Verifiable Rewards (RLVR) collapses rich execution traces—compiler diagnostics, runtime stack traces, or judge critiques—into a single scalar outcome reward per trajectory. **Self-Distillation Policy Optimization (SDPO)** formalizes *reinforcement learning with rich feedback* and extracts dense token-level credit without an external teacher or separate reward model:

1. **Feedback-conditioned self-teacher**: After sampling on-policy rollouts and collecting environment feedback, SDPO conditions the current policy itself on the privileged textual feedback (or on a successful peer rollout when only binary scalar rewards exist) to act as an in-context retrospective self-teacher.
2. **On-policy token-level distillation**: Minimizes divergence between the unconditioned student policy and the feedback-informed self-teacher directly along the student's own generated trajectories, avoiding off-policy distribution mismatch.
3. **Test-time discovery**: Applies iterative on-policy self-distillation to single hard instances at inference time to accelerate solution discovery over naive `best-of-k` sampling.

## Mathematical formulation

Given prompt $x$, sampled on-policy rollout $y \sim \pi_\theta(\cdot \mid x)$, and rich environment feedback $f(x, y)$ (such as compiler errors, unit-test traces, or judge diagnostics), SDPO constructs a stop-gradient self-teacher $\pi_{\text{sg}(\theta)}(\cdot \mid x, f(x, y))$ and minimizes per-token divergence along the student's own trajectory:

$$
\mathcal{L}_{\text{SDPO}}(\theta) = \mathbb{E}_{x \sim \mathcal{D},\, y \sim \pi_{\text{sg}(\theta)}(\cdot \mid x)}\!\left[\sum_{t=1}^{|y|} D_{\text{KL}}\!\Big(\pi_{\text{sg}(\theta)}\!\big(\cdot \mid x, f(x, y), y_{<t}\big) \,\Big\|\, \pi_\theta\!\big(\cdot \mid x, y_{<t}\big)\Big)\right]
$$

converting sparse trajectory-level verification into dense, credit-assigned token supervision without an external teacher model.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across LiveCodeBench v6 competitive programming, multi-step tool use, and scientific reasoning, improving sample efficiency and final accuracy over GRPO baselines while achieving matched test-time discovery rates in 3x fewer attempts. (Published in the ICML 2026 main conference; an earlier workshop version also received a Best Paper Award at the ICLR 2026 Lifelong Agents Workshop.)
* **Evidence boundary**: Relies on the base model being strong enough to retrospectively diagnose mistakes in-context when shown execution feedback; subsequent analyses note uniform token-level distillation can inject stylistic noise on very long reasoning chains unless gated (`arXiv:2601.20802`).

## Sources and artifacts

* Paper: [arXiv:2601.20802](https://arxiv.org/abs/2601.20802)
* Project page: [https://self-distillation.github.io/SDPO](https://self-distillation.github.io/SDPO)
* Code: [https://github.com/lasgroup/SDPO](https://github.com/lasgroup/SDPO)
