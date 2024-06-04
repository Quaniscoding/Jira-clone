const User = require('../../Models/User.model');
const { successCode, failCode } = require('../../config/reponse');

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.findById(id).select('-pass_word');
        if (!result) {
            failCode(res, "", "User does not exist !")
        }
        else {
            successCode(res, result, "Get User success!")
        }

    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getUserById }