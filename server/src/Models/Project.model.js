const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');

const TaskDetailSchema = new Schema({
    lstTaskDetail: {
        type: Array,
        default: []
    },
    statusId: {
        type: String,
    },
    statusName: {
        type: String,
    },
    alias: {
        type: String,
    }
}, { _id: false });

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
        required: true,
    },
    deleted: {
        type: String
    },
    listTask: [TaskDetailSchema],
    projectCategory: {
        type: Schema.Types.ObjectId,
        ref: 'projectCategory',
    },
    creator:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    versionKey: false
});

ProjectSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});

ProjectSchema.plugin(passportLocalMongoose);

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
