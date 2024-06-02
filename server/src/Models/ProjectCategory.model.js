const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');

const ProjectCategorySchema = new Schema({
    projectCategoryName: {
        type: String,
    }
}, {
    versionKey: false // Disable the "__v" field
})
ProjectCategorySchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
ProjectCategorySchema.plugin(passportLocalMongoose);
const ProjectCategory = mongoose.model('projectCategory', ProjectCategorySchema);
module.exports = ProjectCategory

