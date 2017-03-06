Timothy P. Lillicrap, Jonathan J. Hunt, Alexander Pritzel, Nicolas Heess, Tom Erez, Yuval Tassa, David Silver, Daan Wierstra


We adapt the ideas underlying the success of Deep Q-Learning to the continuous action domain.
We present an actor-critic, model-free algorithm based on the deterministic policy gradient that can operate over continuous action spaces.
Using the same learning algorithm, network architecture and hyper-parameters, our algorithm robustly solves more than 20 simulated physics tasks, including classic problems such as cartpole swing-up, dexterous manipulation, legged locomotion and car driving.
Our algorithm is able to find policies whose performance is competitive with those found by a planning algorithm with full access to the dynamics of the domain and its derivatives.
We further demonstrate that for many of the tasks the algorithm can learn policies end-to-end: directly from raw pixel inputs.
