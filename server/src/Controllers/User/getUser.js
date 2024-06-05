const User = require('../../Models/User.model');
const { successCode, failCode } = require('../../config/reponse');

const getUser = async (req, res) => {
    try {
        // Get the keyword from the query parameters
        const { keyWord } = req.query;

        // Create a filter object
        const filter = keyWord ? { username: { $regex: keyWord, $options: 'i' } } : {};

        // Find users matching the filter and exclude the password field
        const result = await User.find(filter).select('-pass_word');

        // Send success response with the result
        successCode(res, result, "Get list user success!");
    } catch (error) {
        // Send failure response in case of an error
        failCode(res, "Backend error!");
    }
}

module.exports = { getUser };
