import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LAYER_Y_POSITIONS = [15, 40, 65, 90];
const ARCHITECTURE = [4, 4, 4, 2];

// X Positions calculation (centered within 0-100)
const getXPositions = (nodeCount: number) => {
  if (nodeCount === 2) return [35, 65];
  return [15, 38, 62, 85];
};

const DUMMY_DATA = {
  apple: {
    name: 'Apple 🍎',
    inputs: [0.9, 0.2, 0.7, 0.9], // Color(Red), Smooth, Irregular Round, High Shine
    outputs: [0.98, 0.02] // 98% Apple, 2% Orange
  },
  orange: {
    name: 'Orange 🍊',
    inputs: [0.1, 0.9, 0.95, 0.1], // Color(Orange), Rough, Perfect Round, Low Shine
    outputs: [0.03, 0.97] // 3% Apple, 97% Orange
  }
};

const inputLabels = ["Hue (Color)", "Roughness", "Roundness", "Shininess"];
const outputLabels = ["Apple Prob. 🍎", "Orange Prob. 🍊"];

const NeuralNetworkStepper: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [step, setStep] = useState<number>(0); // 0=Inputs, 1=Hidden1, 2=Hidden2, 3=Outputs
  
  const t = sliderValue / 100;
  const data = {
    name: sliderValue < 50 ? 'Apple-like 🍎' : 'Orange-like 🍊',
    inputs: DUMMY_DATA.apple.inputs.map((val, i) => val + (DUMMY_DATA.orange.inputs[i] - val) * t),
    outputs: DUMMY_DATA.apple.outputs.map((val, i) => val + (DUMMY_DATA.orange.outputs[i] - val) * t)
  };

  const getConnections = () => {
    let connections = [];
    for (let layerIndex = 0; layerIndex < ARCHITECTURE.length - 1; layerIndex++) {
      const currentNodes = ARCHITECTURE[layerIndex];
      const nextNodes = ARCHITECTURE[layerIndex + 1];
      const currentX = getXPositions(currentNodes);
      const nextX = getXPositions(nextNodes);

      for (let i = 0; i < currentNodes; i++) {
        for (let j = 0; j < nextNodes; j++) {
          const weight = (((layerIndex + 1) * (i + 1) * (j + 1) * 7.3) % 5 - 2.5).toFixed(2);
          connections.push({
            id: `edge-${layerIndex}-${i}-${j}`,
            sourceLayer: layerIndex,
            y1: LAYER_Y_POSITIONS[layerIndex],
            x1: currentX[i],
            y2: LAYER_Y_POSITIONS[layerIndex + 1],
            x2: nextX[j],
            weight
          });
        }
      }
    }
    return connections;
  };

  const connections = getConnections();

  return (
    <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Narrative Header */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: sliderValue < 50 ? '#ef4444' : 'var(--text-secondary)' }}>Apple 🍎</span>
              <span>Input Data Mixture</span>
              <span style={{ color: sliderValue >= 50 ? '#f97316' : 'var(--text-secondary)' }}>Orange 🍊</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-color)', cursor: 'pointer' }}
            />
          </div>
          <div style={{ flex: 1 }}></div>
          <button 
             className="button-primary" 
             onClick={() => setStep(s => Math.max(0, s - 1))}
             disabled={step === 0}
             style={{ opacity: step === 0 ? 0.3 : 1 }}
          >
            Prev Step
          </button>
          <button 
             className="button-primary" 
             onClick={() => setStep(s => Math.min(3, s + 1))}
             disabled={step === 3}
             style={{ opacity: step === 3 ? 0.3 : 1 }}
             >
            Next Step
          </button>
        </div>
        
        <div className="glass-panel" style={{ padding: '1rem' }}>
           <h3 style={{ margin: 0, color: 'var(--accent-color)' }}>
              Step {step + 1}: {
                step === 0 ? "Feature Extraction (Inputs)" :
                step === 1 ? "Layer 1 Processing (Edges & Weights)" :
                step === 2 ? "Layer 2 Processing (Deep Patterns)" :
                "Output Classification"
              }
           </h3>
           <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              { step === 0 && `We analyze the ${data.name} image and break it into 4 numerical features to feed into the 4 input nodes.` }
              { step === 1 && `The data travels along weighted connections to the first hidden layer. The lines flash to show data transmitting.` }
              { step === 2 && `The first layer combines the simple features to detect complex patterns, then passes it to the final hidden layer.` }
              { step === 3 && `The network concludes its mathematical journey, spitting out the exact probability of this being an Apple vs. Orange.` }
           </p>
        </div>
      </div>

      {/* Network Interactive Visualization */}
      <div style={{ flex: 1, position: 'relative', background: '#0f172a', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--panel-border)', minHeight: '500px' }}>
        
        {/* Layer Titles */}
        {LAYER_Y_POSITIONS.map((y, i) => (
          <div key={`title-${i}`} style={{
            position: 'absolute', top: `${y}%`, left: '4%', transform: 'translateY(-50%)',
            color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, zIndex: 1
          }}>
            {i === 0 ? 'Inputs' : i === ARCHITECTURE.length - 1 ? 'Outputs' : `Layer ${i}`}
          </div>
        ))}

        {/* SVG Path Connections Layer */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
           {connections.map(conn => {
              const isActiveNodeSequence = step > conn.sourceLayer;
              const isPulsing = step === conn.sourceLayer + 1; // It pulses during the transition phase it represents

              const labelX = conn.x1 + (conn.x2 - conn.x1) * 0.35;
              const labelY = conn.y1 + (conn.y2 - conn.y1) * 0.35;

              return (
                <g key={conn.id}>
                  <line 
                    x1={`${conn.x1}%`} y1={`${conn.y1}%`} x2={`${conn.x2}%`} y2={`${conn.y2}%`} 
                    stroke={isActiveNodeSequence ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth={isActiveNodeSequence ? 2 : 1}
                  />
                  <text 
                    x={`${labelX}%`} 
                    y={`${labelY}%`} 
                    fill={isActiveNodeSequence ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"} 
                    fontSize="9" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    style={{ transition: 'all 0.4s ease' }}
                  >
                    {conn.weight}
                  </text>
                  {isPulsing && (
                    <motion.circle 
                      cx={`${conn.x1}%`} cy={`${conn.y1}%`} r="3" fill="#a78bfa"
                      initial={{ cx: `${conn.x1}%`, cy: `${conn.y1}%` }}
                      animate={{ cx: `${conn.x2}%`, cy: `${conn.y2}%` }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </g>
              )
           })}
        </svg>

        {/* DOM Node Layer */}
        {ARCHITECTURE.map((nodeCount, layerIdx) => {
           const xPositions = getXPositions(nodeCount);
           const isInput = layerIdx === 0;
           const isOutput = layerIdx === ARCHITECTURE.length - 1;
           const nodeActive = step >= layerIdx;

           let activeBgColor = 'var(--accent-color)';
           let activeBorderColor = '#a78bfa';
           let glowColor = 'var(--accent-color)';

           if (isInput) {
             activeBgColor = 'var(--warning-color)';
             activeBorderColor = '#fbbf24';
             glowColor = 'var(--warning-color)';
           } else if (isOutput) {
             activeBgColor = 'var(--success-color)';
             activeBorderColor = '#34d399';
             glowColor = 'var(--success-color)';
           }

           return xPositions.map((x, i) => (
              <div 
                key={`node-${layerIdx}-${i}`}
                style={{
                  position: 'absolute',
                  top: `${LAYER_Y_POSITIONS[layerIdx]}%`,
                  left: `${x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '60px',
                  height: '40px',
                  borderRadius: '8px',
                  background: nodeActive ? activeBgColor : '#1e293b',
                  border: `2px solid ${nodeActive ? activeBorderColor : '#334155'}`,
                  boxShadow: nodeActive ? `0 0 15px ${glowColor}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s ease',
                  zIndex: 2,
                  color: 'white',
                  fontWeight: 600
                }}
              >
                 <div style={{ position: 'absolute', width: '150%', top: '-25px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: '0.75rem', color: 'white', whiteSpace: 'nowrap' }}>
                     {isInput ? inputLabels[i] : isOutput ? outputLabels[i] : ''}
                 </div>
                 
                 {(isInput && step >= 0) && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     {(data.inputs[i]).toFixed(2)}
                   </motion.div>
                 )}

                 {(isOutput && step >= 3) && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     {Math.round(data.outputs[i] * 100)}%
                   </motion.div>
                 )}
              </div>
           ));
        })}
      </div>
    </div>
  );
};

export default NeuralNetworkStepper;
