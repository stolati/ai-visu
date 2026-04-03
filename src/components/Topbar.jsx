import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';

const Topbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="topbar">
      <div>
        {/* Placeholder for breadcrumbs or mobile menu trigger */}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div 
          className="glass-panel" 
          style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'text', width: '250px' }}
          onClick={() => setSearchOpen(true)}
        >
          <Search size={16} color="var(--text-secondary)" />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Search topics...</span>
        </div>
      </div>

      {searchOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10vh'
        }} onClick={() => setSearchOpen(false)}>
          <div className="glass-panel" style={{ width: '500px', maxWidth: '90%', background: '#1e293b' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <Search size={20} color="var(--accent-color)" />
              <input 
                autoFocus
                placeholder="Search where topic is mentioned..." 
                style={{ 
                  background: 'transparent', border: 'none', color: 'white', 
                  fontSize: '1.2rem', width: '100%', outline: 'none' 
                }} 
              />
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <p>Type to search concepts like "Tokens", "Parameters", "RAG"...</p>
              {/* Dummy results */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ padding: '0.5rem', cursor: 'pointer', borderRadius: '4px' }} className="search-result">
                  <span style={{ color: 'var(--accent-hover)' }}>Tokens</span> in <i>LLM Basics</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
