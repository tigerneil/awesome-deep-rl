# Unsupervised Meta-Learning for Reinforcement Learning
Abhishek Gupta
University of California, Berkeley
abhigupta@eecs.berkeley.edu
Benjamin Eysenbach
Google
eysenbach@google.com
Chelsea Finn
University of California, Berkeley
cbfinn@eecs.berkeley.edu
Sergey Levine
University of California, Berkeley
svlevine@eecs.berkeley.edu

## Abstract
Meta-learning is a powerful tool that builds on multi-task learning to learn how to quickly adapt a model to new tasks. 

In the context of reinforcement learning, meta-learning algorithms can acquire reinforcement learning procedures to solve new problems more efficiently by meta-learning prior tasks. 

The performance of meta-learning algorithms critically depends on the tasks available for meta-training:

in the same way that supervised learning algorithms generalize best to test points drawn from the same distribution as the training points, meta-learning methods generalize best to tasks from the same distribution as the meta-training tasks. 

In effect, meta-reinforcement learning offloads the design burden from algorithm design to task design. 

If we can automate the process of task design as well, we can devise a meta-learning algorithm that is truly automated. 

In this work, we take a step in this direction, proposing a family of unsupervised meta-learning algorithms for reinforcement learning. We describe a general recipe for unsupervised meta-reinforcement learning, and describe an effective instantiation of this approach based on a recently proposed unsupervised exploration technique and model-agnostic meta-learning. We also discuss practical and conceptual considerations for developing unsupervised meta-learning methods. 

Our experimental results demonstrate that unsupervised meta-reinforcement learning effectively acquires accelerated reinforcement learning procedures without the need for manual task design, significantly exceeds the performance of learning from scratch, and even matches performance of meta-learning methods that use hand-specified task distributions. 
