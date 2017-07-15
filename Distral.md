Distral: Robust Multitask Reinforcement Learning

Yee Whye Teh, Victor Bapst, Wojciech Marian Czarnecki, John Quan,
James Kirkpatrick, Raia Hadsell, Nicolas Heess, Razvan Pascanu
DeepMind, London, UK

Most deep reinforcement learning algorithms are data inefficient in complex and
rich environments, limiting their applicability to many scenarios. One direction
for improving data efficiency is multitask learning with shared neural network
parameters, where efficiency may be improved through transfer across related tasks.
In practice, however, this is not usually observed, because gradients from different
tasks can interfere negatively, making learning unstable and sometimes even less
data efficient. Another issue is the different reward schemes between tasks, which
can easily lead to one task dominating the learning of a shared model. We propose
a new approach for joint training of multiple tasks, which we refer to as Distral
(Distill & transfer learning). Instead of sharing parameters between the different
workers, we propose to share a “distilled” policy that captures common behaviour
across tasks. Each worker is trained to solve its own task while constrained to
stay close to the shared policy, while the shared policy is trained by distillation
to be the centroid of all task policies. Both aspects of the learning process are
derived by optimizing a joint objective function. We show that our approach
supports efficient transfer on complex 3D environments, outperforming several
related methods. Moreover, the proposed learning process is more robust and more
stable—attributes that are critical in deep reinforcement learning.
