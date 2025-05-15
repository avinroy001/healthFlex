import React, { useState, useEffect } from "react";
import AddTimer from "./AddTimer";
import TimerList from "../timerList/TimerList";
import { FaClock } from "react-icons/fa";
import "./Timer.css";

const STORAGE_KEY = "timers-app-data";

const Timer = () => {
  const [timers, setTimers] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    console.log("Loaded from localStorage:", parsed);
    setTimers(parsed);
  }, []);

  useEffect(() => {
    if (timers !== null) {
      console.log("Saving to localStorage:", timers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
    }
  }, [timers]);

  if (timers === null) {
    return <div>Loading...</div>;
  }

  const handleStart = (id) =>
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Running" } : t))
    );

  const handlePause = (id) =>
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Paused" } : t))
    );

  const handleReset = (id) =>
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, remaining: t.duration, status: "Paused" } : t
      )
    );

  const handleSave = (newTimer) => {
    setTimers((prev) => [...prev, newTimer]);
  };

  const handleUpdate = (updatedTimer) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === updatedTimer.id ? updatedTimer : t))
    );
  };

  return (
    <div className="timer-page">
      <header className="page-header">
        <h1>
          <FaClock /> Timer Dashboard
        </h1>
        <button className="add-timer-button" onClick={() => setShowModal(true)}>
          <FaClock /> + Add New Timer
        </button>
      </header>

      {showModal && (
        <AddTimer onClose={() => setShowModal(false)} onSave={handleSave} />
      )}

      <main className="timer-content">
        <h2>Your Timers</h2>
        <TimerList
          timers={timers}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onUpdate={handleUpdate}
        />
      </main>
    </div>
  );
};

export default Timer;
