# BEAKER: An Expert-Curated Benchmark for Embodied Brains in Self-Driving Chemical Laboratories

First public date: 2026-11-04 (arXiv v1). Conference venue: NeurIPS 2026 (Evaluations and Datasets Track, Spotlight).

Authors: Fei Lin, Tengchao Zhang, Ziyang Gong, Xiaotong Yu, Bohan Zhang, Yifan Zhou, Qihao Yang, Ji Dai, et al.

Classification: 2026 · Embodied context (NeurIPS 2026 Spotlight benchmark, not an RL algorithm).

## Benchmark summary

BEAKER evaluates Multimodal Large Language Models (MLLMs) acting as embodied perception-and-planning brains in Self-Driving Chemical Laboratories (SDCLs):

1. **1,000 expert-curated QA instances across 11 image and video task types**: Manually authored and verified by chemistry and embodied-AI specialists without synthetic LLM annotation.
2. **Execution-grounded diagnostic axes**: Covers affordance grounding, trajectory planning, apparatus setup, chemical state recognition, safety-norm compliance, and multi-step temporal procedure ordering.
3. **Systematic evaluation of 28 MLLMs**: Tests general-purpose, science-specialized, chemistry-focused, and embodied MLLMs, revealing a sharp gap between coarse video procedure comprehension and precise, safety-critical action/affordance grounding.

## Evaluation boundary

* **What it establishes**: Current foundation models still fail frequently on fine-grained laboratory affordance grounding, spatial trajectory feasibility, and safety-constraint recognition—explaining why downstream laboratory RL systems (such as [VLA-Precision](VLA-Precision.md) and TwinBridge) require closed-loop physical feedback.
* **What it does not establish**: BEAKER is an offline diagnostic perception/reasoning benchmark rather than a closed-loop physical robot control or RL training environment.

## Sources and artifacts

* Paper: [arXiv:2611.06911](https://arxiv.org/abs/2611.06911)
