const Comment = require('../../Models/Comments.model');
const { successCode, failCode } = require('../../config/reponse');

const deleteComment = async (req, res) => {
    const id = req.params.id;
    try {
        const dataComment = await Comment.findByIdAndDelete(id);
        if (!dataComment) {
            failCode(res, "", "Comment is not exist !")
        }
        else {
            successCode(res, "", "Delete comment success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { deleteComment }