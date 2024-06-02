const User = require('../../Models/User.model');
const { successCode, failCode, errorCode, errorCodeNew } = require('../../config/reponse');

const getUserByPagination = async (req, res) => {
    const { pageIndex, pageSize, keyWord } = req.query;
    try {
        if (!pageSize || isNaN(Number(pageSize)) || Number(pageSize) <= 0) {
            errorCodeNew(res, "The pageSize must be a positive number greater than zero.");
            return;
        }

        // ...

        let query = {};
        if (keyWord) {
            // Use a regular expression for a case-insensitive search on multiple fields
            query = {
                $or: [
                    { username: { $regex: keyWord, $options: 'i' } },
                    { email: { $regex: keyWord, $options: 'i' } },
                    // Add more fields as needed
                ]
            };
        }

        // ...


        // Count total number of users
        const totalUsers = await User.countDocuments(query);

        let skip = 0;
        if (pageIndex) {
            skip = (Number(pageIndex) - 1) * Number(pageSize);
        }

        const result = await User.find(query)
            .skip(skip)
            .limit(Number(pageSize));

        if (result.length === 0) {
            failCode(res, "User empty!");
        } else {
            const pageCount = Math.ceil(totalUsers / Number(pageSize));
            successCode(res, {
                pageIndex,
                pageSize,
                totalRow: totalUsers,
                pageCount,
                result
            }, "Get User success!");
        }
    } catch (error) {
        errorCode(res, "Backend error!");
    }
};

module.exports = {
    getUserByPagination
};
