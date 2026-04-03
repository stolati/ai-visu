import ConceptSkeleton from '../components/ConceptSkeleton';
import Tooltip from '../components/Tooltip';
import NeuralNetworkStepper from '../components/interactions/NeuralNetworkStepper';
import SortingMachine from '../components/interactions/SortingMachine';

const MachineLearning = () => {
  return (
    <div className="page-transition">
      <h1 className="page-title">Machine Learning</h1>

      <ConceptSkeleton
        title={<>Neural Network Architecture</>}
        description={<>Machine Learning models are built from 'artificial neurons'—simple <strong>mathematical functions</strong> that transform inputs into new outputs. While a single neuron is just basic math, networking them together unlocks fascinating <em>emergent properties</em>, allowing them to recognize highly complex patterns. Let's observe how data flows through a fully connected architecture.</>}
        sandboxComponent={<NeuralNetworkStepper />}
      />

      <ConceptSkeleton
        title={<>Training the Model (Big Data)</>}
        description={<>Remember the "Big Data" craze from a decade ago? It's because modern Machine Learning models require an enormous volume of data to train effectively.<br /><br />The more the merrier, it helps accuracy.<br /><br /> Each time we feed the model an example (input and expected output), an algorithm called <strong>backpropagation</strong> works tirelessly to update the model's internal connections. That's why Amazon Mechanical Turk employ humans to label data at scale.</>}
        sandboxComponent={<SortingMachine />}
      />

      <ConceptSkeleton
        title={<>Layer Size</>}
        description="The number of neurons per layer, which dictates how complex the patterns the model can learn are."
        visualizationDesc="Comparing a narrow pipe (small layer) where only simple shapes can pass through, to a massive multi-lane highway (large layer) identifying intricate details."
        interactiveDesc="A draggable handle to widen or narrow the pipe, visibly changing the amount and complexity of shapes that successfully pass through."
      />

      <ConceptSkeleton
        title={<><Tooltip word="Backpropagation" text="The method used to train networks by working backward from errors to update internal weights." /></>}
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
