const { failCode, successCode, errorCode } = require('../../config/reponse');
const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');

const createComment = async (req, res) => {
    const { taskId, contentComment } = req.body;
    const userId = req.user._id;
    try {
        // Check if the task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return failCode(res, "", "Task not found!");
        }

        // Create the new comment object
        const newComment = {
            userId,
            contentComment,
            alias: req.user.username,
            "deleted": false,
        };

        // Add the new comment to the listComment array
        task.listComment.push(newComment);

        // Save the updated task
        await task.save();

        return successCode(res, "", "Comment added successfully!");
    } catch (error) {
        console.error(error); // Log the error for debugging
        return errorCode(res, "Backend error");
    }
};

module.exports = { createComment };
