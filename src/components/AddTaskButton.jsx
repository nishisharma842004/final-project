import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTaskButton = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    name: '',
    details: '',
    dueDate: null,
  });

  const handleSubmit = () => {
    if (!taskData.name.trim()) {
      alert("Task name is required!");
      return;
    }

    // ✅ Ensure dueDate is saved properly
    onAdd({
      name: taskData.name,
      details: taskData.details,
      dueDate: taskData.dueDate ? taskData.dueDate.toISOString() : null,
    });

    setTaskData({ name: '', details: '', dueDate: null });
    setShowForm(false);
  };

  return (
    <div className="add-task-wrapper">
      {!showForm ? (
        <div className="add-task-button" onClick={() => setShowForm(true)}>
          + Add Task
        </div>
      ) : (
        <div className="add-task-form" style={{ marginTop: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "10px" }}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <textarea
            placeholder="Task Details"
            value={taskData.details}
            onChange={(e) => setTaskData({ ...taskData, details: e.target.value })}
            style={{
              width: '100%',
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <DatePicker
            selected={taskData.dueDate}
            onChange={(date) => setTaskData({ ...taskData, dueDate: date })}
            placeholderText="Select Due Date"
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="date-picker-input"
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={{ padding: '8px 12px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px' }}>
              Add
            </button>
            <button onClick={() => setShowForm(false)} style={{ padding: '8px 12px', background: '#ccc', border: 'none', borderRadius: '5px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskButton;
