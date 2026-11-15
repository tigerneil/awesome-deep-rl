# T3: Reducing Belief Deviation in Reinforcement Learning for Active Reasoning

First public date: 2025-10-14 (arXiv v1). Conference venue: ICLR 2026 Oral.

Authors: Deyu Zou, Yongqiang Chen, Jianxiang Wang, Haochen Yang, Mufei Li, James Cheng, Pan Li, Yu Gong.

Classification: 2026 · Agent RL (ICLR 2026 Oral).

## Method summary

In multi-turn active information-seeking tasks, LLM agents frequently suffer **belief deviation**: their implicit internal belief drifts away from the true environment state, causing repetitive or uninformative tool queries whose trajectory tails corrupt outcome-based RL credit assignment. $\mathbf{T}^3$ (*Track-and-Truncate Trajectories*) introduces belief-controlled RL:

1. **Online belief-deviation tracking**: Monitors divergence between the agent's evolving internal state summary/hypotheses and observed interaction evidence across turns.
2. **Deviation-triggered trajectory truncation**: Detects when belief deviation crosses a reliability threshold and truncates the training rollout before uninformative tail segments accumulate spurious positive or negative outcome credit.
3. **Prefix credit preservation**: Concentrates policy-gradient updates on informative early information-gathering prefixes, stabilizing exploration and shrinking rollout token budgets.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated across five multi-turn active-reasoning and interactive information-seeking benchmarks, reporting accuracy gains of up to +30 points while reducing training/rollout token cost by up to 34%.
* **Evidence boundary**: First posted on arXiv in October 2025 (`arXiv:2510.12264`) and published as an ICLR 2026 Oral; targets text-based multi-turn information-gathering agents and depends on calibrated belief-deviation detection.

## Sources and artifacts

* Paper: [arXiv:2510.12264](https://arxiv.org/abs/2510.12264)
* Code: [https://github.com/unimpor/T3](https://github.com/unimpor/T3)
