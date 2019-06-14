# Fast Task Inference with Variational Intrinsic Successor Features
> Steven Hansen, Will Dabney, André Barreto, Tom Van de Wiele, David Warde-Farley, Volodymyr Mnih

## Abstract
It has been established that diverse behaviors spanning the controllable subspace of an Markov decision process can be trained by rewarding a policy for being distinguishable from other policies [Gregor et al., 2016, Eysenbach et al., 2018, Warde-Farley et al., 2018]. 

However, one limitation of this formulation is generalizing behaviors beyond the finite set being explicitly learned, as is needed for use on subsequent tasks. 

Successor features [Dayan, 1993, Barreto et al., 2017] provide an appealing solution to this generalization problem, but require defining the reward function as linear in some grounded feature space. 

In this paper, we show that these two techniques can be combined, and that each method solves the other’s primary limitation. 

To do so we introduce Variational Intrinsic Successor FeatuRes (VISR), a novel algorithm which learns controllable features that can be leveraged to provide enhanced generalization and fast task inference through the successor feature framework. 

We empirically validate VISR on the full Atari suite, in a novel setup wherein the rewards are only exposed briefly after a long unsupervised phase. 

Achieving human-level performance on 14 games and beating all baselines, we believe VISR represents a step towards agents that rapidly learn from limited feedback.
