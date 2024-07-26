const mongoose = require('mongoose');

const productivitySchema = new mongoose.Schema({
     student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'student',
          required: true,
     },
     task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'task',
          required: true,
     },
     timeRanges :{
          type:String,
          ref: 'task',
          required:false,
     }
},
);

module.exports = mongoose.model('Productivities', productivitySchema);


