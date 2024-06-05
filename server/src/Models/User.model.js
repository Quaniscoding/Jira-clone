const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
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
        require: true,
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
        type: String,
    },
}, {
    versionKey: false // Disable the "__v" field
});
const User = mongoose.model('user', UserSchema);
module.exports = User
