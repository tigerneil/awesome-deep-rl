# Policy Gradient Search: Online Planning and Expert Iteration without Search Trees
> Thomas Anthony, Robert Nishihara, Philipp Moritz, Tim Salimans, and John Schulman

## Abstract
Monte Carlo Tree Search (MCTS) algorithms perform simulation-based search to improve policies online. During search, the simulation policy is adapted to explore the most promising lines of play. 

MCTS has been used by state-of-the-art programs for many problems, however a disadvantage to MCTS is that it estimates the values of states with Monte Carlo averages, stored in a search tree; this does not scale to games with very high branching factors. 

We propose an alternative simulation-based search method, Policy Gradient Search (PGS), which adapts a neural network simulation policy online via policy gradient updates, avoiding the need for a search tree. In Hex, PGS achieves comparable performance to MCTS, and an agent trained using Expert Iteration with PGS was able defeat MoHex 2.0, the strongest open-source Hex agent, in 9x9 Hex.
