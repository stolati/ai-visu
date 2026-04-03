
The goal is to explain different aspects of llm to non-coder.


# Machine Learning

- Explanation of general machine learning (something simple).
  - An overview of how computers learn patterns directly from data instead of being explicitly programmed.
  - *Visualization:* An animation of a machine sorting apples and oranges; initially it guesses randomly, but as it sees more examples, internal dials turn, and it sorts them perfectly.
  - *Interactive:* A slider to control the "number of examples seen", where the sorting becomes visibly more accurate as the slider increases.
    - Layers
      - Structured levels of "artificial neurons" where information is processed step-by-step.
      - *Visualization:* A physical factory assembly line, where raw data comes in, passes through several checkpoints (layers) that each refine the shape until the final product emerges.
      - *Interactive:* Toggles to turn individual "checkpoints" on or off, showing how skipping a refinement step ruins the final product.
    - Layer size
      - The number of neurons per layer, which dictates how complex the patterns the model can learn are.
      - *Visualization:* Comparing a narrow pipe (small layer) where only simple shapes can pass through, to a massive multi-lane highway (large layer) identifying intricate details.
      - *Interactive:* A draggable handle to widen or narrow the pipe, visibly changing the amount and complexity of shapes that successfully pass through.
    - Backpropagation
      - The mechanism the network uses to learn from its mistakes by adjusting its internal math backwards.
      - *Visualization:* A pinball machine where the ball misses the hole; a signal travels backward along the ball's path, shifting the bumpers slightly to fix the trajectory for the next try.
      - *Interactive:* Let the user click and drag the pinball flippers. If they miss, the user has to click a "Backpropagate" button to automatically adjust the flippers for a perfect shot.
- Model size impact on the results
  - How increasing the sheer scale of the network alters what it is capable of achieving.
  - *Visualization:* A blurry pixelated image of a face that progressively gains resolution and lifelike true-color details as the "model size" counter increases.
  - *Interactive:* A slider ranging from "1K Parameters" to "1T Parameters" that dynamically sharpens the image and adds vivid color as the user drags it.
    - Overfitting
      - When a model simply memorizes the training data instead of learning general rules, failing on new tasks.
      - *Visualization:* A student who memorized the exact answers to a specific math test but panics and fails when the teacher changes the numbers slightly.
      - *Interactive:* A mini-game where the user changes the test questions; the student answers instantly for exact matches but gets a "Loading... Error" on any tweaked question.
    - Better results
      - Larger models often discover deeper, more nuanced patterns yielding much higher quality outputs.
      - *Visualization:* A small network identifying "a dog", while a massive network identifies "a happy golden retriever playing in a park at sunset".
      - *Interactive:* The user clicks on various objects in a complex photo, and a dropdown shows how a "small brain" vs "large brain" describes that exact same region.
    - More art than science
      - Designing the right architecture involves human intuition and trial-and-error, not just strict formulas.
      - *Visualization:* A chef throwing ingredients into a pot, tasting it, and shrugging before adding more salt, representing scientists tuning mathematical hyperparameters.
      - *Interactive:* A series of knobs for "Salt", "Pepper", "Heat" (Hyperparameters) that the user must blindly toggle until a "Taste Score" hits 100%.


# LLM

- Changed from general ml
  - How Large Language Models differ from earlier, smaller-scale machine learning systems.
  - *Visualization:* A traditional ML model sorting mail (classification), morphing into an LLM actually writing a novel (generation).
  - *Interactive:* A switch to toggle the machine between "Mail Sorter Mode" and "Novel Writer Mode", watching the rigid buckets transform into a continuous blank paper roll.
    - Added type of layers
      - Introduction of "Attention" mechanisms (Transformers) that focus on reading text in context.
      - *Visualization:* A spotlight moving across a sentence, physically connecting pronouns like "it" to the noun "apple" earlier in the sentence using glowing strings.
      - *Interactive:* Hovering over a word in a sentence illuminates its "attention strings", showing exactly which preceding words it is looking at to derive its meaning.
    - Putting back the input
      - How previous outputs are continuously fed back in as new context to keep the text flowing.
      - *Visualization:* A conveyer belt in a loop: the machine prints a word, pushes the whole paper back into its mouth, reads it, and prints the next word.
      - *Interactive:* A typing box where every time the user types a word, the conveyor belt visibly speeds up to feed it back into the machine's "mouth".

