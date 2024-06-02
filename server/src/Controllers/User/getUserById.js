const Data = require('../../Models/User.model');
const { successCode, failCode } = require('../../config/reponse');

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Data.findById(id);
        if (!result) {
            failCode(res, "", "User does not exist !")
        }
        else {
            successCode(res, {
                "_id": result._id,
                "username": result.username,
                "email": result.email,
                "phone": result.phone,
                "birth_day": result.birth_day,
                "gender": result.gender,
                "role": result.role,
                "avatar": result.avatar.data
            }, "Get User success!")
        }

    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getUserById }