# WHY DOES HIERARCHY (SOMETIMES) WORK SO WELL IN REINFORCEMENT LEARNING?
> Ofir Nachum, Haoran Tang, Xingyu Lu, Shixiang Gu, Honglak Lee, Sergey Levine

## ABSTRACT
Hierarchical reinforcement learning has demonstrated significant success at solving difficult reinforcement learning (RL) tasks. 

Previous works have motivated the use of hierarchy by appealing to a number of intuitive benefits, including learning over temporally extended transitions, exploring over temporally extended periods, and training and exploring in a more semantically meaningful action space, among others. 

However, in fully observed, Markovian settings, it is not immediately clear why hierarchical RL should provide benefits over standard “shallow” RL architectures. 

In this work, we isolate and evaluate the claimed benefits of hierarchical RL on a suite of tasks encompassing locomotion, navigation, and manipulation. 

Surprisingly, we find that most of the observed benefits of hierarchy can be attributed to improved exploration, as opposed to easier policy learning or imposed hierarchical structures. 

Given this insight, we present exploration techniques inspired by hierarchy that achieve performance competitive with hierarchical RL while at the same time being much simpler to use and implement.
