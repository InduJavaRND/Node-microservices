const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userID: {
       type: mongoose.SchemaTypes.ObjectId,
       require: true
     },
     todoID: {
       type: mongoose.SchemaTypes.ObjectId,
       require: true
     },
     initialDate: {
        type: Date,
        require: true
     },
     taskTitle: {
        type: String,
        require: true
     }
})

const task = mongoose.model("task", taskSchema);

module.exports = task;