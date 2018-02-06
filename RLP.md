Randomized Linear Programming Solves the Discounted Markov Decision Problem In Nearly-Linear (Sometimes Sublinear) Run Time

Mengdi Wang, Princeton
https://arxiv.org/pdf/1704.01869.pdf

We propose a novel randomized linear programming algorithm for approximating the optimal policy of the discounted Markov decision problem. By leveraging the value-policy duality and binary-tree
data structures, the algorithm adaptively samples state-action-state transitions and makes exponentiated primal-dual updates. 

We show that it finds an ǫ-optimal policy using nearly-linear run time in the worst
case. 

When the Markov decision process is ergodic and specified in some special data formats, the algorithm finds an ǫ-optimal policy using run time linear in the total number of state-action pairs, which
is sublinear in the input size. These results provide a new venue and complexity benchmarks for solving stochastic dynamic programs.
