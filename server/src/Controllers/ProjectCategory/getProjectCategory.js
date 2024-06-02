
const ProjectCategory = require('../../Models/ProjectCategory.model');

const { successCode, failCode } = require('../../config/reponse');

const getProjectCategory = async (req, res) => {
    try {
        const result = await ProjectCategory.find()
        if (result == "") {
            failCode(res, "", "List ProjectCategory is not exist !")
        }
        else {
            successCode(res, result, "Get list Project Category success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getProjectCategory }