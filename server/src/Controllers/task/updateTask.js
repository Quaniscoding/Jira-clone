const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');
const Status = require('../../Models/Status.model');
const TaskType = require('../../Models/TaskType.model');
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');
const { default: mongoose } = require('mongoose');

const updateTask = async (req, res) => {
    const taskId = req.params.id; // Assuming the task id is passed as a URL parameter
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
        // Check if the task exists
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return failCode(res, "", "Task not found");
        }

        // Validate required fields
        if (!taskName || !originalEstimate || !projectId || !typeId || !priorityId) {
            return failCode(res, "", "Missing required fields");
        }

        // Convert user IDs to ObjectId
        const userObjectIds = listUserAssign.map(id => new mongoose.Types.ObjectId(id));

        // Check if users exist
        const usersExist = await User.find({ _id: { $in: userObjectIds } });
        if (usersExist.length !== listUserAssign.length) {
            return failCode(res, "", "One or more assigned users do not exist");
        }

        // Check if status exists
        if (statusId) {
            const statusExist = await Status.findById(statusId);
            if (!statusExist) {
                return failCode(res, "", "Status does not exist");
            }
        }

        // Check if project exists
        if (projectId) {
            const projectExist = await Project.findById(projectId);
            if (!projectExist) {
                return failCode(res, "", "Project does not exist");
            }
        }

        // Check if type exists
        if (typeId) {
            const typeExist = await TaskType.findById(typeId);
            if (!typeExist) {
                return failCode(res, "", "Type does not exist");
            }
        }

        // Check if priority exists
        if (priorityId) {
            const priorityExist = await Priority.findById(priorityId);
            if (!priorityExist) {
                return failCode(res, "", "Priority does not exist");
            }
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId, {
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
        }, { new: true });

        return successCode(res, updatedTask, "Task updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = updateTask;
