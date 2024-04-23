
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import GoalForm from './components/goal/goalForm';
import TaskForm from './components/task/taskForm';

const App = () => {
    return (
            <Router>
                    <Routes>
                        <Route exact path="/login" element={<Login></Login>} />
                        <Route exact path="/signup" element={<Signup></Signup>} />
                        <Route exact path="/goal/:userId" element={<GoalForm></GoalForm>} />
                        <Route exact path="/tasks/:goalId" element={<TaskForm></TaskForm>} />
                        <Route path="/" element={<Navigate to="/signup" />} />
                    </Routes>
            </Router>
         );
};

export default App;
