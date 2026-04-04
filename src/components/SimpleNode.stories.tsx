import React from "react";
import type { Story } from "@ladle/react";

// A simple dummy component that takes parameters and renders them
const SimpleNode = ({ color, size, text }: { color: string; size: number; text: string }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '8px',
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'sans-serif'
    }}>
      {text}
    </div>
  );
};

export const NodeStory: Story<{ color: string; size: number; text: string }> = ({ color, size, text }) => {
  return <SimpleNode color={color} size={size} text={text} />;
};

// These are Ladle "Controls" (the parameters you can tweak via the UI)
NodeStory.args = {
  color: "#3f51b5",
  size: 150,
  text: "Hello Ladle!"
};

NodeStory.argTypes = {
  color: {
    control: { type: "color" },
    description: "The background color of the node.",
  },
  size: {
    control: { type: "range", min: 50, max: 300, step: 10 },
    description: "Width and height of the box in pixels.",
  },
  text: {
    control: { type: "text" },
    description: "The label text.",
  }
};

NodeStory.storyName = "Configurable Node Layout";