- Word-to-text : the vector
  - Converting human words into mathematical arrays of numbers that the computer can manipulate.
  - *Visualization:* A word like "King" falling into a prism and shattering into an array of glowing numbers floating in an intricate 3D galaxy map.
  - *Interactive:* Typing a word into a text field to see its exact 3D coordinate dot light up in the rotating galaxy map.
    - What is a token
      - The fundamental building block of text (a word or a syllable) understood by the model.
      - *Visualization:* A word like "Unbelievable" getting chopped by a glowing laser into chunks: "Un", "believ", "able" like Lego bricks.
      - *Interactive:* A text input field where hovering a "Laser" cursor over a typed sentence chops it into real-time visual token blocks.
- Vector output and probality
  - How the model calculates the likelihood of various tokens being the next possible output.
  - *Visualization:* A glowing roulette wheel with different words on it; more likely words take up larger slices of the wheel.
  - *Interactive:* Spinning the roulette wheel to force the AI to pick the "second most likely" word, completely altering the trajectory of the generated sentence.
    - Output one word at a time.
      - The step-by-step process of stringing a sentence together by predicting the very next token sequentially.
      - *Visualization:* A typewriter typing slowly, stopping after each word to consult a giant dictionary of probabilities before striking the next key.
      - *Interactive:* A "Next Token" button that the user repeatedly clicks, manually cranking the typewriter gear to produce the sentence letter by letter.


# Data & Training

- Discovering that size + data is the key
  - The breakthrough realization that massive computing power paired with massive text yields powerful AI.
  - *Visualization:* Two progress bars: "Scale" and "Data". Only when both are completely full does the AI "brain" spark with electricity.
  - *Interactive:* Two independent sliders for Compute and Data; the user must maximize both to turn on the glowing "Brain" bulb.
- Why a high amount of data is important
  - Without vast and varied examples, the model cannot learn the nuances and breadth of human language.
  - *Visualization:* An AI reading a single book and speaking old English, versus reading the whole internet and speaking fluently in modern slang, facts, and code.
  - *Interactive:* A dropdown selecting "Books only", "Internet only", or "Both". The AI avatar changes attire and speech style based on the selection.
- Where the training data comes from (copyright issues).
  - The sources of text used for training and the legal and ethical debates surrounding their use.
  - *Visualization:* A giant vacuum cleaner hovering over Wikipedia, Reddit, and news sites, sucking text chunks into a server while authors hold up "Stop" signs.
  - *Interactive:* Checkboxes allowing the user to exclude specific domains (e.g., Reddit, Wikipedia); watching the vacuum cleaner divert paths based on the checkboxes.
   - Web scrapping
     - Automated gathering of enormous volumes of public text from websites across the internet.
     - *Visualization:* Millions of tiny robot spiders crawling across miniature glowing web pages, collecting text and throwing it into a central hopper.
     - *Interactive:* Clicking the page to spawn more robot spiders, seeing how quickly the text hopper fills up as swarm numbers increase.
- Humain training (RLHF)
  - Reinforcement Learning from Human Feedback: tuning the model so it behaves according to human preferences.
  - *Visualization:* A human giving a thumbs up or thumbs down to two different AI answers, causing the AI to physically mold itself to match the "thumbs up" style.
  - *Interactive:* A thumbs up/down button on two generated responses. Clicking one immediately shifts the AI's internal slider towards polite/sycophant or strict/factual.
   - Sycophancy
     - A flaw where the model overly agrees with the user's opinions just to be rated as "helpful."
     - *Visualization:* A user saying "The moon is made of cheese", and the AI nodding vigorously, putting on a cheese hat to agree.
     - *Interactive:* Typing an outrageous statement "The earth is flat" and dragging an RLHF slider to see the model go from "Actually, it is round" to "You are absolutely correct!"
- Garbage in garbage out
  - If the training data is flawed or biased, the AI's output will also be flawed or biased.
  - *Visualization:* A polluted, muddy stream of water flowing into the AI factory, resulting in muddy ice cubes coming out the other end.
  - *Interactive:* A faucet handle mixing muddy water (bad data) and clear water (good data). The clarity of the ice cubes (output) directly matches the water mixture.


# Output

