import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Hash, Activity } from 'lucide-react';

// Simplified tokenizer logic for demonstration
const COMMON_SUBWORDS = ["Un", "believ", "able", "ing", "ed", "ly", "re", "pre", "ment", "tion", "al", "ic"];

interface Token {
  id: number;
  text: string;
  type: 'word' | 'subword' | 'char' | 'punct';
  hash: number; // Simulated Token ID
}

interface TokenizerProps {
  initialText?: string;
  granularity?: 'Word' | 'Subword' | 'Character';
}

const Tokenizer = ({ initialText = "Unbelievable processing power", granularity: propGranularity }: TokenizerProps) => {
  const [text, setText] = useState(initialText);
  const [localGranularity, setLocalGranularity] = useState<'Word' | 'Subword' | 'Character'>('Subword');
  const [isScanning, setIsScanning] = useState(false);
  const [tokenizedOutput, setTokenizedOutput] = useState<Token[]>([]);

  const granularity = propGranularity || localGranularity;

  // Simple hashing function to generate "Token IDs"
  const generateHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 50000) + 100;
  };

  const performTokenization = (input: string, strategy: string) => {
    let result: Token[] = [];
    let count = 0;
    
    if (strategy === 'Character') {
      result = input.split("").map((char, i) => ({
        id: count++,
        text: char,
        type: 'char',
        hash: generateHash(char)
      }));
    } else if (strategy === 'Word') {
      result = input.split(/(\s+)/).filter(s => s.length > 0).map((word, i) => ({
        id: count++,
        text: word,
        type: 'word',
        hash: generateHash(word)
      }));
    } else {
      // Improved Subword simulation (Recursive-ish splitting)
      const segments = input.split(/(\s+)/).filter(s => s.length > 0);
      
      segments.forEach(seg => {
        if (/\s+/.test(seg)) {
          result.push({ id: count++, text: seg, type: 'punct', hash: 32 });
          return;
        }

        // Try to break the word down
        let remaining = seg;
        let wordResult: Token[] = [];
        
        while (remaining.length > 0) {
          let found = false;
          // Sort subwords by length (greedy match)
          const sortedSubs = [...COMMON_SUBWORDS].sort((a, b) => b.length - a.length);
          
          for (const sub of sortedSubs) {
            const lowerRem = remaining.toLowerCase();
            const lowerSub = sub.toLowerCase();
            
            if (lowerRem.startsWith(lowerSub)) {
              wordResult.push({ id: count++, text: remaining.substring(0, sub.length), type: 'subword', hash: generateHash(sub) });
              remaining = remaining.substring(sub.length);
              found = true;
              break;
            }
          }
          
          if (!found) {
            // Find next match or take one char
            wordResult.push({ id: count++, text: remaining[0], type: 'word', hash: generateHash(remaining[0]) });
            remaining = remaining.substring(1);
          }
        }
        
        // Merge neighboring 'word' tokens if they are single chars to look cleaner
        let merged: Token[] = [];
        wordResult.forEach(t => {
          if (merged.length > 0 && merged[merged.length-1].type === 'word' && t.type === 'word') {
             merged[merged.length-1].text += t.text;
             merged[merged.length-1].hash = generateHash(merged[merged.length-1].text);
          } else {
             merged.push(t);
          }
        });
        
        result.push(...merged);
      });
    }
    return result;
  };

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Immediate update for typing flow, but handle scanning separately
  useEffect(() => {
    setTokenizedOutput(performTokenization(text, granularity));
  }, [text, granularity]);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Configuration Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scissors size={24} style={{ color: 'var(--primary)' }} />
          Laser Tokenizer
        </h3>
        {!propGranularity && (
        <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px' }}>
          {(['Word', 'Subword', 'Character'] as const).map((g) => (
            <button
               key={g}
               onClick={() => setLocalGranularity(g)}
               style={{
                 padding: '6px 12px',
                 borderRadius: '6px',
                 border: 'none',
                 fontSize: '0.8rem',
                 fontWeight: 'bold',
                 cursor: 'pointer',
                 backgroundColor: granularity === g ? 'var(--primary)' : 'transparent',
                 color: granularity === g ? '#fff' : 'var(--text-secondary)',
                 transition: 'all 0.2s'
               }}
            >
              {g}
            </button>
          ))}
        </div>
        )}
      </div>

      {/* Text Entry and Scanning Engine */}
      <div style={{ position: 'relative', width: '100%' }}>
         <textarea 
           value={text}
           onChange={(e) => {
             setText(e.target.value);
             triggerScan();
           }}
           placeholder="Type a sentence to tokenize..."
           style={{
             width: '100%', height: '100px',
             background: 'rgba(0,0,0,0.2)',
             border: '1px solid rgba(255,255,255,0.1)',
             borderRadius: '12px',
             padding: '16px',
             color: '#fff',
             fontSize: '1.1rem',
             lineHeight: 1.5,
             outline: 'none',
             resize: 'none',
             fontFamily: 'inherit',
             transition: 'border-color 0.3s'
           }}
           onFocus={(e) => e.target.parentElement!.style.borderColor = 'var(--primary)'}
         />
         
         {/* The Scanning Laser */}
         <AnimatePresence>
           {isScanning && (
             <motion.div 
               initial={{ left: '0%' }}
               animate={{ left: '100%' }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8, ease: "linear" }}
               style={{
                 position: 'absolute', top: 0, bottom: 0,
                 width: '2px', backgroundColor: 'var(--primary)',
                 boxShadow: '0 0 15px var(--primary), 0 0 5px #fff',
                 zIndex: 10, pointerEvents: 'none'
               }}
             />
           )}
         </AnimatePresence>
      </div>

      {/* The Lego Bricks Output */}
      <div style={{ minHeight: '120px', padding: '16px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start' }}>
         <AnimatePresence mode="popLayout">
           {tokenizedOutput.map((token, i) => (
             <motion.div
               key={`${token.hash}-${i}`}
               initial={{ scale: 0.8, opacity: 0, y: 10 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               transition={{ duration: 0.2, delay: i * 0.01 }}
               style={{
                 padding: '4px 8px',
                 borderRadius: '6px',
                 backgroundColor: token.type === 'subword' ? '#8b5cf6' : token.type === 'char' ? '#ec4899' : token.type === 'punct' ? 'rgba(255,255,255,0.1)' : '#f97316',
                 border: '1px solid rgba(255,255,255,0.1)',
                 boxShadow: '0 3px 0 rgba(0,0,0,0.3)', // Lego height effect
                 color: 'white',
                 fontSize: '0.9rem',
                 position: 'relative',
                 cursor: 'help',
                 userSelect: 'none',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 minWidth: token.text === ' ' ? '10px' : 'auto'
               }}
               whileHover={{ y: -2, scale: 1.05 }}
               onClick={() => setActiveTooltip(activeTooltip === i ? null : i)}
             >
                {/* Visual Lego Studs (Optional flourish) */}
                <div style={{ position: 'absolute', top: '-2px', left: '25%', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                <div style={{ position: 'absolute', top: '-2px', right: '25%', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {token.text === " " ? <div style={{ width: '4px' }} /> : token.text}
                </span>

                {/* Token ID Tooltip */}
                <AnimatePresence>
                  {(activeTooltip === i) && (
                    <motion.div 
                      className="token-tooltip"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      style={{
                        position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)',
                        backgroundColor: '#1e293b', border: '1px solid var(--primary)',
                        padding: '4px 10px', borderRadius: '6px', pointerEvents: 'none',
                        display: 'flex', alignItems: 'center', gap: '6px', zIndex: 100,
                        whiteSpace: 'nowrap', boxShadow: '0 10px 15px rgba(0,0,0,0.5)'
                      }}
                    >
                      <Hash size={12} style={{ color: 'var(--primary)' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>ID: {token.hash}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>

      {/* Legend and Info */}
      <div style={{ display: 'flex', gap: '24px', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
             <Activity size={14} style={{ color: 'var(--primary)' }} />
             Total: {tokenizedOutput.length} tokens
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#8b5cf6' }} /> Common Prefix/Suffix
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#f97316' }} /> Word Unit
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#ec4899' }} /> Single Character
          </div>
      </div>
    </div>
  );
};

export default Tokenizer;
