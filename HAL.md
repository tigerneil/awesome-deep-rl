# Language as an Abstraction for Hierarchical Deep Reinforcement Learning
> Yiding Jiang, Shixiang Gu, Kevin Murphy, Chelsea Finn

## Abstract
Solving complex, temporally-extended tasks is a long-standing problem in reinforcement learning (RL). 

We hypothesize that one critical element of solving such problems is the notion of compositionality. 

With the ability to learn concepts and sub-skills that can be composed to solve longer tasks, i.e. hierarchical RL, we can acquire temporally-extended behaviors. 

However, acquiring effective yet general abstractions for hierarchical RL is remarkably challenging. 

In this paper, we propose to use language as the abstraction, as it provides unique compositional structure, enabling fast learning and combinatorial generalization, while retaining tremendous flexibility, making it suitable for a variety of problems. 

Our approach learns an instruction-following low-level policy and a high-level policy that can reuse abstractions across tasks, in essence, permitting agents to reason using structured language. 

To study compositional task learning, we introduce an open-source object interaction environment built using the MuJoCo physics engine and the CLEVR engine. 

We find that, using our approach, agents can learn to solve to diverse, temporally-extended tasks such as object sorting and multi-object rearrangement, including from raw pixel observations. 

Our analysis find that the compositional nature of language is critical for learning diverse sub-skills and systematically generalizing to new sub-skills in comparison to non-compositional abstractions that use the same supervision.2
