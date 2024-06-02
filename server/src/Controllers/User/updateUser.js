const { failCode, successCode } = require('../../config/reponse');
const User = require('../../Models/User.model');

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const { username, email, phone, birthday, gender, role, birth_day } = req.body;
        const update = await User.findByIdAndUpdate(id, { username, email, phone, birthday, gender, role, birth_day }, options)
        if (!update) {
            failCode(res, "", "User does not exist !");
            return;
        }
        else {
            successCode(res, {
                "username": username,
                "email": email,
                "phone": phone,
                "birth_day": birth_day,
                "gender": gender,
                "role": role,
                "_id": id
            }, "Update User success !")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { updateUser }