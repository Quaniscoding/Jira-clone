const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StatusSchema = new Schema({
    statusName: {
        type: String,
        required: true,
    },
    deleted: {
        type: String,
    },
    alias: {
        type: String
    }
}, {
    versionKey: false
})

const Status = mongoose.model('status', StatusSchema);
module.exports = Status

