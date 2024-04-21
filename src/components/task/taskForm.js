// src/components/Task/TaskForm.js
import React, { useState } from 'react';
import api from '../../api';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/tasks', { title, frequency });
            console.log(response.data); // handle successful task creation
        } catch (error) {
            console.error('Task creation error:', error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" />
                <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="Enter task frequency" />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
