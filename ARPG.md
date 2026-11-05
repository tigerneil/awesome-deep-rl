# ARPG: LLMs as MDP Designers for Automated Robot Policy Generation

A dependency-aware agentic framework uses language models to formulate aligned MDPs and modular simulator code before RL training.

First public date: 2026-11-03. Reviewed: 2026-11-06.

Classification: RL · automated MDP and reward design · simulated robotics.

Status: Paper; arXiv record lists NeurIPS 2026.

## Method

ARPG separates sequential, dependency-structured MDP modeling (state, action, reward, and termination specifications) from modular simulator implementation, externalizing intermediate artifacts and applying localized verification so generated environments remain learnable.

## Evidence and limits

Experiments in Isaac Sim and additional robotics/control benchmarks report higher environment executability and policy-generation success than monolithic LLM baselines. The results evaluate automated pipeline construction in simulation; they do not establish zero-shot physical robot deployment without sim-to-real calibration. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2611.04974).

Paper and HTML are available; public code release was not established in this review.

[Back to the 2026 guide](2026.md).
