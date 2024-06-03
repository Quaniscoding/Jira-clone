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

        const newUser = await User.create({
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
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            birth_day: newUser.birth_day,
            gender: newUser.gender,
            role: newUser.role,
            avatar: `https://ui-avatars.com/api/?name=${newUser.username}`
        }, "Create account success!");

    } catch (error) {
        return errorCode(res, "Backend error");
    }
};

module.exports = { signUp };
