const User = require('../../Models/User.model');
const { successCode, failCode } = require('../../config/reponse');

const searchUser = async (req, res) => {
    const keyWord = req.query.keyWord;
    console.log(keyWord);
    try {
        const result = await User.find({ username: { $regex: new RegExp(keyWord, 'i') } });

        const mappedResult = result.map(item => ({
            username: item.username,
            email: item.email,
            phone: item.phone,
            birth_day: item.birth_day,
            gender: item.gender,
            role: item.role,
            id: item.id
        }));
        if (keyWord == "") {
            const result = await User.find();
            successCode(res, result, "Get user success!");
        }
        successCode(res, mappedResult, "Get user success!");

    } catch (error) {
        failCode(res, "Backend error!");
    }
}

module.exports = { searchUser };
