import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MachineLearning from './pages/MachineLearning';
import LLM from './pages/LLM';
import DataAndTraining from './pages/DataAndTraining';
import OutputGeneration from './pages/OutputGeneration';
import ContextAndPrompting from './pages/ContextAndPrompting';
import AdvancedTopics from './pages/AdvancedTopics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/ml" replace />} />
          <Route path="ml" element={<MachineLearning />} />
          <Route path="llm" element={<LLM />} />
          <Route path="data" element={<DataAndTraining />} />
          <Route path="output" element={<OutputGeneration />} />
          <Route path="context" element={<ContextAndPrompting />} />
          <Route path="advanced" element={<AdvancedTopics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
