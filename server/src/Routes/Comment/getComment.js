const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { getComment } = require('../../Controllers/Comment/getComment')
userRoute.get('/getComment', verifyToken, getComment);

module.exports = userRoute;