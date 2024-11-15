const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bmiCount: { type: Number, default: 0 } // Tracks BMI calculations
});

module.exports = mongoose.model('User', UserSchema);
