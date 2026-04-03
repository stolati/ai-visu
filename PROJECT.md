
The goal is to explain different aspects of llm to non-coder.


# Machine Learning

- Explanation of general machine learning (something simple).
  - An overview of how computers learn patterns directly from data instead of being explicitly programmed.
    - Layers
      - Structured levels of "artificial neurons" where information is processed step-by-step.
    - Layer size
      - The number of neurons per layer, which dictates how complex the patterns the model can learn are.
    - Backpropagation
      - The mechanism the network uses to learn from its mistakes by adjusting its internal math backwards.
- Model size impact on the results
  - How increasing the sheer scale of the network alters what it is capable of achieving.
    - Overfitting
      - When a model simply memorizes the training data instead of learning general rules, failing on new tasks.
    - Better results
      - Larger models often discover deeper, more nuanced patterns yielding much higher quality outputs.
    - More art than science
      - Designing the right architecture involves human intuition and trial-and-error, not just strict formulas.


# LLM

- Changed from general ml
  - How Large Language Models differ from earlier, smaller-scale machine learning systems.
    - Added type of layers
      - Introduction of "Attention" mechanisms (Transformers) that focus on reading text in context.
    - Putting back the input
      - How previous outputs are continuously fed back in as new context to keep the text flowing.

- Word-to-text : the vector
  - Converting human words into mathematical arrays of numbers that the computer can manipulate.
    - What is a token
      - The fundamental building block of text (a word or a syllable) understood by the model.
- Vector output and probality
  - How the model calculates the likelihood of various tokens being the next possible output.
    - Output one word at a time.
      - The step-by-step process of stringing a sentence together by predicting the very next token sequentially.

# Data & Training

- Discovering that size + data is the key
  - The breakthrough realization that massive computing power paired with massive text yields powerful AI.
- Why a high amount of data is important
  - Without vast and varied examples, the model cannot learn the nuances and breadth of human language.
- Where the training data comes from (copyright issues).
  - The sources of text used for training and the legal and ethical debates surrounding their use.
   - Web scrapping
     - Automated gathering of enormous volumes of public text from websites across the internet.
- Humain training (RLHF)
  - Reinforcement Learning from Human Feedback: tuning the model so it behaves according to human preferences.
   - Sycophancy
     - A flaw where the model overly agrees with the user's opinions just to be rated as "helpful."

- Garbage in garbage out

  

# Output

- Vector output (Top-P, Top-K)
  - Techniques to select the next word intelligently by picking from a pool of highly probable options.
    - Repetition penalty
      - A mathematical rule to penalize the model from getting stuck in an infinite loop of repeating phrases.
    - Special values in vector output (like stop sequence)
      - Hidden invisible tokens that tell the model it has finished its thought and should stop generating.
- Temperature
  - A dial controlling creativity: low means precise and predictable, high means diverse and random.
- Hallucination
  - When the model confidently generates plausible-sounding but entirely fabricated or false information.

# What is context

- Prompt
  - The initial text and instructions given to the AI to guide its response.
  - Prompt engineering
    - The skill of crafting the perfect input instructions to get the most accurate or desired response.
- History of conversation
  - Feeding the previous messages back into the model so it "remembers" what was just discussed.
- Problem of prompt injection
  - Malicious inputs designed to trick the AI into ignoring its original instructions or safety rules.



# MCP

- How MCP is connected to the LLM
  - Model Context Protocol: A secure bridge that allows the AI to access external tools and real-time data sources.
  - RAG
    - Retrieval-Augmented Generation: Searching for reliable documents first to anchor the AI's answers in facts.

# Skills

- How AI interacts with the real world
  - Giving the model specific abilities, such as searching the web, executing code, or checking databases.


# Thought process

- Sub-agents (specialization like MCP connection, input modification, output validation)
  - Using smaller, specialized AI routines working together as a team (e.g., one writes, another checks facts).


# Advanced strategy

- Splitting model into parts
  - Distributing different tasks or parts of a massive AI model across multiple systems for speed and efficiency.


# Multi-modal


# Testing - evaluation - benchmarks





# Context problem

- 1M is small
  - Why even a seemingly massive one-million token limit can be restrictive for analyzing large codebases or books.
- Text is super easy in computer (process and storage is super easy, barely an inconvenience).
  - Text takes up very little memory compared to video or images, yet models struggle to process too much at once.

- Context compression
  - Techniques designed to summarize or shrink older information so it fits within the AI's limited memory window.

- How context changes ai behavior (safety, NSFW, sycophancy)
  - Because LLMs constantly adapt to their prompt, leading instructions can drastically alter its personality, triggering unsafe or compliant behavior.
- Prompt injections
  - Emphasizing how the context can be weaponized with hidden commands from untrusted documents.

