# Phasic Policy Gradient (PPG)

First public date: 2020-09-09. Conference venue: ICML 2021.

Authors: Karl Cobbe, Jacob Hilton, Oleg Klimov, John Schulman.

## Method summary

Sharing a feature trunk between policy and value networks in [PPO](PPO.md) creates competing gradient pressures and limits the number of value updates per rollout before policy overfitting sets in. **Phasic Policy Gradient (PPG)** separates optimization into alternating **policy phases** and **auxiliary phases**, enabling aggressive multi-epoch value and representation learning while preserving policy stability via a behavioral cloning KL anchor on Procgen generalization benchmarks.

## Mathematical formulation

During the **policy phase**, PPG optimizes the standard clipped surrogate $L^{\text{CLIP}}(\theta)$ ([PPO](PPO.md)) and value loss $L^{\text{VF}}(\phi)$ over $E_\pi$ epochs. During the **auxiliary phase**, PPG distills value predictions and auxiliary heads into the shared policy encoder over $E_{\text{aux}} \gg E_\pi$ epochs while constraining policy drift against pre-phase action distributions $\pi_{\theta_{\text{old}}}$:

$$
L^{\text{joint}}(\theta) = L^{\text{aux}}(\theta) + \beta_{\text{clone}}\,\hat{\mathbb{E}}_t\!\Big[D_{\text{KL}}\!\big(\pi_{\theta_{\text{old}}}(\cdot \mid s_t) \,\big\|\, \pi_\theta(\cdot \mid s_t)\big)\Big]
$$

where $L^{\text{aux}}(\theta) = \frac{1}{2}\hat{\mathbb{E}}_t\!\big[(V_\theta(s_t) - \hat{V}_t^{\text{targ}})^2\big]$ trains an auxiliary value head attached to the policy network without corrupting the learned policy $\pi_\theta$.

## Sources and artifacts

* Paper: [arXiv:2009.04416](https://arxiv.org/abs/2009.04416)
* Code: [https://github.com/openai/phasic-policy-gradient](https://github.com/openai/phasic-policy-gradient)
