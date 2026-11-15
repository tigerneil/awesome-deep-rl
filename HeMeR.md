# HeMeR: Heterogeneous Memory Reconciliation for Embodied Agents via Structured KV Reuse

First public date: 2026-11-12 (arXiv v1). Conference venue: NeurIPS 2026 Oral.

Authors: Saehun Chun, Wonje Choi, Jinwoo Jang, Taeyoon Kwack, Honguk Woo.

Classification: 2026 · Embodied context (NeurIPS 2026 Oral; embodied memory inference architecture, not an RL training algorithm).

## System summary

Embodied foundation-model agents combine declarative memory (explicit semantic knowledge), procedural memory (reusable routines), and working memory (live observations), yet naive prompt reassembly invalidates the transformer key-value (KV) cache at every step. HeMeR introduces structured KV reconciliation across action steps:

1. **Heterogeneous memory state tracking**: Explicitly partitions and tracks declarative, procedural, and working memory blocks across sequential embodied decisions.
2. **Selective KV cache preservation and reconciliation**: Retains precomputed KV states for unchanged memory entries while selectively recomputing and reconciling only the KV slices affected by updated observations or retrieved routines.
3. **Drop-in acceleration for memory-augmented agents**: Preserves decision accuracy while eliminating redundant prefill computation as task progress mutates partial memory context.

## Evaluation boundary

* **What it establishes**: Evaluated on ALFWorld, Habitat, and physical robot deployments; in real-world robot trials, HeMeR reaches 83.20% task success while cutting per-step inference latency from 2.94 s to 1.87 s relative to [MemRL](MemRL.md).
* **What it does not establish**: HeMeR is an inference-time memory and KV-cache reconciliation framework rather than a reinforcement learning policy-update or credit-assignment algorithm (`arXiv:2611.16487`).

## Sources and artifacts

* Paper: [arXiv:2611.16487](https://arxiv.org/abs/2611.16487)
