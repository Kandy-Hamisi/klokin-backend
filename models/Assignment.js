const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    siteId: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    clockInTime: {
        type: Date,
        required: true,
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;