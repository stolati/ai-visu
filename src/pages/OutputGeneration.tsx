import React from 'react';
import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';

const OutputGeneration = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Output Generation</h1>
      
      <ConceptSkeleton 
        title={<><Tooltip word="Top-P / Top-K" text="Sampling strategies to limit the pool of possible next words to just the most probable ones."/></>}
        description="Techniques to select the next word intelligently by picking from a pool of highly probable options."
        visualizationDesc="A claw machine dropping down into a pile of only the 'Top 5' best descriptive words, leaving the weird obscure words behind."
        interactiveDesc="Sliders for Top-P and Top-K that physically widen or narrow the claw machine's grabber, showing how many obscure words fall out."
      />

      <ConceptSkeleton 
        title={<>Repetition Penalty</>}
        description="A mathematical rule to penalize the model from getting stuck in an infinite loop of repeating phrases."
        visualizationDesc="A counter that gets visually heavier and darker every time a word is repeated, eventually crushing the word so it can't be used again."
        interactiveDesc="Typing the same word repeatedly increases a visual 'weight' over the word, eventually slamming down and locking it out."
      />

      <ConceptSkeleton 
        title={<>Stop Sequences</>}
        description="Hidden invisible tokens that tell the model it has finished its thought and should stop generating."
        visualizationDesc="A hidden invisible brick wall at the end of a sentence that the AI bumps into, signaling it to turn off its typewriter."
        interactiveDesc="The user can drag a 'Stop' brick wall and place it arbitrarily in the middle of a sentence, forcing the generation to halt right there."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="Temperature" text="A parameter controlling the randomness and creativity of the model's choices."/></>}
        description="A dial controlling creativity: low means precise and predictable, high means diverse and random."
        visualizationDesc="A physical thermometer dial. At 0° it speaks like a strict robot; at 100° it wears a painter's beret and writes chaotic poetry."
        interactiveDesc="A classic temperature dial affecting the output sentence: 0 creates a boring robotic string, 100 makes the text wobble and change colors randomly."
      />

       <ConceptSkeleton 
        title={<><Tooltip word="Hallucination" text="When a model constructs information that sounds plausible but is factually incorrect."/></>}
        description="When the model confidently generates plausible-sounding but entirely fabricated or false information."
        visualizationDesc="The AI confidently building a bridge out of thin air, looking very proud of itself, while a human steps on it and falls through."
        interactiveDesc="A 'Confidence' meter that stays at 99% while the AI builds the invisible bridge, ignoring the user frantically clicking a 'Fact Check' warning bell."
      />
    </div>
  );
};

export default OutputGeneration;
