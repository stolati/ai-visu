import React, { useState, useEffect, useMemo, useRef } from 'react';
// @ts-ignore
import createPlotlyComponentModule from 'react-plotly.js/factory';
// @ts-ignore
import Plotly from 'plotly.js-dist-min';
const createPlotlyComponent = createPlotlyComponentModule.default || createPlotlyComponentModule;
const Plot = createPlotlyComponent(Plotly);
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit } from 'lucide-react';

const NUM_LAYERS_MIN = 1;
const NUM_LAYERS_MAX = 10;
const LAYER_SIZE_MIN = 4;
const LAYER_SIZE_MAX = 128;
const MAX_COMPLEXITY = 400; // Overfitting threshold

// The Accuracy function
function calculateAccuracy(numLayers: number, layerSize: number) {
  const representation = (1 - Math.exp(-numLayers / 2.5)) * (1 - Math.exp(-layerSize / 40));
  const complexity = numLayers * layerSize;
  let penalty = 0;
  if (complexity > MAX_COMPLEXITY) {
    penalty = Math.pow((complexity - MAX_COMPLEXITY) / 200, 2);
  }
  const rawAcc = (0.15 + 0.8 * representation) - penalty * 0.5;
  return Math.max(0.05, Math.min(0.99, rawAcc));
}

const LayerNode = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.3, type: "spring" }}
    style={{
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 8px rgba(var(--primary-rgb), 0.5)'
    }}
  />
);

const Dots = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
    <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }} />
  </div>
);

interface LayerOptimizationProps {
  numLayers?: number;
  layerSize?: number;
}

