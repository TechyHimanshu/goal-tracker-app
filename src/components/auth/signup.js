import React, { useState } from 'react';
import api from '../../api';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/signup', formData);
            console.log(response.data); // handle successful signup
        } catch (error) {
            console.error('Signup error:', error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
