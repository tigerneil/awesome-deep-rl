# RL Token: Bootstrapping Online RL with Vision-Language-Action Models

Compact VLA representations enable lightweight online actor-critic learning for the precision-critical parts of robot manipulation.

First public date: 2026-03-19. Reviewed: 2026-09-17.

Classification: RL · real-world online learning · representation reuse.

Status: Official research release and paper; date refers to the release.

## Method

Physical Intelligence extracts an RL Token from a frozen VLA and uses small off-policy actor and critic networks to refine action chunks.

## Evidence and limits

Evaluation targets screwdriver alignment, zip ties, Ethernet insertion, and power-cord insertion. These are critical phases of existing skills, not broad autonomous skill discovery. The Ethernet example distinguishes 15 minutes of robot interaction from two hours elapsed, including resets; sample efficiency is not wall-clock efficiency. Findings are author-reported; this project has not independently reproduced them.

## Sources and artifacts

[Primary source](https://www.pi.website/research/rlt).

[Paper](https://www.pi.website/download/rlt.pdf). No implementation link was found on the checked official release.

[Back to the 2026 guide](2026.md).
