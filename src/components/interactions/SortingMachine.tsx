import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import DriftSlider from './DriftSlider';

const SortingMachine: React.FC = () => {
  const [examplesSeen, setExamplesSeen] = useState<number>(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef(0);
  const lastForceTimeRef = useRef(0);

  // Sync state to ref for physics engine loop
  useEffect(() => {
    examplesRef.current = examplesSeen;
  }, [examplesSeen]);

  // Matter.js Physics Engine Setup
  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Matter.Engine.create();
    
    // Enable slight gravity
    engine.world.gravity.y = 1;

    const cw = sceneRef.current.clientWidth;
    const ch = sceneRef.current.clientHeight;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    });

    // --- Static Architecture (The Map) ---
    // Funnel Walls (angled)
    const funnelLeft = Matter.Bodies.rectangle(cw * 0.2, 50, cw * 0.6, 20, { 
        isStatic: true, angle: Math.PI * 0.2, render: { fillStyle: '#334155' } 
    });
    const funnelRight = Matter.Bodies.rectangle(cw * 0.8, 50, cw * 0.6, 20, { 
        isStatic: true, angle: -Math.PI * 0.2, render: { fillStyle: '#334155' } 
    });

    // Grinding Gears (polygons)
    const gear1 = Matter.Bodies.polygon(cw * 0.4, 130, 8, 25, { 
        isStatic: true, render: { fillStyle: '#8b5cf6' }, friction: 0.5 
    });
    const gear2 = Matter.Bodies.polygon(cw * 0.6, 130, 8, 25, { 
        isStatic: true, render: { fillStyle: '#8b5cf6' }, friction: 0.5 
    });

    // Sorting Buckets and Divider
    const divider = Matter.Bodies.rectangle(cw * 0.5, ch - 50, 10, 100, { 
        isStatic: true, render: { fillStyle: '#475569' } 
    });
    
    const floorLeft = Matter.Bodies.rectangle(cw * 0.25, ch - 5, cw * 0.5, 10, { 
        isStatic: true, render: { fillStyle: '#ef4444' } 
    });
    const floorRight = Matter.Bodies.rectangle(cw * 0.75, ch - 5, cw * 0.5, 10, { 
        isStatic: true, render: { fillStyle: '#f97316' } 
    });

    Matter.Composite.add(engine.world, [funnelLeft, funnelRight, gear1, gear2, divider, floorLeft, floorRight]);

    // Initial fill of infinite ball pool
    const ballPool: Matter.Body[] = [];
    for(let i=0; i < 90; i++) {
        const isApple = Math.random() > 0.5;
        const ball = Matter.Bodies.circle(cw * 0.5 + (Math.random() * 40 - 20), -150 - (i * 12), 7, {
            restitution: 0.4,
            friction: 0.005,
            density: 0.04,
            render: { fillStyle: isApple ? '#ef4444' : '#f97316' },
            label: isApple ? 'apple' : 'orange'
        });
        ballPool.push(ball);
    }
    Matter.Composite.add(engine.world, ballPool);

    // Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Physics Loop & Business Logic Hooks
    Matter.Events.on(engine, 'beforeUpdate', () => {
        // Spin gears continuously
         Matter.Body.setAngle(gear1, gear1.angle + 0.03);
         Matter.Body.setAngle(gear2, gear2.angle - 0.03);

         // --- Anti-Jam Forcing Function ---
         const now = Date.now();
         if (now - lastForceTimeRef.current > 1000) {
             const engineBodies = Matter.Composite.allBodies(engine.world);
             let lowestBall = null;
             let max_y = -Infinity;
             
             engineBodies.forEach(b => {
                 // Find balls stuck anywhere above the center of the grinders (y=130)
                 if (!b.isStatic && b.position.y < 130) {
                     if (b.position.y > max_y) {
                         max_y = b.position.y;
                         lowestBall = b;
                     }
                 }
             });
             
             if (lowestBall) {
                 // Definitively force-pull the trapped ball straight down through the gap
                 Matter.Body.setVelocity(lowestBall as Matter.Body, { x: 0, y: 12 });
             }
             lastForceTimeRef.current = now;
         }

         const currentDataScale = examplesRef.current / 100; // 0 to 1 multiplier

         const bodies = Matter.Composite.allBodies(engine.world);
         let activeBalls = 0;

         bodies.forEach(body => {
             if (!body.isStatic) {
                 activeBalls++;
                 
                 // Apply algorithmic ML "learning force" to softly direct apples natively to left bucket, oranges to right.
                 // This effectively models the neural weights getting increasingly competent.
                 // Force applies specifically inside the sorting decision zone underneath the gears.
                 if (body.position.y > 150 && body.position.y < 300) {
                     // The curve shapes how competent the forces are.
                     const curveAccuracy = 0.5 * (1 - Math.exp(-currentDataScale * 3.3)); 
                     // Scale force based on slider state. At 0, Force=0 (falls naturally/randomly).
                     const forceMag = curveAccuracy * 0.005; 

                     if (body.label === 'apple') {
                         Matter.Body.applyForce(body, body.position, { x: -forceMag, y: 0 });
                     } else if (body.label === 'orange') {
                         Matter.Body.applyForce(body, body.position, { x: forceMag, y: 0 });
                     }
                 }

                 // Infinite Loop effect: Recycle bodies that fall out bounds
                 if (body.position.y > ch + 20) {
                     // Randomly select type for the recycling
                     const isApple = Math.random() > 0.5;
                     body.label = isApple ? 'apple' : 'orange';
                     body.render.fillStyle = isApple ? '#ef4444' : '#f97316';
                     
                     Matter.Body.setPosition(body, { x: cw * 0.5 + (Math.random() * 80 - 40), y: -80 - Math.random() * 50 });
                     Matter.Body.setVelocity(body, { x: 0, y: 0 });
                     Matter.Body.setAngularVelocity(body, 0);
                 }
             }
         });
    });

    return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
        if (render.canvas) {
            render.canvas.remove();
        }
    };
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ marginBottom: '1rem', padding: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
          Examples Seen (Training Data): {examplesSeen}
        </label>
        <DriftSlider 
          min={0} 
          max={100} 
          value={examplesSeen}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExamplesSeen(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-color)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>Random Guesses (0)</span>
          <span>Max Data (100)</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: '1rem', minHeight: '400px' }}>
        
        {/* Physics Visualizer Engine */}
        <div style={{ flex: 1, border: '1px solid var(--panel-border)', borderRadius: '8px', position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
          
          <div ref={sceneRef} style={{ width: '100%', height: '100%' }} />

          {/* Persistent DOM Overlays anchored accurately to the Canvas */}
          <div style={{ position: 'absolute', bottom: '10px', left: '25%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>Apples 🍎</span>
          </div>

          <div style={{ position: 'absolute', bottom: '10px', left: '75%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>Oranges 🍊</span>
          </div>
        </div>

        {/* Training Accuracy Graph Visualizer */}
        <div style={{ flex: 1, border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '1.5rem', background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
           <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600 }}>Accuracy Learning Curve</h4>
           
           <div style={{ flex: 1, position: 'relative' }}>
             <svg width="100%" height="100%" viewBox="-15 -10 125 125" style={{ overflow: 'visible' }}>
                {/* Axes */}
                <line x1="0" y1="100" x2="100" y2="100" stroke="var(--text-secondary)" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="100" stroke="var(--text-secondary)" strokeWidth="1" />
                
                {/* Labels */}
                <text x="50" y="115" fill="var(--text-secondary)" fontSize="5" textAnchor="middle">Training Examples Configured</text>
                <text x="-12" y="50" fill="var(--text-secondary)" fontSize="5" textAnchor="middle" transform="rotate(-90, -12, 50)">Accuracy</text>
                
                {/* Data Curve Path */}
                <path 
                  d={(() => {
                    let d = "M 0 100 ";
                    for (let x = 0; x <= 100; x += 5) {
                        const acc = 0.5 + 0.48 * (1 - Math.exp(-x / 30));
                        const y = 100 - ((acc - 0.5) / 0.5 * 100);
                        d += `L ${x} ${y} `;
                    }
                    return d;
                  })()} 
                  fill="none" 
                  stroke="var(--accent-color)" 
                  strokeWidth="2" 
                />
                
                {/* Interactive Dynamic Marker */}
                {(() => {
                  const markerAcc = 0.5 + 0.48 * (1 - Math.exp(-examplesSeen / 30));
                  const markerY = 100 - ((markerAcc - 0.5) / 0.5 * 100);
                  
                  return (
                    <g>
                      <line x1={examplesSeen} y1={100} x2={examplesSeen} y2={markerY} stroke="var(--warning-color)" strokeDasharray="2,2" strokeWidth="1" />
                      <line x1={0} y1={markerY} x2={examplesSeen} y2={markerY} stroke="var(--warning-color)" strokeDasharray="2,2" strokeWidth="1" />
                      <circle cx={examplesSeen} cy={markerY} r="3" fill="var(--warning-color)" />
                      <text x={examplesSeen} y={markerY - 5} fill="white" fontSize="5" textAnchor="middle" fontWeight="bold">
                        {Math.round(markerAcc * 100)}%
                      </text>
                    </g>
                  );
                })()}
             </svg>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SortingMachine;
