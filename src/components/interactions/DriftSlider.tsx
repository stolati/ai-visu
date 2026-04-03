import React, { useEffect, useRef, useState } from 'react';

interface DriftSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max' | 'value' | 'onChange'> {
  min: number;
  max: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DriftSlider: React.FC<DriftSliderProps> = ({ min, max, value, onChange, style, ...props }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Choose random starting position and drift parameters
  const targetRange = max - min;
  const currentValueRef = useRef<number>(min + Math.random() * targetRange);
  const directionRef = useRef<number>(Math.random() > 0.5 ? 1 : -1);
  const speedRef = useRef<number>(targetRange * (0.02 + Math.random() * 0.03)); // 2% to 5% of range per second
  
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);
  const initializedRef = useRef(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (hasInteracted) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1); // Cap dt to avoid massive jumps on tab focus
      lastTime = time;

      if (!initializedRef.current) {
        // First frame: set the parent to the random starting value
        initializedRef.current = true;
        const initialValue = Math.round(currentValueRef.current);
        const event = { target: { value: initialValue.toString() } } as React.ChangeEvent<HTMLInputElement>;
        onChangeRef.current(event);
      } else {
        // Ongoing drift
        let nextValue = currentValueRef.current + directionRef.current * speedRef.current * dt;
        
        // Bounce off bounds
        if (nextValue >= max) {
          nextValue = max;
          directionRef.current = -1; // Reverse direction
        } else if (nextValue <= min) {
          nextValue = min;
          directionRef.current = 1;
        }
        currentValueRef.current = nextValue;
        
        const roundedNext = Math.round(nextValue);
        if (roundedNext !== Math.round(valueRef.current)) {
          const event = { target: { value: roundedNext.toString() } } as React.ChangeEvent<HTMLInputElement>;
          onChangeRef.current(event);
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasInteracted, min, max]);

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => {
        currentValueRef.current = Number(e.target.value);
        onChange(e);
      }}
      onMouseDown={() => setHasInteracted(true)}
      onTouchStart={() => setHasInteracted(true)}
      style={{
        ...style
      }}
      {...props}
    />
  );
};

export default DriftSlider;
