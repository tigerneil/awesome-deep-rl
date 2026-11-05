# RAVEL: World Models Need Not Be Right to Rank Policies Right

Theoretical bounds and empirical policy tournaments separate pairwise ranking fidelity in learned world models from audit covariance and closed-loop optimization safety.

First public date: 2026-10-31. Reviewed: 2026-11-06.

Classification: Evaluation & theory · learned world models · policy selection.

Status: Paper; arXiv record lists NeurIPS 2026 Workshop on World Models in Physical AI.

## Method

The authors derive a pairwise simulation identity that separates shared common-mode Bellman residuals from policy-specific error, motivating RAVEL (Relative Auditing of Value Errors in Learned models), a selective policy tournament calibrated with held-out real outcomes.

## Evidence and limits

Tests across 45 SAC, TD3, and PPO policies on DeepMind Control locomotion tasks show that learned models can preserve strong pairwise policy rankings even when paired audit correlations are near zero and closed-loop optimization against the frozen model degrades real return. Thus good policy ranking in a world model does not guarantee safe policy optimization inside that model. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2611.01139).

Paper and HTML are available.

[Back to the 2026 guide](2026.md).
