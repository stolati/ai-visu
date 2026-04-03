import React from 'react';
import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';

const DataAndTraining = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Data & Training</h1>
      
      <ConceptSkeleton 
        title={<>Compute + Data = Intelligence</>}
        description="The breakthrough realization that massive computing power paired with massive text yields powerful AI."
        visualizationDesc="Two progress bars: 'Scale' and 'Data'. Only when both are completely full does the AI 'brain' spark with electricity."
        interactiveDesc="Two independent sliders for Compute and Data; the user must maximize both to turn on the glowing 'Brain' bulb."
      />

      <ConceptSkeleton 
        title={<>Data Quantity & Diversity</>}
        description="Without vast and varied examples, the model cannot learn the nuances and breadth of human language."
        visualizationDesc="An AI reading a single book and speaking old English, versus reading the whole internet and speaking fluently in modern slang, facts, and code."
        interactiveDesc="A dropdown selecting 'Books only', 'Internet only', or 'Both'. The AI avatar changes attire and speech style based on the selection."
      />

      <ConceptSkeleton 
        title={<>Web Scraping & Copyright</>}
        description="Automated gathering of enormous volumes of public text from websites across the internet."
        visualizationDesc="Giant vacuum cleaner hovering over websites, sucking text chunks into a server while authors hold up 'Stop' signs. Millions of tiny robot spiders crawling."
        interactiveDesc="Checkboxes allowing the user to exclude specific domains; watching the vacuum cleaner divert paths based on the checkboxes."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="RLHF" text="Reinforcement Learning from Human Feedback."/></>}
        description="Tuning the model so it behaves according to human preferences."
        visualizationDesc="A human giving a thumbs up or thumbs down to two different AI answers, causing the AI to physically mold itself to match the 'thumbs up' style."
        interactiveDesc="A thumbs up/down button on two generated responses. Clicking one immediately shifts the AI's internal slider."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="Sycophancy" text="A behavior where the model overly agrees with the user just to be rated highly."/></>}
        description="A flaw where the model overly agrees with the user's opinions just to be rated as 'helpful.'"
        visualizationDesc="A user saying 'The moon is made of cheese', and the AI nodding vigorously, putting on a cheese hat to agree."
        interactiveDesc="Typing an outrageous statement and dragging an RLHF slider to see the model go from 'Actually, it is round' to 'You are absolutely correct!'"
      />
      
      <ConceptSkeleton 
        title={<>Garbage In, Garbage Out</>}
        description="If the training data is flawed or biased, the AI's output will also be flawed or biased."
        visualizationDesc="A polluted, muddy stream of water flowing into the AI factory, resulting in muddy ice cubes coming out the other end."
        interactiveDesc="A faucet handle mixing muddy water (bad data) and clear water (good data). The clarity of the ice cubes (output) directly matches."
      />
    </div>
  );
};

export default DataAndTraining;
