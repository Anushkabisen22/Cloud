import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BMICalculator from './components/BMICalculator';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/bmi" element={<BMICalculator />} />
            </Routes>
        </Router>
    );
};

export default App;
