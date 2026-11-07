# MemRL: Self-Evolving Agents via Runtime Reinforcement Learning on Episodic Memory

First public date: 2026-01-06 (arXiv v1; updated February 2026). Conference venue: NeurIPS 2026.

Authors: MemTensor / MemRL Authors.

Classification: 2026 · Agent RL (NeurIPS 2026).

## Method summary

Fine-tuning LLM weights at runtime for continual agent adaptation is expensive and prone to catastrophic forgetting, while standard retrieval-augmented generation (RAG) over episodic memory retrieves semantically similar but low-utility trajectories. MemRL introduces non-parametric runtime reinforcement learning over episodic memory:

1. **Decoupled frozen reasoning and plastic episodic memory**: Keeps the backbone LLM frozen for stable reasoning while storing structured episodic experiences with learnable utility values ($Q$-values).
2. **Two-phase utility-aware retrieval**: First filters candidate episodic memories by semantic relevance, then selects action/strategy exemplars according to learned $Q$-values.
3. **Runtime TD/utility updates from environment feedback**: After each task episode, environmental rewards update the utilities of retrieved memory entries via trial-and-error reinforcement, promoting high-value strategies and suppressing noisy retrievals without weight updates.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on ALFWorld, BigCodeBench, Humanity's Last Exam (HLE), and Lifelong Agent Bench, outperforming passive RAG and memory-prompting baselines during continual runtime execution.
* **Evidence boundary**: Non-parametric memory RL improves retrieval selection within the frozen LLM's existing capability envelope; it does not update the base model's parametric token policy or physical motor control skills.

## Sources and artifacts

* Paper: [arXiv:2601.03192](https://arxiv.org/abs/2601.03192)
* Code: [https://github.com/MemTensor/MemRL](https://github.com/MemTensor/MemRL)
