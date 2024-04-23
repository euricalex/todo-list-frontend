// Main.jsx

import React, { useState } from 'react';
import './Main.css';
import { useDispatch } from 'react-redux';
import { createTasks, fetchTasks } from '../../redux/slices/tasks';
import TaskCard from './TaskCard/TaskCard';
import { createSubtask } from '../../redux/slices/tasks'; 

const Main = () => {
  const dispatch = useDispatch();
const [clickOnPlus, setCkickOnPlus] = React.useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskDescription, setNewSubtaskDescription] = useState('');

  React.useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = () => {
    const newTask = {
      title: newTaskTitle,
    };
    dispatch(createTasks(newTask));
    setNewTaskTitle('');
  };

  const handleAddSubtask = () => {
    const newSubtask = {
      title: newSubtaskTitle,
      description: newSubtaskDescription,
    };

    // Тут можна додати перевірку на пусті значення або інші валідації

    // Диспетчер action для створення нової підзадачі за допомогою Redux
    dispatch(createSubtask({ taskId: 'task_id_here', subtask: newSubtask })); // Замінити 'task_id_here' на id відповідної задачі
    setNewSubtaskTitle('');
    setNewSubtaskDescription('');
  };

  const handleOnPlusClick = () => {
    setCkickOnPlus(!clickOnPlus)
  }
  return (
    <div className='add-task-container'>
        <div className='add-plus'>
      <h1>Tasks</h1>
          <span onClick={handleOnPlusClick} >+</span> 
          </div>
          {clickOnPlus && (
  <div className='inputs'>
  <div>
    <input
      type="text"
      value={newTaskTitle}
      onChange={(e) => setNewTaskTitle(e.target.value)}
      placeholder="Enter task title"
    />
    <button onClick={handleCreateTask}>Create Task</button>
  </div>
  <div>
    <input
      type="text"
      value={newSubtaskTitle}
      onChange={(e) => setNewSubtaskTitle(e.target.value)}
      placeholder="Enter subtask title"
    />

    <button onClick={handleAddSubtask}>Add Subtask</button>
  </div>
  </div>
          )}

      <TaskCard />
    </div>
  );
};

export default Main;
