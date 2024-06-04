const bcrypt = require('bcrypt');
const User = require('../../Models/User.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const signUp = async (req, res) => {
    try {
        const { username, email, pass_word, phone, birth_day, gender, role } = req.body;

        const passWordHash = await bcrypt.hash(pass_word, 10);


        const checkEmailExist = await User.findOne({ email });
        if (checkEmailExist) {
            return failCode(res, "", "Email already exists!");
        }

        const result = await User.create({
            username,
            email,
            pass_word: passWordHash,
            phone,
            birth_day,
            gender,
            role: "user",
            avatar
        });

        return successCode(res, {
            username: result.username,
            email: result.email,
            phone: result.phone,
            birth_day: result.birth_day,
            gender: result.gender,
            role: result.role,
            avatar: `https://ui-avatars.com/api/?name=${result.username}`
        }, "Create account success!");

    } catch (error) {
        return errorCode(res, "Backend error");
    }
};

module.exports = { signUp };
