# ANTE: Anticipate, Then Execute — Learning Internal World Models for Coding Agents from Verified Beliefs

Agentic RL trains coding agents to state pre-action outcome predictions, verify them against real execution, and turn verified beliefs into step-level credit.

First public date: 2026-10-11. Reviewed: 2026-11-06.

Classification: RL · coding agents · internal world models and credit assignment.

Status: Preprint.

## Method

Before each action, the policy outputs an explicit belief about execution outcomes. Belief-Anchored Policy Optimization (BAPO) verifies these forecasts against actual container execution to assign per-step advantages and calibrate trust-or-abstain decisions, while ANTE-TTO ranks candidate actions at inference time without an external verifier.

## Evidence and limits

The authors evaluate Qwen3-based agents on SWE-bench Verified, Terminal-Bench 2.0, and out-of-distribution coding benchmarks. Results apply to containerized software-engineering environments with deterministic test/execution feedback, not noisy physical robot dynamics. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2610.15368).

Paper and HTML are available; check the paper's associated pages for any subsequent code or checkpoint releases.

[Back to the 2026 guide](2026.md).
