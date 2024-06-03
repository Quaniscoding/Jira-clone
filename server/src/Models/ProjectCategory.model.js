const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectCategorySchema = new Schema({
    projectCategoryName: {
        type: String,
    }
}, {
    versionKey: false // Disable the "__v" field
})
const ProjectCategory = mongoose.model('projectCategory', ProjectCategorySchema);
module.exports = ProjectCategory

