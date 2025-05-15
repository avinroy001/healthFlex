import React from 'react';
import './HistoryScreen.css';

const HistoryScreen = () => {
  const history = JSON.parse(localStorage.getItem('timers-history')) || [];

  return (
    <div className="history-container">
      <h1>Timer History</h1>
      {history.length === 0 ? (
        <p>No completed timers yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} className="history-item">
              <strong>{item.name}</strong> — {item.completedAt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryScreen;