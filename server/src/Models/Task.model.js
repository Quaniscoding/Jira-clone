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
    listUserAssign: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    taskName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    statusId: {
        type: Schema.Types.ObjectId,
        ref: 'Status',
        required: true,
    },
    originalEstimate: {
        type: Number,
        default: 0,
    },
    timeTrackingSpent: {
        type: Number,
        default: 0,
    },
    timeTrackingRemaining: {
        type: Number,
        default: 0,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    typeId: {
        type: Schema.Types.ObjectId,
        ref: 'TaskType',
        required: true,
    },
    priorityId: {
        type: Schema.Types.ObjectId,
        ref: 'Priority',
        required: true,
    },
    listComment: [CommentSchema]
}, {
    versionKey: false // Disable the "__v" field
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
