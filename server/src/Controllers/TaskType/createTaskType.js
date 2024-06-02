
const TaskType = require('../../Models/TaskType.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const createTaskType = async (req, res) => {
    const { taskType } = req.body;
    try {
        const result = await TaskType.create({
            taskType:taskType
        })
        if (result == "") {
            failCode(res, "", "Create fail!")
        }
        else {
            successCode(res, result, "Create success !")
        }
    } catch (error) {
        errorCode(res, "Backend error")
    }

}
module.exports = { createTaskType }