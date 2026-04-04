import React from "react";
import type { Story } from "@ladle/react";
import LayerOptimization from "./interactions/LayerOptimization";
import SortingMachine from "./interactions/SortingMachine";
import NeuralNetworkStepper from "./interactions/NeuralNetworkStepper";

// --- Layer Optimization Story ---
export const Optimization: Story<{ numLayers: number; layerSize: number }> = ({ numLayers, layerSize }) => (
  <LayerOptimization numLayers={numLayers} layerSize={layerSize} />
);

Optimization.args = {
  numLayers: 2,
  layerSize: 16,
};

Optimization.argTypes = {
  numLayers: {
    control: { type: "range", min: 1, max: 10, step: 1 },
  },
  layerSize: {
    control: { type: "range", min: 4, max: 128, step: 4 },
  },
};

// --- Sorting Machine Story ---
export const PhysicsSorting: Story<{ examplesSeen: number }> = ({ examplesSeen }) => (
  <SortingMachine examplesSeen={examplesSeen} />
);

PhysicsSorting.args = {
  examplesSeen: 0,
};

PhysicsSorting.argTypes = {
  examplesSeen: {
    control: { type: "range", min: 0, max: 100, step: 1 },
  },
};

// --- Neural Network Stepper Story ---
export const NetworkStepper: Story<{ sliderValue: number; step: number }> = ({ sliderValue, step }) => (
  <NeuralNetworkStepper sliderValue={sliderValue} step={step} />
);

NetworkStepper.args = {
  sliderValue: 0,
  step: 0,
};

NetworkStepper.argTypes = {
  sliderValue: {
    control: { type: "range", min: 0, max: 100, step: 1 },
    name: "Input Mixture (Apple vs Orange)",
  },
  step: {
    control: { type: "select", options: [0, 1, 2, 3] },
    name: "Evaluation Step",
  },
};
