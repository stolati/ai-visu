import React from 'react';
import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';
import SortingMachine from '../components/interactions/SortingMachine';
import NeuralNetworkStepper from '../components/interactions/NeuralNetworkStepper';

const MachineLearning = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Machine Learning</h1>
      
      <ConceptSkeleton 
        title={<>Explanation of general <Tooltip word="machine learning" text="A subset of AI where systems learn from data." /></>}
        description="An overview of how computers learn patterns directly from data instead of being explicitly programmed."
        sandboxComponent={<SortingMachine />}
      />

      <ConceptSkeleton 
        title={<>Layers (Neural Network Architecture)</>}
        description="Structured levels of 'artificial neurons' where information is processed step-by-step. Let's see how our Apple and Orange features flow through a fully connected dual-layer network."
        sandboxComponent={<NeuralNetworkStepper />}
      />

      <ConceptSkeleton 
        title={<>Layer Size</>}
        description="The number of neurons per layer, which dictates how complex the patterns the model can learn are."
        visualizationDesc="Comparing a narrow pipe (small layer) where only simple shapes can pass through, to a massive multi-lane highway (large layer) identifying intricate details."
        interactiveDesc="A draggable handle to widen or narrow the pipe, visibly changing the amount and complexity of shapes that successfully pass through."
      />

      <ConceptSkeleton 
        title={<><Tooltip word="Backpropagation" text="The method used to train networks by working backward from errors to update internal weights."/></>}
        description="The mechanism the network uses to learn from its mistakes by adjusting its internal math backwards."
        visualizationDesc="A pinball machine where the ball misses the hole; a signal travels backward along the ball's path, shifting the bumpers slightly to fix the trajectory."
        interactiveDesc="Let the user click and drag the pinball flippers. If they miss, the user has to click a 'Backpropagate' button to automatically adjust the flippers."
      />

      <ConceptSkeleton 
        title={<>Model Size Impact</>}
        description="How increasing the sheer scale of the network alters what it is capable of achieving."
        visualizationDesc="A blurry pixelated image of a face that progressively gains resolution and lifelike true-color details as the 'model size' counter increases."
        interactiveDesc="A slider ranging from '1K Parameters' to '1T Parameters' that dynamically sharpens the image and adds vivid color."
      />
    </div>
  );
};

export default MachineLearning;
