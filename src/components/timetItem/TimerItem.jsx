import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";
import "./TimerItem.css";

const TimerItem = ({ timer, onStart, onPause, onReset, onUpdate }) => {
  const [remaining, setRemaining] = useState(timer.remaining);
  const [status, setStatus] = useState(timer.status);
  const [intervalId, setIntervalId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setRemaining(timer.remaining);
    setStatus(timer.status);
  }, [timer]);

  useEffect(() => {
    let id;

    if (status === "Running" && remaining > 0) {
      id = setInterval(() => {
        setRemaining((prev) => {
          const newRemaining = prev - 1;
          if (newRemaining <= 0) {
            clearInterval(id);
            setStatus("Completed");
          }
          return newRemaining;
        });
      }, 1000);
    }

    setIntervalId(id);

    return () => {
      if (id) clearInterval(id);
    };
  }, [status, remaining]);

  useEffect(() => {
    onUpdate({
      ...timer,
      remaining,
      status,
    });

    if (status === "Completed" && remaining <= 0) {
      setShowModal(true);
    }
  }, [remaining, status]);

  const handleStart = () => {
    setStatus("Running");
    onStart(timer.id);
  };

  const handlePause = () => {
    setStatus("Paused");
    onPause(timer.id);
    if (intervalId) clearInterval(intervalId);
  };

  const handleReset = () => {
    setRemaining(timer.duration);
    setStatus("Paused");
    onReset(timer.id);
    if (intervalId) clearInterval(intervalId);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins}:${String(seconds % 60).padStart(2, "0")}`;
  };

  const progress = timer.duration > 0 ? (1 - remaining / timer.duration) : 0;


  return (
    <li className="timer-item">
      <div className="timer-info">
        <span className="timer-name">{timer.name}</span>
        <span className="timer-time">{formatTime(remaining)}</span>
        <span className={`timer-status status-${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>

      <div className="timer-controls">
        <button onClick={handleStart} disabled={status === "Running"}>
          <FaPlay />
        </button>
        <button onClick={handlePause} disabled={status !== "Running"}>
          <FaPause />
        </button>
        <button onClick={handleReset}>
          <FaUndo />
        </button>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Congratulations!</h2>
            <p>
              Your timer <strong>"{timer.name}"</strong> is complete.
            </p>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TimerItem;
