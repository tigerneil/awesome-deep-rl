# HLO-AMP: Hierarchical Loco-Manipulation from Object-Aware Motion Priors

First public date: 2026-11-03 (arXiv v1). Conference venue: CoRL 2026.

Authors: Jean-Pierre Sleiman, Bilal Hammoud, He Li, Jonathan Foster, Sylvain Bertrand, Jessica K. Hodgins, Farbod Farshidian.

Classification: 2026 · Embodied RL (CoRL 2026).

## Method summary

Standard hierarchical humanoid loco-manipulation trains a low-level whole-body controller (WBC) without the manipulated payload in the scene, approximating object dynamics with random end-effector force perturbations that miss distributed multi-contact wrenches across the arms and torso. HLO-AMP restructures the hierarchy:

1. **Object-aware low-level motion prior (LL)**: Trains a single low-level policy via adversarial motion imitation (AMP-style) on retargeted human motion-capture references with the manipulated object physically simulated in the scene, absorbing true multi-contact payload wrenches while exposing a compact task-space command interface.
2. **Envelope-anchored high-level RL policy (HL)**: Trains a reference-free high-level RL policy whose command outputs are constrained to the empirical distribution envelope of the low-level training data, preventing out-of-distribution queries during long-horizon multi-stage tasks.

## Evaluation and evidence boundary

* **Reported scope**: Deployed on a physical Unitree G1 humanoid for bimanual box pick-and-place, generalizing across payload masses, box dimensions, and initial/goal poses, and recovering reactively from intentional mid-carry drops.
* **Evidence boundary**: Evaluated on bimanual box loco-manipulation; extending to articulated tools or deformable objects requires retargeted motion-capture primitives and simulated contact models for those object classes.

## Sources and artifacts

* Paper: [arXiv:2611.05113](https://arxiv.org/abs/2611.05113)
* Video: [https://youtu.be/viR_ULnRDQQ](https://youtu.be/viR_ULnRDQQ)
