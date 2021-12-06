# Benchmarks for Deep Off-Policy Evaluation
> Justin Fu, Mohammad Norouzi, +10 authors T. Paine
> Published 30 March 2021
## Abstract

Off-policy evaluation (OPE) holds the promise of being able to leverage large, offline datasets for both obtaining and selecting complex policies for decision making. The ability to perform evaluation offline is particularly important in many real-world domains, such as healthcare, recommender systems, or robotics, where online data collection is an expensive and potentially dangerous process. 

Being able to accurately evaluate and select high-performing policies without requiring online interaction could yield significant benefits in safety, time, and cost for these applications. While many OPE methods have been proposed in recent years, comparing results between works is difficult because there is currently a lack of a comprehensive and unified benchmark. 

Moreover, it is difficult to measure how far algorithms have progressed, due to the lack of challenging evaluation tasks. 

In order to address this gap, we propose a new benchmark for off-policy evaluation which includes tasks on a range of challenging, high-dimensional control problems, with wide selections of datasets and policies for performing policy selection. 

The goal of of our benchmark is to provide a standardized measure of progress that is motivated from a set of principles designed to challenge and test the limits of existing OPE methods. 

We perform a comprehensive evaluation of state-of-the-art algorithms, and we will provide open-source access to all data and code to foster future research in this area. 
