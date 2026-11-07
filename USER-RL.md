# USER: A Unified and Extensible System for Real-World Online Policy Learning in Embodied AI

First public date: 2026-02-08 (arXiv v1). Conference venue: RSS 2026.

Authors: Hongzhi Zang, Shu'ang Yu, Hao Lin, Tianxing Zhou, Zefang Huang, Zhen Guo, et al.

Classification: 2026 · Embodied RL (RSS 2026).

## Method summary

Real-world online reinforcement learning is bottlenecked not only by sample complexity but by systems infrastructure—heterogeneous robot drivers, cloud-edge communication latency, non-episodic resets, and crash recovery. USER (part of the open-source RLinf stack) provides:

1. **Hardware abstraction & adaptive cloud-edge plane**: Unifies heterogeneous manipulators and mobile bases behind a standard rollout interface while streaming observations and policy weights between edge controllers and GPU training nodes.
2. **Fully asynchronous training with persistent cache-aware replay**: Decouples physical actor collection from learner gradient updates and persists transitions across hardware stops or resets.
3. **Modular reward, intervention, and policy abstractions**: Supports both compact visuomotor policies and large VLA backbones under online RL and human-in-the-loop training loops.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated in simulation and physical multi-robot / heterogeneous manipulator setups, demonstrating sustained asynchronous cloud-edge training throughput and long-running real-world policy improvement.
* **Evidence boundary**: USER is primarily a distributed systems and training infrastructure contribution; task-level sample efficiency still depends on the chosen RL algorithm, reward specification, and physical reset mechanism.

## Sources and artifacts

* Paper: [arXiv:2602.07837](https://arxiv.org/abs/2602.07837)
* Documentation & code: [https://rlinf.readthedocs.io/](https://rlinf.readthedocs.io/)
