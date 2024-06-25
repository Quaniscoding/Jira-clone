const { failCode, successCode } = require("../../config/reponse");
const Project = require("../../Models/Project.model");
const User = require("../../Models/User.model");

const assignUserProject = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    // Find user details
    const userDetail = await User.findById(userId);
    if (!userDetail) {
      return failCode(res, "", "User does not exist!");
    }

    const newUser = {
      _id: userDetail._id,
      name: userDetail.username,
      avatar: userDetail.avatar,
      email: userDetail.email,
      phoneNumber: userDetail.phoneNumber,
    };

    const project = await Project.findById(projectId);
    if (!project) {
      return failCode(res, "", "Project does not exist!");
    }

    const isMember = project.members.some((member) =>
      member._id.equals(userDetail._id)
    );
    if (isMember) {
      return failCode(res, "", "User is already a member of the project!");
    }

    project.members.push(newUser);

    await project.save();

    return successCode(res, "", "Assign user to Project success!");
  } catch (error) {
    return failCode(res, "Backend error!");
  }
};

module.exports = { assignUserProject };
