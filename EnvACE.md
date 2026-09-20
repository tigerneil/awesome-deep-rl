# EnvACE: Internalizing Environment Dynamics via World Rehearsal for Agentic Reinforcement Learning

Tool-agent RL trains one policy to act and rehearse environment responses; this is a digital-agent result, not a robotics transfer result.

First public date: 2026-08-06. Reviewed: 2026-09-17.

Classification: RL · LLM tool agents · environment rehearsal.

Status: Preprint.

## Method

Role-wise GRPO jointly optimizes tool calling and environment-response rehearsal using task-success rewards. Rehearsal can also inform execution at inference time.

## Evidence and limits

The authors evaluate BFCL-v4, τ²-Bench, VitaBench, and FinMCP-Bench. Simulated tool responses are not validated physical dynamics, and these benchmarks do not demonstrate real-robot learning. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2608.06197).

[Official repository](https://github.com/Within-yao/EnvACE) records code release on August 7 and Qwen3-based model weights on September 7, 2026.

[Back to the 2026 guide](2026.md).
