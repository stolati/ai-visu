import React, { useState } from 'react';

const Tooltip = ({ word, text }) => {
  const [show, setShow] = useState(false);

  return (
    <span 
      className="tooltip-container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {word}
      {show && (
        <div className="glass-panel" style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: '5px', width: '250px', zIndex: 10,
          background: '#0f172a', padding: '1rem', fontSize: '0.85rem', color: 'white',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          {text}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
