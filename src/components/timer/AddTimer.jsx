import React, { useState } from 'react';
import "./AddTimer.css";

const AddTimer = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, duration, category } = formData;

    if (!name || !duration || !category) {
      alert("Please fill all fields");
      return;
    }

    const id = Date.now(); 

    const newTimer = {
      id,
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
    };

    onSave(newTimer); 
    onClose();
  };

  return (
    <div className='container'>
      <div className='modal'>
        <h2>Add Timer</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Duration (in seconds):</label><br />
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div>
            <label>Category:</label><br />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="work">Work</option>
              <option value="break">Break</option>
              <option value="study">Study</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimer;