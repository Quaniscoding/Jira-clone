const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StatusSchema = new Schema({
    statusName: {
        type: String,
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

const Status = mongoose.model('status', StatusSchema);
module.exports = Status

