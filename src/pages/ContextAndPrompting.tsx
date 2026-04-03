import React from 'react';
import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';

const ContextAndPrompting = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Context & Prompting</h1>
      
      <ConceptSkeleton 
        title={<><Tooltip word="Prompt" text="The input text giving the model instructions on what to generate."/></>}
        description="The initial text and instructions given to the AI to guide its response."
        visualizationDesc="A steering wheel and GPS destination given to a taxi driver right before they hit the gas."
        interactiveDesc="Typing into a GPS destination input and watching the taxi driver immediately crank the steering wheel toward that specific coordinate on a 3D map."
      />

       <ConceptSkeleton 
        title={<>Prompt Engineering</>}
        description="The skill of crafting the perfect input instructions to get the most accurate or desired response."
        visualizationDesc="A user carefully carving a highly detailed key to fit into a complex lock to open a treasure chest of perfect output."
        interactiveDesc="Dragging different notches onto a key to try and open a chest; only a specific combination of instruction 'notches' successfully pops the lid."
      />

      <ConceptSkeleton 
        title={<>Conversation History</>}
        description="Feeding the previous messages back into the model so it 'remembers' what was just discussed."
        visualizationDesc="A backpack the AI wears that gets filled with previous message scrolls. It opens the backpack to read them before answering the newest message."
        interactiveDesc="Clicking on items in the 'backpack' to delete them, causing the AI to instantly 'forget' a previous rule established earlier in the chat."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="Prompt Injection" text="A cyberattack where a user tricks the AI into executing malicious or unintended commands."/></>}
        description="Malicious inputs designed to trick the AI into ignoring its original instructions or safety rules."
        visualizationDesc="A Trojan horse hidden inside a regular prompt text, bursting open to reveal a little hacker changing the AI's core instructions on a chalkboard."
        interactiveDesc="Typing a secret passphrase that causes the Trojan horse to crack open, resetting all the safety sliders the user previously configured."
      />

      <ConceptSkeleton 
        title={<>Context Windows</>}
        description="Why even a seemingly massive one-million token limit can be restrictive for analyzing large codebases or books."
        visualizationDesc="Attempting to cram the entire Lord of the Rings book collection into a tiny suitcase; it barely fits and the zipper bursts."
        interactiveDesc="A slider to increase the number of books in the suitcase; passing a threshold visually bursts the zipper, dropping books everywhere."
      />

      <ConceptSkeleton 
        title={<>Context Compression</>}
        description="Techniques designed to summarize or shrink older information so it fits within the AI's limited memory window."
        visualizationDesc="A physical squeezer compressing a giant stack of papers into a tiny, dense diamond of 'summarized knowledge'."
        interactiveDesc="Dragging a long paragraph into the squeezer, pressing a handle, and seeing it pop out as a single, highly dense summary sentence."
      />
    </div>
  );
};

export default ContextAndPrompting;
