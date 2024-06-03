const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
    priority: {
        type: String,
    },
    description: {
        type: String
    },
    deleted: {
        type: String,
    },
    alias: {
        type: String
    }
}, {
    versionKey: false // Disable the "__v" field
})
const Priority = mongoose.model('priority', PrioritySchema);
module.exports = Priority

