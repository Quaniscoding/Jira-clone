const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        // Find the task that contains the comment
        const task = await Task.findOne({ "listComment._id": commentId });

        if (!task) {
            return failCode(res, "", "Comment not found");
        }

        // Remove the comment from the task
        const commentIndex = task.listComment.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return failCode(res, "", "Comment not found");
        }

        task.listComment.splice(commentIndex, 1);  // Remove the comment at the found index
        await task.save();

        return successCode(res, commentId, "Comment deleted successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { deleteComment };
