# Heave-Ho: Decentralized Long-Horizon Multi-Humanoid Collaboration

First public date: 2026-11-17 (arXiv v1).

Authors: Ting-Hsuan Chen, Siheng Zhao, Han Jiang, Qi Pan, Louison Lu, Jiaheng Luo, Henghui Bao, Yiyu Chen, Quan Nguyen, Yue Wang.

Classification: 2026 · Embodied RL (recent preprint).

## Method summary

Extending whole-body humanoid control ([Rhythm](Rhythm.md), [HLO-AMP](HLO-AMP.md)) from paired motion primitives to long-horizon decentralized teams without network links, **Heave-Ho** introduces a two-level collaborative loco-manipulation architecture:

1. **Multi-agent post-training of humanoid foundation tracking models**: Adapts a whole-body tracking prior under physically coupled forces between humanoids so each robot executes coordinated decentralized control solely from local proprioceptive and egocentric observations.
2. **Vision-language planning with speech-based leader–follower synchronization**: Pairs a high-level VLM task planner with acoustic speech cues to synchronize phase transitions across robots without wireless network communication.
3. **Zero-shot team-size & heterogeneity scaling (`HH-Bench`)**: Trained on only two identical humanoids, decentralized policies scale zero-shot to teams of 2–10 robots and heterogeneous morphologies across 12 collaborative loco-manipulation tasks in `HH-Bench`.

## Mathematical formulation

Under a physically coupled decentralized POMDP where agent $i \in \{1, \dots, N\}$ receives local observation $o_t^i$, acoustic leader cue $m_t^{\text{speech}}$, and experiences unknown wrenches $f_t^{\text{ext}, i}(s_t, \mathbf{a}_t)$ transmitted through shared payloads, multi-agent RL post-training optimizes decentralized residual/tracking policies $\pi_\theta(a_t^i \mid o_t^i, g_t^i)$ with centralized training critic $V_\phi(s_t)$ ([MAPPO](MAPPO.md)):

$$
\max_{\theta}\; \mathbb{E}_{\mathbf{a}_t \sim \prod_{i=1}^N \pi_\theta(\cdot \mid o_t^i, g_t^i)}\!\left[\sum_{t=0}^{T} \gamma^t \Big(r_{\text{track}}(s_t, \mathbf{g}_t) + r_{\text{coop}}(s_t, \mathbf{f}_t^{\text{ext}}) - \beta D_{\text{KL}}\big(\pi_\theta \,\|\, \pi_{\text{prior}}\big)\Big)\right]
$$

where $g_t^i = \mathcal{P}_{\text{VLM}}(I_t^i, m_t^{\text{speech}})$ denotes the locally decoded motion reference synchronized by speech cues.

## Evaluation and evidence boundary

* **Reported scope**: Evaluated on `HH-Bench` (12 long-horizon tasks spanning 2–10 humanoids and heterogeneous embodiments) plus physical multi-humanoid collaborative transport/manipulation experiments without inter-robot network packets.
* **Evidence boundary**: Recent arXiv preprint (`arXiv:2611.22275`); speech-based synchronization assumes audible acoustic conditions, and low-level competence builds upon a pretrained humanoid motion-tracking foundation prior.

## Sources and artifacts

* Paper: [arXiv:2611.22275](https://arxiv.org/abs/2611.22275)
* Code: [https://github.com/heaveho-humanoid/Heave-Ho](https://github.com/heaveho-humanoid/Heave-Ho)
* Project page: [https://heaveho-humanoid.github.io/](https://heaveho-humanoid.github.io/)
