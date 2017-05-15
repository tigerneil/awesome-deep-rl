https://arxiv.org/pdf/1703.01260.pdf

Efficient exploration in high-dimensional environments remains a key challenge in reinforcement
learning (RL). 

Deep reinforcement learning methods have demonstrated the ability to
learn with highly general policy classes for complex
tasks with high-dimensional inputs, such as raw images. However, many of the most
effective exploration techniques rely on tabular representations, or on the ability to construct a
generative model over states and actions. 

Both are exceptionally difficult when these inputs are
complex and high dimensional. On the other hand, it is comparatively easy to build discriminative
models on top of complex states such as images using standard deep neural networks.

This paper introduces a novel approach, EX2, which approximates state visitation densities by
training an ensemble of discriminators, and assigns reward bonuses to rarely visited states. 

We demonstrate that EX2 achieves comparable performance to the state-of-the-art methods on lowdimensional
tasks, and its effectiveness scales into high-dimensional state spaces such as visual domains without hand-designing features or density
models.
