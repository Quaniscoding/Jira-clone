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
// Define the schema for TaskDetail
const TaskDetailSchema = new Schema({
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
    versionKey: false,
});

// Define the schema for Project
const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
    },
    deleted: {
        type: String,
    },
    creator: {
        _id: String,
        username: String,
    },
    members: [{
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        name: String,
        avatar: String,
        email: String,
        phoneNumber: String,
    }],
    listTask: [{
        listTaskDetail: [TaskDetailSchema],
        statusId: String,
        statusName: String,
        alias: String,
    }],
}, {
    versionKey: false,
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
