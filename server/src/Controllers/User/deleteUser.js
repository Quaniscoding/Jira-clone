const { successCode, failCode, errorCode } = require("../../config/reponse");
const Data = require('../../Models/User.model')
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Data.findByIdAndDelete(id)
        if (!result) {
            failCode(res, "", 'User does not exist.');
        }
        else {
            successCode(res, {
                "_id": result.id,
                "username": result.username,
                "email": result.email,
                "phone": result.phone,
                "birth_day": result.birth_day
            }, "Delete User success!");
        }
    } catch (error) {
        errorCode(res, "Backend error !");
    }
};
module.exports = {
    deleteUser,
};
