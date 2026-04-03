import React from 'react';

const ConceptSkeleton = ({ title, description, visualizationDesc, interactiveDesc }) => {
  return (
    <div className="glass-panel" style={{ marginBottom: '2rem' }}>
      <h2 className="concept-title">{title}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
        {description}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', color: 'var(--accent-hover)', marginBottom: '0.5rem' }}>Visualization</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{visualizationDesc}</p>
          <div className="interactive-placeholder">
            [ Animation Placeholder ]
          </div>
        </div>

        <div>
           <h3 style={{ fontSize: '1rem', color: 'var(--success-color)', marginBottom: '0.5rem' }}>Interactive Sandbox</h3>
           <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{interactiveDesc}</p>
           <div className="interactive-placeholder" style={{ borderColor: 'var(--success-color)' }}>
            [ Interactive Elements Placeholder ]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSkeleton;
