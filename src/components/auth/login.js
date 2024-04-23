import React, { useState } from 'react';
import api from '../../api';
import './common.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', formData);
            localStorage.setItem('accessToken', response.data.token);
            console.log(response.data);
            let userId = response.data.userId
            navigate(`/goal/${userId}`);
        } catch (error) {
            console.error('Login error:', error.response.data.error);
        }
    };

    return (
        <div className ="initial-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className ="basic_form ">
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    </div>
    );
};

export default Login;
