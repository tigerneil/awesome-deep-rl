# No Press Diplomacy: Modeling Multi-Agent Gameplay
> Philip Paquette,
Yuchen Lu,
Steven Bocco,
Max O. Smith,
Satya Ortiz-Gagné,
Jonathan K. Kummerfeld,
Satinder Singh,
Joelle Pineau,
Aaron Courville

## Abstract
Diplomacy is a seven-player non-stochastic, non-cooperative game, where agents acquire resources through a mix of teamwork and betrayal. 

Reliance on trust and coordination makes Diplomacy the first non-cooperative multi-agent benchmark for complex sequential social dilemmas in a rich environment. 

In this work, we focus on training an agent that learns to play the No Press version of Diplomacy where there is no dedicated communication channel between players. 

We present DipNet, a neural-network-based policy model for No Press Diplomacy. 

The model was trained on a new dataset of more than 150,000 human games. 

Our model is trained by supervised learning (SL) from expert trajectories, which is then used to initialize a reinforcement learning (RL) agent trained through self-play. 

Both the SL and RL agents demonstrate state-of-the-art No Press performance by beating popular rule-based bots.
