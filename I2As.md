# Imagination-Augmented Agents for Deep Reinforcement Learning (I2As)

Théophane Weber∗ Sébastien Racanière∗ David P. Reichert∗ Lars Buesing
Arthur Guez Danilo Rezende Adria Puigdomènech Badia Oriol Vinyals
Nicolas Heess Yujia Li Razvan Pascanu Peter Battaglia
David Silver Daan Wierstra

We introduce Imagination-Augmented Agents (I2As), a novel architecture for deep
reinforcement learning combining model-free and model-based aspects. In contrast
to most existing model-based reinforcement learning and planning methods,
which prescribe how a model should be used to arrive at a policy, I2As learn to
interpret predictions from a learned environment model to construct implicit plans
in arbitrary ways, by using the predictions as additional context in deep policy
networks. I2As show improved data efficiency, performance, and robustness to
model misspecification compared to several baselines.

## Mathematical formulation

From observation $o_t$, an environment model $\mathcal{M}_\psi$ and rollout policy $\hat{\pi}$ simulate $n$ imagined rollout trajectories $\hat{\tau}_i = (\hat{o}_{t+1}^{(i)}, \hat{r}_{t+1}^{(i)}, \dots, \hat{o}_{t+\tau}^{(i)}, \hat{r}_{t+\tau}^{(i)})$, encoded via a recurrent rollout encoder $\mathcal{E}_\omega$ and fused with a model-free feature path $f_{\text{mf}}(o_t)$:

$$
c_{\text{ia}}(o_t) = \operatorname{Agg}\!\big(\{\mathcal{E}_\omega(\hat{\tau}_i)\}_{i=1}^n\big), \qquad \pi_\theta(a_t \mid o_t),\, V_\theta(o_t) = g_\theta\!\big(f_{\text{mf}}(o_t),\, c_{\text{ia}}(o_t)\big)
$$

