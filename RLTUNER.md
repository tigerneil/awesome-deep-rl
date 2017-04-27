The approach of training sequence models using supervised learning and next-step
prediction suffers from known failure modes. For example, it is notoriously diffi-
cult to ensure multi-step generated sequences have coherent global structure. We
propose a novel sequence-learning approach in which we use a pre-trained Recurrent
Neural Network (RNN) to supply part of the reward value in a Reinforcement
Learning (RL) model. Thus, we can refine a sequence predictor by optimizing
for some imposed reward functions, while maintaining good predictive properties
learned from data. We propose efficient ways to solve this by augmenting deep
Q-learning with a cross-entropy reward and deriving novel off-policy methods for
RNNs from KL control. We explore the usefulness of our approach in the context
of music generation. An LSTM is trained on a large corpus of songs to predict
the next note in a musical sequence. This Note-RNN is then refined using our
method and rules of music theory. We show that by combining maximum likelihood
(ML) and RL in this way, we can not only produce more pleasing melodies,
but significantly reduce unwanted behaviors and failure modes of the RNN, while
maintaining information learned from data.
