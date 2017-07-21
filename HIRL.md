# Trial without Error: Towards Safe Reinforcement Learning via Human Intervention

William Saunders
Girish Sastry
Andreas Stuhlmüller
Owain Evans

AI systems are increasingly applied to complex tasks that involve interaction
with humans. During training, such systems are potentially dangerous, as they
haven’t yet learned to avoid actions that could cause serious harm. How can an AI
system explore and learn without making a single mistake that harms humans or
otherwise causes serious damage? For model-free reinforcement learning, having a
human “in the loop” and ready to intervene is currently the only way to prevent all
catastrophes. We formalize human intervention for RL and show how to reduce
the human labor required by training a supervised learner to imitate the human’s
intervention decisions. We evaluate this scheme on Atari games, with a Deep RL
agent being overseen by a human for four hours. When the class of catastrophes
is simple, we are able to prevent all catastrophes without affecting the agent’s
learning (whereas an RL baseline fails due to catastrophic forgetting). However,
this scheme is less successful when catastrophes are more complex: it reduces
but does not eliminate catastrophes and the supervised learner fails on adversarial
examples found by the agent. Extrapolating to more challenging environments, we
show that our implementation would not scale (due to the infeasible amount of
human labor required). We outline extensions of the scheme that are necessary if
we are to train model-free agents without a single catastrophe.
