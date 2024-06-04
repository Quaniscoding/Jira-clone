const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const deleteTask = async (req, res) => {
    const taskId = req.params.id; // Assuming the task id is passed as a URL parameter

    try {
        // Find the task by its id and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Check if the task exists and was deleted successfully
        if (!deletedTask) {
            return failCode(res, "", "Task not found");
        }

        // Return a success response indicating that the task was deleted
        return successCode(res, "", "Task deleted successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = deleteTask;
