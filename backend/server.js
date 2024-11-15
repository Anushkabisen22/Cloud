const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bmiRoutes = require('./routes/bmiRoutes');


dotenv.config();
const app = express();
var cors = require('cors')
app.use(cors()) 
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Cloud", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error(error));

app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
