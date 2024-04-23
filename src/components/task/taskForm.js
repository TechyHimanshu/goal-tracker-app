
import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useParams } from 'react-router-dom'; 
import "../table.css"
import "./task.css"

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [frequency, setFrequency] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tasks, setTasks] = useState([]);
    const { goalId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await api.post('/tasks', { title, frequency ,goalId, quantity },{
                headers: {
                  Authorization: accessToken,
                }});
            console.log(response.data); // handle successful task creation
            window.location.reload();
        } catch (error) {
            console.error('Task creation error:', error.response.data.error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await api.get(`/tasks/${goalId}`, {
                    headers: {
                        Authorization: accessToken,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error.response.data.error);
            }
        };

        fetchTasks();
    }, [goalId]);



    return (
        <div>
            <div className ="create-task-container">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" />
                    </div>
                    <div>
                        <label htmlFor='frequency'>Frequency</label>
                        <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="Enter task frequency" />
                    </div>
                    <div>
                        <label htmlFor='quantity'>Quantity</label>
                        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter task quantity" />
                    </div>
                    
                    <button type="submit">Create Task</button>
                </form>
            </div>
           
            <h2>Tasks:</h2>
            {tasks && tasks.length > 0 ? (
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Frequency</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.frequency}</td>
                            <td>{task.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No tasks found for this goal.</p>
        )}
        </div>
    );
};

export default TaskForm;
