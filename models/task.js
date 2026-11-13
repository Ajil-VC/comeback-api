
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Task title is required.'],
        trim: true,
        unique: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },

}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;