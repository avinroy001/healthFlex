import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/timer/Timer';
import HistoryScreen from './components/history/HistoryScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/history" element={<HistoryScreen />} />
      </Routes>
    </Router>
  );
}

export default App;