import React, { useState, useEffect } from 'react';
import api from '../../api';
import {useNavigate} from "react-router-dom";
import "../table.css"
import "./goal.css"

const GoalForm = () => {
    const [title, setTitle] = useState('');
    const [goals, setGoals] = useState([]);
    const [deadline, setDeadline] = useState('');

    const navigate = useNavigate();

    const fetchGoals = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await api.get('/goals', {
                headers: {
                    Authorization: accessToken,
                }
            });
            setGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error.response.data.error);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []); // Fetch goals once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await api.post('/goals', { title, deadline },{
                headers: {
                  Authorization: accessToken,
                }});
            console.log(response.data); // handle successful goal creation
            setGoals([...goals, { _id: response.data._id, title: response.data.title }]);
            window.location.reload();
        } catch (error) {
            console.error('Goal creation error:', error.response.data.error);
        }
    };

    const handleGoalClick = async (goalId) => {
        // Navigate to the task page with the selected goal's ID as URL parameter
        navigate(`/tasks/${goalId}`);
    };

    return (
            <div>
                <div className="create-goal-container">
                    <h2>Create Goal</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                        <label htmlFor="title">Title:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter goal title" />
                        </div>
                        <div>
                        <label htmlFor="deadline">Deadline:</label>
                            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Select deadline" />
                        </div>
                        <button type="submit">Create Goal</button>
                    </form>
                </div>
                
                <h2>Goals Lists:</h2>
                <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {goals.map((goal) => (
                        <tr key={goal.id} onClick={() => handleGoalClick(goal._id)}>
                            <td style={{ cursor: 'pointer' }}><a href="">{goal.title}</a></td>
                            <td>{goal.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
};

export default GoalForm;
