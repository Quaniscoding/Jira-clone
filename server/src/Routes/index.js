const express = require('express');

//comment
const getComment = require('./Comment/getComment')
const postComment = require('./Comment/createComment');
const deleteComment = require('./Comment/deleteComment');
const updateComment = require('./Comment/updateComment');
//user
const signUp = require('./User/signUp');
const signIn = require('./User/signIn');
const getUser = require('./User/getUser')
const deleteUser = require('./User/deleteUser')
const getUserById = require('./User/getUserById')
const searchUser = require('./User/searchUser')
const createUser = require('./User/createUser')
const updateUser = require('./User/updateUser')
const getUserByPagination = require('./User/getUserByPagination')
//priority
const getPriority = require('./Priority/getPriority')
const createPriority = require('./Priority/createPriority')
//projectCategory
const getProjectCategory = require('./ProjectCategory/getProjectCategory')
const createProjectCategory = require('./ProjectCategory/createProjectCategory')
//Status
const getStatus = require('./Status/getStatus')
const createStatus = require('./Status/createStatus')
//TaskType
const getTaskType = require('./TaskType/getTaskType')
const createTaskType = require('./TaskType/createTaskType')
const rootRoute = express.Router();
//Project
const createProject = require('./Project/createProject')
const getProjectDetail = require('./Project/getProjectDetail')
const getAllProject = require('./Project/getAllProject')
const deleteProject = require('./Project/deleteProject')
const updateProject = require('./Project/updateProject')
const assignUserProject = require('./Project/assignUserProject')
//comment
rootRoute.use('/', getComment)
rootRoute.use('/', postComment)
rootRoute.use('/', deleteComment)
rootRoute.use('/', updateComment)

//user
rootRoute.use('/user', signUp)
rootRoute.use('/user', signIn)
rootRoute.use('/user', getUser)
rootRoute.use('/user', deleteUser)
rootRoute.use('/user', getUserById)
rootRoute.use('/user', searchUser)
rootRoute.use('/user', createUser)
rootRoute.use('/user', updateUser)
rootRoute.use('/user', getUserByPagination)
//priority
rootRoute.use('/priority', getPriority)
rootRoute.use('/priority', createPriority)
//projectCategory
rootRoute.use('/projectCategory', getProjectCategory)
rootRoute.use('/projectCategory', createProjectCategory)

//Status
rootRoute.use('/status', getStatus)
rootRoute.use('/status', createStatus)

//TaskType
rootRoute.use('/taskType', getTaskType)
rootRoute.use('/taskType', createTaskType)

//Project
rootRoute.use('/project', createProject);
rootRoute.use('/project', getProjectDetail);
rootRoute.use('/project', getAllProject);
rootRoute.use('/project', deleteProject);
rootRoute.use('/project', updateProject);
rootRoute.use('/project', assignUserProject);

module.exports = rootRoute;