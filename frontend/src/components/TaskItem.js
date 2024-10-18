import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:8080/api/updateTask', updatedTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.name}
            onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          />
          <input
            type="date"
            value={updatedTask.dueDate}
            onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          {/* Make sure to pass task.id here */}
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
