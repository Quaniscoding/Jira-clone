const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentComment: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    alias: {
        type: String
    }
});

const TaskSchema = new Schema({
    listUserAssign: [{ _id: String, username: String }],
    taskName: { type: String, required: true },
    description: { type: String },
    statusId: { _id: String, statusName: String },
    originalEstimate: { type: Number, required: true },
    timeTrackingSpent: { type: Number },
    timeTrackingRemaining: { type: Number },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: 'User' },
    typeId: { _id: String, taskType: String },
    priorityId: { _id: String, priority: String },
    listComment: [CommentSchema]
}, {
    versionKey: false // Disable the "__v" field
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
