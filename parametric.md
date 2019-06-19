# When to use parametric models in reinforcement learning?

> Hado van Hasselt, Matteo Hessel, John Aslanides

## Abstract
We examine the question of when and how parametric models are most useful in reinforcement learning.

In particular, we look at commonalities and differences between parametric models and experience replay.

Replay-based learning algorithms share important traits with model-based approaches, including the ability to plan: to use more computation without additional data to improve predictions and behaviour. 

We discuss when to expect benefits from either approach, and interpret prior work in this context. 

We hypothesise that, under suitable conditions, replay-based algorithms should be competitive to or better than model-based algorithms if the model is used only to generate fictional transitions from observed states for an update rule that is otherwise model-free. 

We validated this hypothesis on Atari 2600 video games. 

The replay-based algorithm attained state-of-the-art data efficiency, improving over prior results with parametric models
