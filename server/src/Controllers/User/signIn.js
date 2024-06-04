const User = require('../../Models/User.model');
const { successCodeLogin, failCode } = require('../../config/reponse');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    try {
        const { email, pass_word } = req.body;
        const result = await User.findOne({ email: email }).select('-__v');
        if (result) {
            const { pass_word: passwordHash, ...userInfo } = result.toObject();
            const checkPass = bcrypt.compareSync(pass_word, passwordHash);
            if (checkPass) {
                successCodeLogin(res, userInfo, "Login success!");
            } else {
                failCode(res, "", "Password doesn't match");
            }
        } else {
            failCode(res, "", "User doesn't exist");
        }
    } catch (error) {
        console.log(error);
        failCode(res, "Backend error !");
    }
};

module.exports = { signIn };
