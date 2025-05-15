import React, { useState } from "react";
import "./TimerList.css";
import TimerItem from "../timetItem/TimerItem";

const TimerList = ({ timers, onStart, onPause, onReset, onUpdate }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const bulkStart = (categoryTimers) => {
    categoryTimers.forEach((timer) => onStart(timer.id));
  };

  const bulkPause = (categoryTimers) => {
    categoryTimers.forEach((timer) => onPause(timer.id));
  };

  const bulkReset = (categoryTimers) => {
    categoryTimers.forEach((timer) => onReset(timer.id));
  };

  return (
    <div className="timer-list">
      {Object.keys(groupedTimers).length === 0 ? (
        <p>No timers found.</p>
      ) : (
        Object.entries(groupedTimers).map(([category, categoryTimers]) => (
          <div key={category} className="category-section">
            <div
              className="category-header"
              onClick={() => toggleCategory(category)}
            >
              <h3>{category}</h3>
              <span className="arrow">
                {expandedCategories[category] ? "▼" : "▶"}
              </span>
            </div>

            {expandedCategories[category] && (
              <>
                <div className="bulk-actions">
                  <button onClick={() => bulkStart(categoryTimers)}>
                    Start All
                  </button>
                  <button onClick={() => bulkPause(categoryTimers)}>
                    Pause All
                  </button>
                  <button onClick={() => bulkReset(categoryTimers)}>
                    Reset All
                  </button>
                </div>

                <ul className="timer-items">
                  {categoryTimers.map((timer) => (
                    <TimerItem
                      key={timer.id}
                      timer={timer}
                      onStart={onStart}
                      onPause={onPause}
                      onReset={onReset}
                      onUpdate={onUpdate}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TimerList;
