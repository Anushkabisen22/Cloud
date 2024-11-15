import React, { useState } from 'react';
import axios from 'axios';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);

    const handleCalculate = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const response = await axios.post(
            'http://localhost:5000/api/bmi/calc', 
            { height, weight },                  
            { headers: { Authorization: `Bearer ${token}` } } 
        );

        console.log('Response:', response);
        setBmi(response.data.bmi);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};


    return (
        <div>
        <form onSubmit={handleCalculate}>
            <input type="number" placeholder="Height in cm" value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="number" placeholder="Weight in kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <button type="submit">Calculate BMI</button>
            
        </form>
        { bmi && <p>Your BMI is: {bmi}</p> }
        </div>
    );
};

export default BMICalculator;
