
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import GoalForm from './components/goal/goalForm';
import TaskForm from './components/task/taskForm';

const App = () => {
    return (
            <Router>
                    <Routes>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/goal/create" component={GoalForm} />
                        <Route exact path="/task/create" component={TaskForm} />
                    </Routes>
            </Router>
         );
};

export default App;
