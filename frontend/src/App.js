import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
