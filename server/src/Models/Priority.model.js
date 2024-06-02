const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');

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
PrioritySchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
PrioritySchema.plugin(passportLocalMongoose);
const Priority = mongoose.model('priority', PrioritySchema);
module.exports = Priority

