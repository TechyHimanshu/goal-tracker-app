import React, { useState } from 'react';
import api from '../../api';

const GoalForm = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/goals', { title });
            console.log(response.data); // handle successful goal creation
        } catch (error) {
            console.error('Goal creation error:', error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Create Goal</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter goal title" />
                <button type="submit">Create Goal</button>
            </form>
        </div>
    );
};

export default GoalForm;
