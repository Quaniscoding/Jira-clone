const Comment = require('../../Models/Comments.model');
const { successCode, failCode } = require('../../config/reponse');

const getComment = async (req, res) => {
    try {
        const dataComment = await Comment.find({}, { __v: 0 });
        if (dataComment == "") {
            failCode(res, "", "List comment is emty !")
        }
        else {
            successCode(res, dataComment, "Get list comment success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getComment }