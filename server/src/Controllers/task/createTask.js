const mongoose = require('mongoose');
const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');
const Project = require('../../Models/Project.model');
const Status = require('../../Models/Status.model');
const TaskType = require('../../Models/TaskType.model');
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const createTask = async (req, res) => {
    const {
        listUserAssign,
        taskName,
        description,
        statusId,
        originalEstimate,
        timeTrackingSpent,
        timeTrackingRemaining,
        projectId,
        reporterId,
        typeId,
        priorityId
    } = req.body;

    try {
        // Validate required fields
        if (!taskName || !originalEstimate || !projectId || !typeId || !priorityId) {
            return failCode(res, "", "Missing required fields");
        }
        const duplicateTask = await Task.findOne({ taskName, projectId, statusId });
        if (duplicateTask) {
            return failCode(res, "", "A task with the same name, project, and status already exists");
        }
        // Convert user IDs to ObjectId
        const userObjectIds = listUserAssign.map(id => new mongoose.Types.ObjectId(id));

        // Check if users exist
        const usersExist = await User.find({ _id: { $in: userObjectIds } });
        if (usersExist.length !== listUserAssign.length) {
            return failCode(res, "", "One or more assigned users do not exist");
        }

        // Check if status exists
        const statusExist = await Status.findById(statusId);
        if (!statusExist) {
            return failCode(res, "", "Status does not exist");
        }

        // Check if project exists
        const projectExist = await Project.findById(projectId);
        if (!projectExist) {
            return failCode(res, "", "Project does not exist");
        }

        // Check if type exists
        const typeExist = await TaskType.findById(typeId);
        if (!typeExist) {
            return failCode(res, "", "Type does not exist");
        }

        // Check if priority exists
        const priorityExist = await Priority.findById(priorityId);
        if (!priorityExist) {
            return failCode(res, "", "Priority does not exist");
        }

        // Create a new task
        const newTask = await Task.create({
            listUserAssign: userObjectIds,
            taskName,
            description,
            statusId,
            originalEstimate,
            timeTrackingSpent,
            timeTrackingRemaining,
            projectId,
            reporterId,
            typeId,
            priorityId
        });

        return successCode(res, newTask, "Task created successfully");
    } catch (error) {
        console.log(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { createTask };
