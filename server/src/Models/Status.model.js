const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');

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
StatusSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
StatusSchema.plugin(passportLocalMongoose);
const Status = mongoose.model('status', StatusSchema);
module.exports = Status

