const bcrypt = require('bcrypt');
const User = require('../../Models/User.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const createUser = async (req, res) => {
    try {
        const { username, email, pass_word, phone, birth_day, gender } = req.body;
        let passWordHash = bcrypt.hashSync(pass_word, 10);
        const checkEmailExist = await User.findOne({ email: email })
        if (checkEmailExist) {
            failCode(res, "", "Email is exist !")
        }
        else {
            await User.create({
                username: username,
                email: email,
                pass_word: passWordHash,
                phone: phone,
                birth_day: birth_day,
                gender: gender,
                role: "user",
                avatar: {
                    "data": "",
                    "contentType": ""
                }
            }
            );
            successCode(res, {
                "username": username,
                "email": email,
                "phone": phone,
                "birth_day": birth_day,
                "gender": gender,
                "role": "user",
                "avatar": {
                    "data": "",
                    "contentType": ""
                }
            }, "Create account success !");
        }
    } catch (error) {
        errorCode(res, "Backend error")
    }
}
module.exports = { createUser }
