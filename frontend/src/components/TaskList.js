import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

  const handleDelete = async (id) => {
    if (id) { // Ensure id is not null
      try {
        await axios.delete(`http://localhost:8080/api/deleteTask/${id}`);
        setTasks(tasks.filter((task) => task.id !== id)); // Update local state
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    } else {
      console.error('Task ID is null');
    }
  };

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

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
            <TaskItem key={task.id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
