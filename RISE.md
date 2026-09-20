# RISE: Self-Improving Robot Policy with Compositional World Model

A compositional dynamics-and-value world model generates imagined rollouts and advantages for robotic policy improvement.

First public date: 2026-02-11. Reviewed: 2026-09-17.

Classification: RL · imagination-based policy improvement.

Status: Paper; arXiv record lists RSS 2026.

## Method

A multi-view dynamics model predicts future observations while a progress-value model evaluates outcomes. These components support a loop of imagined experience, advantage estimation, and policy updates.

## Evidence and limits

The authors demonstrate improvements on three real tasks: dynamic brick sorting, backpack packing, and box closing. Policy improvement in imagination still depends on the world model and its training data; the evidence does not establish general transfer to unseen dynamics. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://arxiv.org/abs/2602.11075).

[Official project](https://opendrivelab.com/RISE/). Consult its current artifact links; full reproduction was not attempted.

[Back to the 2026 guide](2026.md).
