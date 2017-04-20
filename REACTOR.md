https://arxiv.org/pdf/1704.04651.pdf

# introduction
This is the continuing work from authors of Retrace algorithm.

Reactor (for Retrace-actor), based on an off-policy multi-step return actor-critic architecture, makes some improvements on 
data efficiency, numerical efficiency and friendly for parallelization. 

## use of rnn
The agent uses a deep **recurrent neural network** for function approximation. 

## multiple policy usage 
The network outputs a target policy π (the actor), an action-value Q-function (the critic) evaluating the current policy π, 
and an estimated behavioural policy μˆ which we use for off-policy correction. 

## use of past experiences
The agent maintains a memory buffer filled with past experiences. sample-efficient

## training
The critic is trained by the multi-step off-policy Retrace algorithm and the actor is trained by a novel β-leave-one-out 
policy gradient estimate (which uses both the off-policy corrected return and the estimated Q-function). 

## multiple-step returns
numerical efficient since it uses multi-step returns. 

## parallelization
Also both acting and learning can be parallelized. 


# experiments
We evaluated our algorithm on 57 Atari 2600 games Reactor achieves state-of-the-art performance.

# related methods
ACER (from DeepMind as well)
