# Permanent and Transient Representations for Continual Reinforcement Learning

First public date: 2026-11-05 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Nishanth Anand, Doina Precup.

Classification: 2026 · Conference RL (NeurIPS 2026 — Continual RL & Representation Learning).

## Method summary

Continual Reinforcement Learning (CRL) agents face a stability-plasticity dilemma when decomposing value estimation into a slow permanent component and a fast transient component if both components share the same feature representation. This paper introduces a representation-level separation:

1. **Parametric permanent representations**: Trains a deep parametric value network slowly to capture stationary, broadly generalizable structure across tasks and regimes.
2. **Non-parametric transient value approximation**: Uses a fast, non-parametric local approximation for the transient value function so the agent can rapidly adapt to local non-stationarities without overwriting permanent features.
3. **Theoretical & empirical analysis**: Characterizes the interaction between permanent and transient estimators and demonstrates online continual adaptation on high-dimensional observations.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on image-based continual RL tasks and Craftax-Classic, outperforming shared-representation permanent/transient baselines and standard continual RL methods.
* **Evidence boundary**: Evaluated in simulated continual-RL benchmarks (including Craftax-Classic); non-parametric transient estimation relies on an informative similarity metric in the feature space.

## Sources and artifacts

* Paper: [arXiv:2611.07327](https://arxiv.org/abs/2611.07327)
