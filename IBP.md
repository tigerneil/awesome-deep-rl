Learning model-based planning from scratch

Razvan Pascanu, Yujia Li, Oriol Vinyals, Nicolas Heess, Lars Buesing, Sebastien Racanière, David Reichert, Théophane Weber, Daan Wierstra, Peter Battaglia

Conventional wisdom holds that model-based planning is a powerful approach
to sequential decision-making. It is often very challenging in practice, however,
because while a model can be used to evaluate a plan, it does not prescribe how
to construct a plan. Here we introduce the “Imagination-based Planner”, the
first model-based, sequential decision-making agent that can learn to construct,
evaluate, and execute plans. Before any action, it can perform a variable number
of imagination steps, which involve proposing an imagined action and evaluating
it with its model-based imagination. All imagined actions and outcomes are
aggregated, iteratively, into a “plan context” which conditions future real and
imagined actions. The agent can even decide how to imagine: testing out alternative
imagined actions, chaining sequences of actions together, or building a more
complex “imagination tree” by navigating flexibly among the previously imagined
states using a learned policy. And our agent can learn to plan economically, jointly
optimizing for external rewards and computational costs associated with using
its imagination. We show that our architecture can learn to solve a challenging
continuous control problem, and also learn elaborate planning strategies in a
discrete maze-solving task. Our work opens a new direction toward learning the
components of a model-based planning system and how to use them.
