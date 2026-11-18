# Asynchronous Methods for Deep Reinforcement Learning (A3C)

First public date: 2016-02-04. Conference venue: ICML 2016 (ICML 2026 Test of Time Award).

Authors: Volodymyr Mnih, Adrià Puigdomènech Badia, Mehdi Mirza, Alex Graves, Timothy P. Lillicrap, Tim Harley, David Silver, Koray Kavukcuoglu.

## Method summary

Rather than stabilizing off-policy learning with a large experience replay buffer as in [DQN](DQN.md), Asynchronous Advantage Actor-Critic (**A3C**) executes multiple parallel actor-learners asynchronously across independent environment instances. Parallelism decorrelates online experience streams, stabilizes on-policy updates without replay memory, supports recurrent policies (`LSTM`), and scales across discrete Atari games and continuous MuJoCo control—establishing the distributed actor-learner paradigm later scaled by [IMPALA](IMPALA.md) and modern LLM post-training engines.

## Mathematical formulation

Each parallel worker rolls out a $k$-step trajectory under local copy $\theta', \phi'$ and accumulates multi-step temporal-difference advantage gradients with entropy regularization $\beta \mathcal{H}\big(\pi_{\theta'}(\cdot \mid s_t)\big)$:

$$
R_t^{(k)} = \sum_{i=0}^{k-1} \gamma^i r_{t+i} + \gamma^k V_{\phi'}(s_{t+k}), \qquad \hat{A}_t^{(k)} = R_t^{(k)} - V_{\phi'}(s_t)
$$

$$
d\theta \leftarrow d\theta + \nabla_{\theta'} \log \pi_{\theta'}(a_t \mid s_t)\,\hat{A}_t^{(k)} + \beta \nabla_{\theta'} \mathcal{H}\big(\pi_{\theta'}(\cdot \mid s_t)\big), \qquad d\phi \leftarrow d\phi + \frac{\partial \big(R_t^{(k)} - V_{\phi'}(s_t)\big)^2}{\partial \phi'}
$$

Asynchronous lock-free (`Hogwild!` / shared RMSProp) updates apply $(d\theta, d\phi)$ periodically to the global parameters $(\theta, \phi)$.

## Sources and artifacts

* Paper: [arXiv:1602.01783](https://arxiv.org/abs/1602.01783)
