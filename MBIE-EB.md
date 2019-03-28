# Approximate Exploration through State Abstraction
> Adrien Ali Taïga, Aaron Courville, Marc G. Bellemare

[Download from arxiv](https://arxiv.org/pdf/1808.09819.pdf)

## Abstract
Although exploration in reinforcement learning is well understood from a theoretical point of view, provably correct methods remain impractical. 

In this paper we study the interplay between exploration and approximation, what we call approximate exploration. Our main goal is to further our theoretical understanding of pseudo-count based exploration bonuses (Bellemare et al., 2016), a practical exploration scheme based on density modelling. 

As a warm-up, we quantify the performance of an exploration algorithm, MBIE-EB (Strehl and Littman, 2008), when explicitly combined with state aggregation. This allows us toconfirm that, as might be expected, approximation allows the agent to trade off between learning speed and quality of the learned policy. 

Next, we show how a given density model can be related to an abstraction and that the corresponding pseudocount bonus can act as a substitute in MBIE-EB combined with this abstraction, but may lead to either under- or over-exploration. 

Then, we show that a given density model also defines an implicit abstraction, and find a surprising mismatch between pseudo-counts derived either implicitly or explicitly. Finally we derive a new pseudo-count bonus alleviating this issue.
