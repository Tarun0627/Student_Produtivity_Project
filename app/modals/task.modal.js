const mongoose = require('mongoose');
const { TASK_STATUS_ENUM } = require('../utils/constants/constants');
const taskSchema = mongoose.Schema({  
    
     name: {
        type: String,
        required: true,
        unique: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: 'NEW',
        enum: TASK_STATUS_ENUM
    },
    sutudent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required:true,
    },

    date: {
        type: Date,
        default: Date.now(),
    }

}, { timestamps: true })

module.exports = mongoose.model('task', taskSchema);