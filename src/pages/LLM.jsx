import React from 'react';
import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';

const LLM = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Large Language Models</h1>
      
      <ConceptSkeleton 
        title={<>Generative Shift</>}
        description="How Large Language Models differ from earlier, smaller-scale machine learning systems."
        visualizationDesc="A traditional ML model sorting mail (classification), morphing into an LLM actually writing a novel (generation)."
        interactiveDesc="A switch to toggle the machine between 'Mail Sorter Mode' and 'Novel Writer Mode'."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="Attention Mechanisms" text="A technique that allows models to weigh the importance of different words in a sequence contextually."/></>}
        description="Introduction of 'Attention' mechanisms (Transformers) that focus on reading text in context."
        visualizationDesc="A spotlight moving across a sentence, physically connecting pronouns like 'it' to the noun 'apple' earlier in the sentence using glowing strings."
        interactiveDesc="Hovering over a word in a sentence illuminates its 'attention strings', showing exactly which preceding words it is looking at."
      />

      <ConceptSkeleton 
        title={<>Word-to-Vector</>}
        description="Converting human words into mathematical arrays of numbers that the computer can manipulate."
        visualizationDesc="A word like 'King' falling into a prism and shattering into an array of glowing numbers floating in an intricate 3D galaxy map."
        interactiveDesc="Typing a word into a text field to see its exact 3D coordinate dot light up in the rotating galaxy map."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="What is a token" text="The fundamental piece of a word (a syllable or character) understood by the model."/></>}
        description="The fundamental building block of text understood by the model."
        visualizationDesc="A word like 'Unbelievable' getting chopped by a glowing laser into chunks: 'Un', 'believ', 'able' like Lego bricks."
        interactiveDesc="A text input field where hovering a 'Laser' cursor over a typed sentence chops it into real-time visual token blocks."
      />

       <ConceptSkeleton 
        title={<>Vector Output & Probability</>}
        description="How the model calculates the likelihood of various tokens being the next possible output."
        visualizationDesc="A glowing roulette wheel with different words on it; more likely words take up larger slices of the wheel."
        interactiveDesc="Spinning the roulette wheel to force the AI to pick the 'second most likely' word, completely altering the trajectory of the generated sentence."
      />

      <ConceptSkeleton 
        title={<>Autoregressive Generation</>}
        description="The step-by-step process of stringing a sentence together by predicting the very next token sequentially."
        visualizationDesc="A typewriter typing slowly, stopping after each word to consult a giant dictionary of probabilities before striking the next key."
        interactiveDesc="A 'Next Token' button that the user repeatedly clicks, manually cranking the typewriter gear to produce the sentence letter by letter."
      />
    </div>
  );
};

export default LLM;
