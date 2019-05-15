https://openreview.net/pdf?id=S1lqMn05Ym
INFORMATION ASYMMETRY IN KL-REGULARIZED RL
Alexandre Galashov, Siddhant M. Jayakumar, Leonard Hasenclever, Dhruva Tirumala,
Jonathan Schwarz, Guillaume Desjardins, Wojciech M. Czarnecki, Yee Whye Teh,
Razvan Pascanu, Nicolas Heess
DeepMind
London, UK
{agalashov,sidmj,leonardh,dhruvat,schwarzjn,gdesjardins,
lejlot,ywteh,razp,heess}@google.com
ABSTRACT
Many real world tasks exhibit rich structure that is repeated across different parts
of the state space or in time. In this work we study the possibility of leveraging
such repeated structure to speed up and regularize learning. We start from the KL
regularized expected reward objective which introduces an additional component,
a default policy. Instead of relying on a fixed default policy, we learn it from data.
But crucially, we restrict the amount of information the default policy receives,
forcing it to learn reusable behaviours that help the policy learn faster. We formalize
this strategy and discuss connections to information bottleneck approaches and
to the variational EM algorithm. We present empirical results in both discrete
and continuous action domains and demonstrate that, for certain tasks, learning a
default policy alongside the policy can significantly speed up and improve learning.
