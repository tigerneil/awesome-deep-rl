# General non-linear Bellman equations
> Hado van Hasselt, John Quan, Matteo Hessel, Zhongwen Xu, Diana Borsa, Andre Barreto,

We consider a general class of non-linear Bellman equations. These open up a design space of algorithms that have interesting properties, which has two potential advantages. 

First, we can perhaps better model natural phenomena. For instance, hyperbolic discounting has been proposed as a mathematical model that matches human and animal data well, and can therefore be used to explain preference orderings. 
We present a different mathematical model that matches the same data, but that makes very different predictions under other circumstances. 

Second, the larger design space can perhaps lead to algorithms that perform better, similar to how discount factors are often used in practice even when the true objective is undiscounted. We show that many of the resulting Bellman operators still converge to a fixed point, and therefore that the resulting algorithms are reasonable and inherit many beneficial properties of their linear counterparts