const LayerOptimization = ({ numLayers: propNumLayers, layerSize: propLayerSize }: LayerOptimizationProps) => {
  const [localNumLayers, setLocalNumLayers] = useState(2);
  const [localLayerSize, setLocalLayerSize] = useState(16);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const numLayers = propNumLayers !== undefined ? propNumLayers : localNumLayers;
  const layerSize = propLayerSize !== undefined ? propLayerSize : localLayerSize;

  const setNumLayers = (val: number | ((prev: number) => number)) => {
    if (typeof val === 'function') {
      setLocalNumLayers(val(localNumLayers));
    } else {
      setLocalNumLayers(val);
    }
  };
  const setLayerSize = (val: number | ((prev: number) => number)) => {
    if (typeof val === 'function') {
      setLocalLayerSize(val(localLayerSize));
    } else {
      setLocalLayerSize(val);
    }
  };

  // Surface plot data
  const { xData, yData, zData } = useMemo(() => {
    const x: number[] = [];
    const y: number[] = [];
    const z: number[][] = [];
    
    // Y represents layer size (4 to 128)
    for (let s = LAYER_SIZE_MIN; s <= LAYER_SIZE_MAX; s += 4) {
      y.push(s);
    }
    // X represents num layers (1 to 10)
    for (let n = NUM_LAYERS_MIN; n <= NUM_LAYERS_MAX; n += 1) {
      x.push(n);
    }
    
    for (let s = 0; s < y.length; s++) {
      const zRow: number[] = [];
      for (let n = 0; n < x.length; n++) {
        zRow.push(calculateAccuracy(x[n], y[s]));
      }
      z.push(zRow);
    }
    
    return { xData: x, yData: y, zData: z };
  }, []);

  const currentAccuracy = calculateAccuracy(numLayers, layerSize);


  // Refactored optimization step (runs via useEffect interval instead of nested setState)
  useEffect(() => {
    if (!isOptimizing) return;
    const interval = setInterval(() => {
      const dirs = [[0,0], [1,0], [-1,0], [0,4], [0,-4], [1,4], [-1,-4], [-1,4], [1,-4]];
      let bestAcc = currentAccuracy;
      let bestN = numLayers;
      let bestS = layerSize;
      
      for (const [dn, ds] of dirs) {
        const nextN = Math.max(NUM_LAYERS_MIN, Math.min(NUM_LAYERS_MAX, numLayers + dn));
        const nextS = Math.max(LAYER_SIZE_MIN, Math.min(LAYER_SIZE_MAX, layerSize + ds));
        const acc = calculateAccuracy(nextN, nextS);
        if (acc > bestAcc + 0.001) { // Add small epsilon to avoid oscillating
          bestAcc = acc;
          bestN = nextN;
          bestS = nextS;
        }
      }

      if (bestN === numLayers && bestS === layerSize) {
        setIsOptimizing(false);
      } else {
        setNumLayers(bestN);
        setLayerSize(bestS);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [isOptimizing, numLayers, layerSize, currentAccuracy]);

  // Constructing representation of layers for the architecture viz
  const renderLayer = (size: number, layerIndex: number) => {
    const MAX_NODES = 8;
    let nodeIndices = [];
    if (size <= MAX_NODES) {
      nodeIndices = Array.from({ length: size }, (_, i) => i);
    } else {
      nodeIndices = [0, 1, 2, '...', size - 3, size - 2, size - 1];
    }

    return (
      <div key={`layer-${layerIndex}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          {size}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px 8px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {nodeIndices.map((idx, i) => (
            idx === '...' ? <Dots key={`dots-${i}`} /> : <LayerNode key={`node-${idx}`} delay={layerIndex * 0.1 + (i as number) * 0.02} />
          ))}
        </div>
      </div>
    );
  };

  const hiddenLayers = [];
  if (numLayers <= 6) {
    for (let i = 0; i < numLayers; i++) {
        hiddenLayers.push(renderLayer(layerSize, i + 1));
    }
  } else {
    hiddenLayers.push(renderLayer(layerSize, 1));
    hiddenLayers.push(renderLayer(layerSize, 2));
    hiddenLayers.push(
      <div key="layer-dots" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' }}>
        <Dots />
      </div>
    );
    hiddenLayers.push(renderLayer(layerSize, numLayers - 1));
    hiddenLayers.push(renderLayer(layerSize, numLayers));
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Controls & Architecture Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={24} style={{ color: 'var(--primary)' }} />
              Model Architecture
            </h3>
            <button 
              onClick={() => setIsOptimizing(!isOptimizing)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: isOptimizing ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
              }}
            >
              <Sparkles size={16} />
              {isOptimizing ? 'Stop' : 'Auto Optimize'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Number of Layers (Depth)</label>
              <span style={{ fontWeight: 'bold' }}>{numLayers}</span>
            </div>
            <input 
              type="range" 
              min={NUM_LAYERS_MIN} 
              max={NUM_LAYERS_MAX} 
              value={numLayers} 
              onChange={(e) => {
                setNumLayers(parseInt(e.target.value));
                setIsOptimizing(false);
              }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Neurons per Layer (Width)</label>
              <span style={{ fontWeight: 'bold' }}>{layerSize}</span>
            </div>
            <input 
              type="range" 
              min={LAYER_SIZE_MIN} 
              max={LAYER_SIZE_MAX} 
              step={4}
              value={layerSize} 
              onChange={(e) => {
                setLayerSize(parseInt(e.target.value));
                setIsOptimizing(false);
              }}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', borderLeft: `4px solid ${currentAccuracy > 0.8 ? '#4caf50' : currentAccuracy < 0.4 ? '#f44336' : '#ff9800'}` }}>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Expected Accuracy</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {(currentAccuracy * 100).toFixed(1)}%
            </div>
            {numLayers * layerSize > MAX_COMPLEXITY && (
              <div style={{ fontSize: '0.85rem', color: '#f44336', marginTop: '4px' }}>
                ⚠️ Warning: Model is too complex and is starting to memorize noise (Overfitting).
              </div>
            )}
            {numLayers * layerSize < 50 && (
              <div style={{ fontSize: '0.85rem', color: '#ff9800', marginTop: '4px' }}>
                Model may be too simple to learn complex patterns (Underfitting).
              </div>
            )}
          </div>
        </div>

        {/* Neural Network Diagram */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', overflowX: 'hidden' }}>
          
          {/* Input Layer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Inputs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <LayerNode delay={0} />
              <LayerNode delay={0} />
              <LayerNode delay={0} />
              <LayerNode delay={0} />
            </div>
          </div>

          {/* Hidden Layers */}
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 8px', scrollbarWidth: 'none' }}>
             {hiddenLayers}
          </div>

          {/* Output Layer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Outputs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <LayerNode delay={0.5} />
              <LayerNode delay={0.5} />
            </div>
          </div>

        </div>
      </div>

      {/* 3D Surface Plot */}
      <div style={{ width: '100%', height: '500px', backgroundColor: '#0a0a0c', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
          <Plot
            data={[
              {
                z: zData,
                x: xData,
                y: yData,
                type: 'surface',
                colorscale: 'Viridis',
                showscale: false,
                opacity: 0.9
              },
              {
                x: [numLayers],
                y: [layerSize],
                z: [currentAccuracy],
                mode: 'markers',
                type: 'scatter3d',
                marker: { 
                  size: 14, 
                  color: '#ffffff', 
                  symbol: 'diamond',
                  line: { color: 'var(--primary)', width: 3 }
                }
              }
            ]}
            layout={{
              title: '',
              autosize: true,
              margin: { l: 0, r: 0, b: 0, t: 0 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { color: '#888' },
              scene: {
                xaxis: { title: 'Number of Layers', backgroundcolor: 'transparent', showbackground: false },
                yaxis: { title: 'Layer Size', backgroundcolor: 'transparent', showbackground: false },
                zaxis: { title: 'Accuracy', backgroundcolor: 'transparent', showbackground: false, range: [0, 1] },
                camera: { eye: { x: 1.5, y: -1.5, z: 0.8 } }
              }
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            config={{ displayModeBar: false }}
          />
          {/* Legend Overlay */}
          <div style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'none', backgroundColor: 'rgba(0,0,0,0.6)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '0.9rem' }}>Accuracy Landscape</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#fde725', borderRadius: '2px' }} /> High Accuracy (Sweet Spot)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#440154', borderRadius: '2px' }} /> Low Accuracy (Over/Under-fitting)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'white', border: '2px solid var(--primary)', borderRadius: '2px', transform: 'rotate(45deg)' }} /> Current Parameters
            </div>
          </div>
      </div>
    </div>
  );
};

export default LayerOptimization;
