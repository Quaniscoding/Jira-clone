const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { createComment } = require('../../Controllers/Comment/createComment')
userRoute.post('/createComment', verifyToken, createComment);

module.exports = userRoute;