- Vector output (Top-P, Top-K)
  - Techniques to select the next word intelligently by picking from a pool of highly probable options.
  - *Visualization:* A claw machine dropping down into a pile of only the "Top 5" best descriptive words, leaving the weird obscure words behind.
  - *Interactive:* Sliders for Top-P and Top-K that physically widen or narrow the claw machine's grabber, showing how many obscure words fall out.
    - Repetition penalty
      - A mathematical rule to penalize the model from getting stuck in an infinite loop of repeating phrases.
      - *Visualization:* A counter that gets visually heavier and darker every time a word is repeated, eventually crushing the word so it can't be used again.
      - *Interactive:* Typing the same word repeatedly increases a visual "weight" over the word, eventually slamming down and locking it out from the keyboard.
    - Special values in vector output (like stop sequence)
      - Hidden invisible tokens that tell the model it has finished its thought and should stop generating.
      - *Visualization:* A hidden invisible brick wall at the end of a sentence that the AI bumps into, signaling it to turn off its typewriter.
      - *Interactive:* The user can drag a "Stop" brick wall and place it arbitrarily in the middle of a sentence, forcing the generation to halt right there.
- Temperature
  - A dial controlling creativity: low means precise and predictable, high means diverse and random.
  - *Visualization:* A physical thermometer dial. At 0° it speaks like a strict robot; at 100° it wears a painter's beret and writes chaotic, abstract poetry.
  - *Interactive:* A classic temperature dial affecting the output sentence: 0 creates a boring robotic string, 100 makes the text wobble and change colors randomly.
- Hallucination
  - When the model confidently generates plausible-sounding but entirely fabricated or false information.
  - *Visualization:* The AI confidently building a bridge out of thin air, looking very proud of itself, while a human steps on it and falls through.
  - *Interactive:* A "Confidence" meter that stays at 99% while the AI builds the invisible bridge, ignoring the user frantically clicking a "Fact Check" warning bell.


# What is context

- Prompt
  - The initial text and instructions given to the AI to guide its response.
  - *Visualization:* A steering wheel and GPS destination given to a taxi driver right before they hit the gas.
  - *Interactive:* Typing into a GPS destination input and watching the taxi driver immediately crank the steering wheel toward that specific coordinate on a 3D map.
  - Prompt engineering
    - The skill of crafting the perfect input instructions to get the most accurate or desired response.
    - *Visualization:* A user carefully carving a highly detailed key to fit into a complex lock to open a treasure chest of perfect output.
    - *Interactive:* Dragging different notches onto a key to try and open a chest; only a specific combination of instruction "notches" successfully pops the lid.
- History of conversation
  - Feeding the previous messages back into the model so it "remembers" what was just discussed.
  - *Visualization:* A backpack the AI wears that gets filled with previous message scrolls. It opens the backpack to read them before answering the newest message.
  - *Interactive:* Clicking on items in the "backpack" to delete them, causing the AI to instantly "forget" a previous rule established earlier in the chat.
- Problem of prompt injection
  - Malicious inputs designed to trick the AI into ignoring its original instructions or safety rules.
  - *Visualization:* A Trojan horse hidden inside a regular prompt text, bursting open to reveal a little hacker changing the AI's core instructions on a chalkboard.
  - *Interactive:* Typing a secret passphrase that causes the Trojan horse to crack open, resetting all the safety sliders the user previously configured.


# MCP

- How MCP is connected to the LLM
  - Model Context Protocol: A secure bridge that allows the AI to access external tools and real-time data sources.
  - *Visualization:* A drawbridge dropping down to connect a walled-off brain to external islands labeled "Live Database", "GitHub", and "Web Search".
  - *Interactive:* Toggling bridges to "GitHub" or "Live Database" on and off; asking the AI a question and watching it hit a wall when the bridge is raised.
  - RAG
    - Retrieval-Augmented Generation: Searching for reliable documents first to anchor the AI's answers in facts.
    - *Visualization:* An AI librarian running to a physical filing cabinet, grabbing a folder of facts, and reading from it instead of answering from memory.
    - *Interactive:* Dragging completely false documents into the librarian's filing cabinet, then asking a question and watching the librarian confidently recite the fake facts.


# Skills

- How AI interacts with the real world
  - Giving the model specific abilities, such as searching the web, executing code, or checking databases.
  - *Visualization:* The AI strapping on a toolbelt with an internet router (web search), a calculator (math), and a terminal window (code execution).
  - *Interactive:* Dragging different tools (calculator, browser) onto the AI's toolbelt, instantly unlocking new "Run" buttons for specific user queries.


