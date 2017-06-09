Multiagent Bidirectionally-Coordinated Nets
for Learning to Play StarCraft Combat Games

Peng Peng†, Quan Yuan†, Ying Wen‡, Yaodong Yang‡, Zhenkun Tang†, Haitao Long†, Jun Wang‡ ∗
†Alibaba Group, ‡University College London

Real-world artificial intelligence (AI) applications often require multiple agents
to work in a collaborative effort. Efficient learning for intra-agent communication
and coordination is an indispensable step towards general AI. In this paper, we take
StarCraft combat game as the test scenario, where the task is to coordinate multiple
agents as a team to defeat their enemies. To maintain a scalable yet effective
communication protocol, we introduce a multiagent bidirectionally-coordinated
network (BiCNet [’bIknet]) with a vectorised extension of actor-critic formulation.
We show that BiCNet can handle different types of combats under diverse terrains
with arbitrary numbers of AI agents for both sides. Our analysis demonstrates
that without any supervisions such as human demonstrations or labelled data,
BiCNet could learn various types of coordination strategies that is similar to these
of experienced game players. Moreover, BiCNet is easily adaptable to the tasks
with heterogeneous agents. In our experiments, we evaluate our approach against
multiple baselines under different scenarios; it shows state-of-the-art performance,
and possesses potential values for large-scale real-world applications.
