const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const autoIncrementModelID = require('./counterModel');
const UserSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    pass_word: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
    },
    birth_day: {
        type: Date,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
    },
    avatar: {
        data: String,
        contentType: String
    },
}, {
    versionKey: false // Disable the "__v" field
});
UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user', UserSchema);
module.exports = User
