import React, { useState } from 'react';
import './TaskCard.css';
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../../../redux/slices/tasks';

const TaskCard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const [editedTask, setEditedTask] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    const handleDeleteTask = (_id) => {
        dispatch(deleteTask(_id));
    };

    const handleEditClick = (task) => {
        setEditedTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setEditedTask(null);
        setDialogOpen(false);
    };

    const handleSaveChanges = () => {
        dispatch(updateTask({
            taskId: editedTask._id,
            title: editedTitle
        }));
        handleCloseDialog();
    };

    return (
        <div className='task-card-container'>
            {tasks && tasks.map((task) => (
                <div className='task-card' key={task._id}>
                    <div className='delete-container'>
                        <h3>{task.title}</h3>
                        <div className='delete-contaainer-2'>
                            <MdEdit onClick={() => handleEditClick(task)} className='edit-icon'></MdEdit>
                            <MdDelete onClick={() => handleDeleteTask(task._id)} className='delete-icon'></MdDelete>
                        </div>
                    </div>
                    {task.subtasks && task.subtasks.map((subtask) => (
                        <div className='subtask' key={subtask._id}>
                            <h4>{subtask.title}</h4>
                            <p>{subtask.description}</p>
                        </div>
                    ))}
                </div>
            ))}
            {isDialogOpen && (
                <div className="dialog">
                    <h2>Редактировать задачу</h2>
                    <form>
                        <label>Название:</label>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                        <label>Описание:</label>
                        <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea>
                        <button onClick={handleSaveChanges}>Сохранить изменения</button>
                        <button onClick={handleCloseDialog}>Отмена</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
