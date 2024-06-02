const Project = require('../../Models/Project.model');
const ProjectCategory = require('../../Models/ProjectCategory.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const createProject = async (req, res) => {
    console.log(req.user);

    const { projectName, description, categoryId, alias } = req.body;
    // const creatorId = req.user._id;
    // const creatorName = req.user.username;

    // try {
    //     const projectExist = await Project.findOne({ projectName, categoryId });

    //     if (projectExist) {
    //         return failCode(res, "", "Project name already exists in this category");
    //     }

    //     const categoryExist = await ProjectCategory.findOne({ _id: categoryId });

    //     if (!categoryExist) {
    //         return failCode(res, "", "Project category doesn't exist!");
    //     }

    //     const result = await Project.create({
    //         projectName,
    //         description,
    //         categoryId,
    //         alias,
    //         deleted: "false",
    //         // creator: {
    //         //     id: creatorId,
    //         //     name: creatorName
    //         // }
    //     });

    //     return successCode(res, {
    //         projectName,
    //         description,
    //         categoryId,
    //         alias,
    //         deleted: "false",
    //         creator: {
    //             id: creatorId,
    //             name: creatorName
    //         }
    //     }, "Create project success!");

    // } catch (error) {
    //     return errorCode(res, "Backend error");
    // }
};

module.exports = { createProject };
