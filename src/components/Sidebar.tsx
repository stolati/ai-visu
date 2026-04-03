import React from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Cpu, Database, Settings, Layers, Menu, Server } from 'lucide-react';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Brain color="var(--accent-color)" size={32} />
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>AI<span style={{ color: 'var(--accent-color)' }}>Visu</span></h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink to="/ml" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Layers size={18} />
          <span>Machine Learning</span>
        </NavLink>
        <NavLink to="/llm" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Cpu size={18} />
          <span>LLM Basics</span>
        </NavLink>
        <NavLink to="/data" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Database size={18} />
          <span>Data & Training</span>
        </NavLink>
        <NavLink to="/output" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Server size={18} />
          <span>Output Generation</span>
        </NavLink>
        <NavLink to="/context" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Menu size={18} />
          <span>Context & Prompting</span>
        </NavLink>
        <NavLink to="/advanced" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Settings size={18} />
          <span>Advanced Topics</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
