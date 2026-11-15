# K-PWM: Control-Oriented Structured Bilinear World Models under Partial Observation

First public date: 2026-11-08 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Santosh Mohan Rajkumar, Sriram Narayanan, Samuel E. Otto, Debdipta Goswami.

Classification: 2026 · Embodied RL (NeurIPS 2026; probabilistic world-model control).

## Method summary

K-PWM addresses sample- and compute-efficient model-based control on physical systems whose vector-valued sensor measurements only partially reveal the underlying dynamical state:

1. **Koopman-bilinear latent world model**: Couples Koopman-bilinear action-conditioned latent transitions with a nonlinear observation decoder, initialized via a data-driven Koopman-consistent spectral procedure that selects the latent dimension automatically.
2. **Inference-network-free Gaussian belief tracking**: Performs probabilistic latent-state estimation directly through the learned generative dynamics via extended Kalman filtering and Rauch-Tung-Striebel smoothing, propagating Gaussian beliefs analytically across bilinear transitions without a separate amortized encoder.
3. **Generalized ECM learning and uncertainty-aware MPPI**: Alternates closed-form generalized expectation conditional maximization (GECM) updates for latent generators, noise covariances, and priors with gradient-based decoder updates, supporting fast uncertainty-aware Model Predictive Path Integral (MPPI) control rollouts.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated under partial observation and limited offline/online data on Gymnasium MuJoCo benchmarks and high-dimensional robot models from MuJoCo Menagerie, reporting lower multi-step prediction error and faster per-step planning times than neural world-model baselines.
* **Evidence boundary**: Uses sampling-based MPPI trajectory optimization over a learned probabilistic world model rather than a model-free actor network, and all reported experiments in `arXiv:2611.11521` are conducted in MuJoCo / MuJoCo Menagerie simulation rather than on physical robot hardware.

## Sources and artifacts

* Paper: [arXiv:2611.11521](https://arxiv.org/abs/2611.11521)
