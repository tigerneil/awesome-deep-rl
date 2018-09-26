# The Mechanics of n-Player Differentiable Games
David Balduzzi 1 Sebastien Racani´ere` 1 James Martens 1 Jakob Foerster 2 Karl Tuyls 1 Thore Graepel 1

## abstract
The cornerstone underpinning deep learning is the guarantee that gradient descent on an objective converges to local minima. 

Unfortunately, this guarantee fails in settings, such as generative adversarial nets, where there are multiple interacting losses. 

The behavior of gradient-based methods in games is not well understood – and is becoming increasingly important as adversarial and multiobjective architectures proliferate. 

In this paper, we develop new techniques to understand and control the dynamics in general games. 

The key result is to decompose the second-order dynamics into two components. 

The first is related to potential games, which reduce to gradient descent on an implicit function; the second relates to Hamiltonian games, a new class of games that obey a conservation law, akin to conservation laws in classical mechanical systems. 

The decomposition motivates Symplectic Gradient Adjustment (SGA), a new algorithm for finding stable fixed points in general games. 

Basic experiments show SGA is competitive with recently proposed algorithms for finding stable fixed points in GANs – whilst at the same time being applicable to – and having guarantees in – much more general games.
