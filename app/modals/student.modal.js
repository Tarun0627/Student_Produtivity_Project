const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        ref :'task',
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('student', studentSchema);