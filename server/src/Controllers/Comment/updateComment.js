const { failCode, successCode } = require('../../config/reponse');
const Comment = require('../../Models/Comments.model');

const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const { ma_phong, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan } = req.body;
        const update = await Comment.findByIdAndUpdate(id, { ma_phong, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan }, options)
        if (!update) {
            failCode(res, "", "Comment does not exist !");
        }
        else {
            successCode(res, update, "Update comments success !")
        }
    } catch (error) {
        console.log(error);
        failCode(res, "Backend error !")
    }
}
module.exports = { updateComment }

