const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    ma_phong: {
        type: String
    },
    ma_cong_viec: {
        type: String,
    },
    ma_nguoi_binh_luan: {
        type: String
    },
    ngay_binh_luan: {
        type: String,
    },
    noi_dung: {
        type: String
    },
    sao_binh_luan: {
        type: Number
    }
}, {
    versionKey: false // Disable the "__v" field
})
const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment

