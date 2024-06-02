const { failCode, successCode, errorCode } = require('../../config/reponse');
const Comment = require('../../Models/Comments.model');
const User = require('../../Models/User.model')

const createComment = async (req, res) => {
    const { ma_phong, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan } = req.body;
    const dataUser = await User.findOne({ _id: ma_nguoi_binh_luan });
    if (!dataUser) {
        failCode(res, "", "User is not axist!")
    }
    else {
        try {
            const dataComment = await Comment.create({
                ma_phong: ma_phong,
                ma_nguoi_binh_luan: ma_nguoi_binh_luan,
                ngay_binh_luan: ngay_binh_luan,
                noi_dung: noi_dung,
                sao_binh_luan: sao_binh_luan
            })
            if (dataComment == "") {
                failCode(res, "", "Comment fail!")
            }
            else {
                successCode(res, dataComment, "Comment success !")
            }
        } catch (error) {
            errorCode(res, "Backend error")
        }
    }
}
module.exports = { createComment }