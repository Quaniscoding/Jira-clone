const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskDetailSchema = new Schema({
    // Define task detail fields here
});

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
        type: String
    },
    creator: {
        _id: String,
        username: String
    },
    members: [{
        _id: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
        name: String,
        avatar: String,
        email: String,
        phoneNumber: String
    }],
    listTask: [{
        listTaskDetail: [TaskDetailSchema],
        statusId: String,
        statusName: String,
        alias: String
    }]
}, {
    versionKey: false
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
