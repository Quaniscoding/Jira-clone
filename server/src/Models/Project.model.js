const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');

const ProjectSchema = new Schema({
    projectName: {
        type: String,
    },
    description:{
        type:String
    },
    categoryId:{
        type:String
    },
    alias:{
        type:String
    }
}, {
    versionKey: false // Disable the "__v" field
})
ProjectSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
ProjectSchema.plugin(passportLocalMongoose);
const Project = mongoose.model('project', ProjectSchema);
module.exports = Project

