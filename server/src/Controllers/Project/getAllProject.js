
const Project = require('../../Models/Project.model');

const { successCode, failCode } = require('../../config/reponse');

const getAllProject = async (req, res) => {
    const keyWord = req.query.keyWord;
    try {
        const result = await Project.find({ projectName: { $regex: new RegExp(keyWord, 'i') } })
        const mappedResult = result.map(item => ({
            projectName: item.projectName,
            description: item.description,
            alias: item.alias,
            deleted: item.deleted,
            members: item.members,
            creator: item.creator,
        }))
        if (result == "") {
            failCode(res, result, "Get list Project success!")
        }
        else {
            successCode(res, mappedResult, "Get list Project success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getAllProject }