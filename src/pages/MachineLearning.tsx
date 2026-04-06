import ConceptSkeleton from '../components/ConceptSkeleton';
import NeuralNetworkStepper from '../components/interactions/NeuralNetworkStepper';
import SortingMachine from '../components/interactions/SortingMachine';
import LayerOptimization from '../components/interactions/LayerOptimization';

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
        title={<>Network Architecture (Depth & Width)</>}
        description={<>The size and shape of a neural network determines what it is capable of learning. <br/><br/><strong>Depth (Number of Layers)</strong> allows the network to learn progressively more abstract features. <strong>Width (Layer Size)</strong> allows it to process more features per level.<br/><br/>However, making a network too large for a simple problem leads to <strong>Overfitting</strong>—the model simply memorizes the training data noise instead of learning the underlying patterns, sharply degrading its real-world accuracy.</>}
        sandboxComponent={<LayerOptimization />}
      />


    </div>
  );
};

export default MachineLearning;