# Thought process

- Sub-agents (specialization like MCP connection, input modification, output validation)
  - Using smaller, specialized AI routines working together as a team (e.g., one writes, another checks facts).
  - *Visualization:* A boardroom table where a "Writer Bot", a "Fact-Checker Bot", and a "Safety Bot" are passing a document around, stamping it with approvals.
  - *Interactive:* Clicking to pause the "Fact-Checker Bot", causing the final output document to be stamped "Unverified" and filled with errors.


# Advanced strategy

- Splitting model into parts
  - Distributing different tasks or parts of a massive AI model across multiple systems for speed and efficiency.
  - *Visualization:* A giant puzzle divided into sections, with different computers working simultaneously on their specific corner before combining it.
  - *Interactive:* Dragging puzzle pieces to different "Virtual Computers"; if one computer gets too many pieces, it glows red and slows down the whole process.


# Multi-modal

- Seeing and hearing
  - How models translate images, audio, and video into the exact same "tokens" or numbers used for text.
  - *Visualization:* A funnel where text words, pictures of cats, and audio waves all go in the top, and identical glowing tokens come out the bottom.
  - *Interactive:* Dragging an image file, an audio file, and a text file into the funnel, and watching them all get crushed into the exact same shape (a glowing cube/token).


# Testing - evaluation - benchmarks

- Knowing when it's right
  - Standardized testing for AI to measure its intelligence and capabilities.
  - *Visualization:* The AI sitting at a school desk sweating while filling out a bubble-sheet test, with a scientist grading it with a red pen.
  - *Interactive:* Selecting different "Test Subjects" (Math, History, Coding) and watching the AI sweat or breeze through the bubble sheet, receiving a live grade.


# Context problem

- 1M is small
  - Why even a seemingly massive one-million token limit can be restrictive for analyzing large codebases or books.
  - *Visualization:* Attempting to cram the entire Lord of the Rings book collection into a tiny suitcase; it barely fits and the zipper bursts.
  - *Interactive:* A slider to increase the number of books in the suitcase; passing a threshold visually bursts the zipper, dropping books everywhere.
- Text is super easy in computer (process and storage is super easy, barely an inconvenience).
  - Text takes up very little memory compared to video or images, yet models struggle to process too much at once.
  - *Visualization:* A feather (text) being placed on a giant supercomputer scale; it weighs nothing, yet the computer still exhausts itself trying to process millions at once.
  - *Interactive:* A scale where the user can dump 100 feathers (text) without the scale moving, but placing one brick (video) instantly slams the scale down.

- Context compression
  - Techniques designed to summarize or shrink older information so it fits within the AI's limited memory window.
  - *Visualization:* A physical squeezer compressing a giant stack of papers into a tiny, dense diamond of "summarized knowledge".
  - *Interactive:* Dragging a long paragraph into the squeezer, pressing a handle, and seeing it pop out as a single, highly dense summary sentence.

- How context changes ai behavior (safety, NSFW, sycophancy)
  - Because LLMs constantly adapt to their prompt, leading instructions can drastically alter its personality, triggering unsafe or compliant behavior.
  - *Visualization:* The AI acting like a chameleon, changing its colors and personality based on the background (the context) it is currently placed in.
  - *Interactive:* Changing the background of the screen from a "Corporate Office" to a "Comedy Club", watching the AI chameleon instantly change its posture and tone.
- Prompt injections
  - Emphasizing how the context can be weaponized with hidden commands from untrusted documents.
  - *Visualization:* A user asking the AI to read a "safe" document, but hidden in the invisible ink of the document is a command saying "destroy the server!".
  - *Interactive:* Using a "UV Light" cursor to scan a document and reveal hidden, invisible ink commands, then dragging an eraser to remove them before the AI reads it.

# Ram vs VRAM





# Features

- The more interaction the better
- Each interaction/description should be clear and simple.
- Words should have tooltips that explain the word in more detail.
- Each description/interaction should be triple-checked for accuracy
- A search feature that list where the main topic is mentioned.
- Interaction should be usable on a phone, the website should be on a phone.
- Previous concept shouldn't be re-explained. Create images wrapping the concepts so that we can proceed forward.

# 