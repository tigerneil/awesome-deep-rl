# Permanent and Transient Representations for Continual Reinforcement Learning

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Nishanth Anand, Doina Precup.

Classification: 2026 · Conference RL (NeurIPS 2026 — Continual RL & Representation Learning).

## Method summary

Continual Reinforcement Learning (CRL) agents face a stability-plasticity dilemma when decomposing value estimation into a slow permanent component and a fast transient component if both components share the same feature representation. This paper introduces a representation-level separation:

1. **Parametric permanent representations**: Trains a deep parametric value network slowly to capture stationary, broadly generalizable structure across tasks and regimes.
2. **Non-parametric transient value approximation**: Uses a fast, non-parametric local approximation for the transient value function so the agent can rapidly adapt to local non-stationarities without overwriting permanent features.
3. **Theoretical & empirical analysis**: Characterizes the interaction between permanent and transient estimators and demonstrates online continual adaptation on high-dimensional observations.

## Mathematical formulation

Under non-stationary continual RL, the action-value estimate decomposes additively into a slowly updated parametric permanent network $Q_\theta^{(P)}$ and a fast non-parametric local transient memory $Q_{\mathcal{M}}^{(T)}$ over recent state-action embeddings $\phi(s, a)$:

$$
\widehat{Q}(s, a) = Q_\theta^{(P)}(s, a) + Q_{\mathcal{M}}^{(T)}(s, a), \qquad Q_{\mathcal{M}}^{(T)}(s, a) = \sum_{i \in \mathcal{N}_k(s,a)} w_i(s, a)\, u_i
$$

Transient residuals $u_i$ absorb rapid local TD errors $\delta_t = r_t + \gamma \max_{a'} \widehat{Q}(s_{t+1}, a') - \widehat{Q}(s_t, a_t)$ via kernel weights $w_i(s,a) \propto \kappa\big(\phi(s,a), \phi(s_i,a_i)\big)$ with decay, while $Q_\theta^{(P)}$ consolidates persistent cross-regime value structure without catastrophic interference.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on image-based continual RL tasks and Craftax-Classic, outperforming shared-representation permanent/transient baselines and standard continual RL methods.
* **Evidence boundary**: Evaluated in simulated continual-RL benchmarks (including Craftax-Classic); non-parametric transient estimation relies on an informative similarity metric in the feature space.

## Sources and artifacts

* Paper: [arXiv:2611.07327](https://arxiv.org/abs/2611.07327)
