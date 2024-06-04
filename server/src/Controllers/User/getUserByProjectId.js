const Project = require('../../Models/Project.model');
const User = require('../../Models/User.model');
const { failCode, successCode } = require('../../config/reponse');

const getUserByProjectId = async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return failCode(res, "", "Project not found");
        }
        const userIds = project.members.map(member => member._id);
        const users = await User.find({ _id: { $in: userIds } }).select('-pass_word');
        if (!users) {
            failCode(res, "", "User does not exist !")
        }
        else {
            successCode(res, users, "Get User success!")
        }

    } catch (error) {
        console.log(error);
        failCode(res, "Backend error !")
    }
}
module.exports = { getUserByProjectId };