# NeuralActuator: Neural Actuation Modeling for Robot Dynamics and External Force Perception

First public date: 2026-07-13 (arXiv v1). Conference venue: RSS 2026 Award (Outstanding Systems Paper Award).

Authors: Zhiyang Dou, John U. Onyemelukwe, Hangxing Zhang, Heng Zhang, Minghao Guo, Yunsheng Tian, Michal Piotr Lipiec, Joshua Jacob, Chao Liu, Peter Yichen Chen, et al.

Classification: 2026 · Embodied context (RSS 2026 Outstanding Systems Paper Award; differentiable actuation and force-perception system for sim-to-real robotics).

## System summary

Actuator nonlinearities—friction, backlash, hysteresis, and thermal drift—break the linear current-to-torque approximation ($\tau = K_t I$) on low-cost servo arms and drive a large share of sim-to-real error. NeuralActuator learns a unified temporal Transformer actuation model from the **Neural Actuation Dataset (NAD)** collected via twin-arm teleoperation:

1. **Torque-free differentiable-simulation supervision**: Trains a torque-surrogate head directly from pose trajectories propagated through a differentiable simulator, without requiring joint-torque sensors during training.
2. **Sensorless contact-gated external force perception**: Jointly predicts external contact wrenches gated by a learned contact probability, enabling compliant force perception on low-cost hardware lacking wrist force-torque sensors.
3. **Motor-condition health scoring**: Estimates a joint-condition score distinguishing nominal operation from mechanical restriction or overload.

## Evaluation boundary

* **What it establishes**: Validated across three actuator families spanning ~\$500 to >\$30,000 platforms—a 5-DoF OpenManipulator-X, a 6-DoF LeRobot SO-101, and a 7-DoF Franka Emika Panda—demonstrating accurate trajectory rollouts, sensorless payload/contact estimation, and improved downstream behavior-cloning performance when used as a pretrained module.
* **What it does not establish**: NeuralActuator provides a learned physical actuation and force-sensing substrate for sim-to-real transfer and behavior cloning rather than introducing a new reinforcement learning policy-optimization algorithm (`arXiv:2607.11734`).

## Sources and artifacts

* Paper: [arXiv:2607.11734](https://arxiv.org/abs/2607.11734)
* Project page & dataset: [https://frank-zy-dou.github.io/projects/NeuralActuator/index.html](https://frank-zy-dou.github.io/projects/NeuralActuator/index.html)
* Code: [https://github.com/Frank-ZY-Dou/Dynamics-Modeling/tree/main/NeuralActuator](https://github.com/Frank-ZY-Dou/Dynamics-Modeling/tree/main/NeuralActuator)
