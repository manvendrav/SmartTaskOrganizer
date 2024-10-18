import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tasks from the backend API
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getTasks');
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <div>No tasks available</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.name}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
