import React from 'react';
import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';

const AdvancedTopics = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Advanced Topics</h1>
      
      <ConceptSkeleton 
        title={<><Tooltip word="MCP" text="Model Context Protocol: A secure standard for giving language models access to external tools and data."/></>}
        description="A secure bridge that allows the AI to access external tools and real-time data sources."
        visualizationDesc="A drawbridge dropping down to connect a walled-off brain to external islands labeled 'Live Database', 'GitHub', and 'Web Search'."
        interactiveDesc="Toggling bridges to 'GitHub' or 'Live Database' on and off; asking the AI a question and watching it hit a wall when the bridge is raised."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="RAG" text="Retrieval-Augmented Generation: Giving the model relevant documents to base its answers on."/></>}
        description="Searching for reliable documents first to anchor the AI's answers in facts."
        visualizationDesc="An AI librarian running to a physical filing cabinet, grabbing a folder of facts, and reading from it instead of answering from memory."
        interactiveDesc="Dragging completely false documents into the librarian's filing cabinet, then asking a question and watching the librarian confidently recite the fake facts."
      />

      <ConceptSkeleton 
        title={<>Agent Teams (Sub-Agents)</>}
        description="Using smaller, specialized AI routines working together as a team (e.g., one writes, another checks facts)."
        visualizationDesc="A boardroom table where a 'Writer Bot', a 'Fact-Checker Bot', and a 'Safety Bot' are passing a document around, stamping it with approvals."
        interactiveDesc="Clicking to pause the 'Fact-Checker Bot', causing the final output document to be stamped 'Unverified' and filled with errors."
      />

      <ConceptSkeleton 
        title={<>Multi-Modal Inputs</>}
        description="How models translate images, audio, and video into the exact same 'tokens' or numbers used for text."
        visualizationDesc="A funnel where text words, pictures of cats, and audio waves all go in the top, and identical glowing tokens come out the bottom."
        interactiveDesc="Dragging an image file, an audio file, and a text file into the funnel, and watching them all get crushed into the exact same shape (a glowing cube/token)."
      />

      <ConceptSkeleton 
        title={<>Evaluations & Benchmarks</>}
        description="Standardized testing for AI to measure its intelligence and capabilities."
        visualizationDesc="The AI sitting at a school desk sweating while filling out a bubble-sheet test, with a scientist grading it with a red pen."
        interactiveDesc="Selecting different 'Test Subjects' (Math, History, Coding) and watching the AI sweat or breeze through the bubble sheet, receiving a live grade."
      />
    </div>
  );
};

export default AdvancedTopics;
