# SkillRL: Evolving Agents via Recursive Skill-Augmented Reinforcement Learning

First public date: 2026-02-09 (arXiv v1). Conference venue: NeurIPS 2026.

Authors: Peng Xia, Jianwen Chen, Hanyang Wang, Jiaqi Liu, Kaide Zeng, Yu Wang, Siwei Han, Yiyang Zhou, Xujiang Zhao, Haifeng Chen, et al.

Classification: 2026 · Agent RL (NeurIPS 2026).

## Method summary

Storing raw trajectory logs in LLM agent memory inflates context length and injects noisy trial-and-error steps. SkillRL jointly evolves a hierarchical skill library alongside parameter-level reinforcement learning:

1. **Experience-distilled hierarchical `SkillBank`**: Compresses raw interaction trajectories into general strategic heuristics and task-specific procedural skills, cutting prompt token overhead relative to raw trajectory retrieval.
2. **Adaptive hierarchical retrieval**: Dynamically selects both general principles and task-matched skills conditioned on the current environment observation and goal.
3. **Recursive policy-skill co-evolution**: Periodically updates and refines `SkillBank` entries from newly encountered RL rollout failures while updating the LLM agent's policy parameters via GRPO.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on ALFWorld, WebShop, and seven search-augmented QA/agent benchmarks, reporting >15.3% gains over memory-augmented and standard RL baselines with improved scaling on multi-step tasks.
* **Evidence boundary**: Evaluated in text/web/simulated household environments (ALFWorld, WebShop, search QA) rather than continuous sensorimotor robotics; introduces extra distillation maintenance steps during RL training (`arXiv:2602.08234`).

## Sources and artifacts

* Paper: [arXiv:2602.08234](https://arxiv.org/abs/2602.08234)
* Code: [https://github.com/aiming-lab/SkillRL](https://github.com/aiming-lab/SkillRL)
