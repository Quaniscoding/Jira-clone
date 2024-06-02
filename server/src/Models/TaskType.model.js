const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');

const TaskTypeModelSchema = new Schema({
    taskType: {
        type: String,
    }
}, {
    versionKey: false // Disable the "__v" field
})
TaskTypeModelSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
TaskTypeModelSchema.plugin(passportLocalMongoose);
const TaskType = mongoose.model('taskType', TaskTypeModelSchema);
module.exports = TaskType

