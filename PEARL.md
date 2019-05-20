# Efficient Off-Policy Meta-Reinforcement Learning via Probabilistic Context Variables
Kate Rakelly, Aurick Zhou, Deirdre Quillen, Chelsea Finn, Sergey Levine
(Submitted on 19 Mar 2019)
Deep reinforcement learning algorithms require large amounts of experience to learn an individual task. 

While in principle meta-reinforcement learning (meta-RL) algorithms enable agents to learn new skills from small amounts of experience, several major challenges preclude their practicality. 

Current methods rely heavily on on-policy experience, limiting their sample efficiency. 

They also lack mechanisms to reason about task uncertainty when adapting to new tasks, limiting their effectiveness in sparse reward problems. 

In this paper, we address these challenges by developing an off-policy meta-RL algorithm that disentangles task inference and control. 

In our approach, we perform online probabilistic filtering of latent task variables to infer how to solve a new task from small amounts of experience. 

This probabilistic interpretation enables posterior sampling for structured and efficient exploration. 

We demonstrate how to integrate these task variables with off-policy RL algorithms to achieve both meta-training and adaptation efficiency. 

Our method outperforms prior algorithms in sample efficiency by 20-100X as well as in asymptotic performance on several meta-RL benchmarks.
