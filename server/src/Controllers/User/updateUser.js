const { failCode, successCode } = require('../../config/reponse');
const User = require('../../Models/User.model');

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const { username, email, phone, birthday, gender, role, birth_day } = req.body;
        const result = await User.findByIdAndUpdate(id, { username, email, phone, birthday, gender, role, birth_day }, options).select('-pass_word');
        if (!result) {
            failCode(res, "", "User does not exist !");
            return;
        }
        else {
            successCode(res, result, "Update User success !")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { updateUser }