import React, { useState } from 'react';
import AddTimer from './AddTimer';
import './Timer.css';
const Timer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='button-container'>
      <button className="add-timer-button" onClick={() => setShowModal(true)}>
        Add Timer
      </button>

      {showModal && (
        <AddTimer onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Timer;
