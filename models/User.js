const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    idNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    uniqueKey: {
        type: String,
        unique: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;