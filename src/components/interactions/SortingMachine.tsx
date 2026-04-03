import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';

interface Item {
  id: number;
  type: 'apple' | 'orange';
  correctBucket: 'left' | 'right';
  targetBucket: 'left' | 'right';
}

const SortingMachine: React.FC = () => {
  const [examplesSeen, setExamplesSeen] = useState<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [correctSorts, setCorrectSorts] = useState(0);
  const [missCount, setMissCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        // Keep max 6 items on screen
        if (prev.length > 5) return prev.slice(1);
        
        const type = Math.random() > 0.5 ? 'apple' : 'orange';
        const correctBucket = type === 'apple' ? 'left' : 'right';
        
        // Probability of correct choice maps from 50% (at examples=0) to 100% (at examples=100)
        const accuracy = 0.5 + (examplesSeen / 100) * 0.5;
        const isCorrect = Math.random() < accuracy;
        const targetBucket = isCorrect ? correctBucket : (correctBucket === 'left' ? 'right' : 'left');

        return [...prev, { id: Date.now(), type, correctBucket, targetBucket }];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [examplesSeen]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ marginBottom: '1rem', padding: '0.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>
          Examples Seen (Training Data): {examplesSeen}
        </label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={examplesSeen}
          onChange={(e) => setExamplesSeen(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-color)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <span>Random Guesses (0)</span>
          <span>100% Accurate (100)</span>
        </div>
      </div>

      <div style={{ flex: 1, border: '1px solid var(--panel-border)', borderRadius: '8px', position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
        
        {/* Machine UI */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '10px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 - (examplesSeen/100) * 1.5, ease: "linear" }}>
              <Settings size={40} color="var(--accent-color)" />
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2 - (examplesSeen/100) * 1.5, ease: "linear" }}>
              <Settings size={40} color="var(--accent-color)" />
            </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '10px', left: '20%', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '40px', border: '2px solid #ef4444', borderRadius: '4px', borderTop: 'none' }}></div>
          <span style={{ fontSize: '0.8rem', color: 'white' }}>Apples</span>
        </div>

        <div style={{ position: 'absolute', bottom: '10px', right: '20%', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '40px', border: '2px solid #f97316', borderRadius: '4px', borderTop: 'none' }}></div>
          <span style={{ fontSize: '0.8rem', color: 'white' }}>Oranges</span>
        </div>

        {/* Falling Items */}
        <AnimatePresence>
          {items.map(item => (
            <motion.div
              key={item.id}
              initial={{ top: '-10%', left: '50%', x: '-50%', opacity: 1, scale: 0 }}
              animate={{ 
                top: ['10%', '40%', '85%'],
                left: ['50%', '50%', item.targetBucket === 'left' ? '25%' : '75%'],
                scale: [0.5, 1, 1],
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 1.4, ease: 'easeIn' }}
              onAnimationComplete={() => {
                  if (item.targetBucket === item.correctBucket) {
                    setCorrectSorts(c => c + 1);
                  } else {
                    setMissCount(c => c + 1);
                  }
              }}
              style={{
                position: 'absolute',
                width: '30px', height: '30px',
                borderRadius: '50%',
                background: item.type === 'apple' ? '#ef4444' : '#f97316',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', padding: '0 0.5rem' }}>
          <span style={{ color: 'var(--success-color)' }}>Accurate Sorts: {correctSorts}</span>
          <span style={{ color: 'var(--danger-color)' }}>Errors: {missCount}</span>
      </div>
    </div>
  );
};

export default SortingMachine;
