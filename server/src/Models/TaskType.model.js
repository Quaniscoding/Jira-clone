const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskTypeModelSchema = new Schema({
    taskType: {
        type: String,
    }
}, {
    versionKey: false // Disable the "__v" field
})
const TaskType = mongoose.model('taskType', TaskTypeModelSchema);
module.exports = TaskType

