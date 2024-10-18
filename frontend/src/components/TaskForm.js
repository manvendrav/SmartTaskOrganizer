import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      taskName: taskName,
      description,
      dueDate,
    };

    try {
      await axios.post('http://localhost:8080/api/createTask', newTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Reset the form and show a success message
      setTaskName('');
      setDescription('');
      setDueDate('');
      setSuccess('Task created successfully!');
      setError('');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task.');
      setSuccess('');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Task
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Task Name"
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Box>
        <Box textAlign="center">
          <Button variant="contained" color="primary" type="submit">
            Create Task
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TaskForm;
