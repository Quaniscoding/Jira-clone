const express = require('express');
const userRoute = express.Router();
const { verifyToken } = require('../../middlewares/baseToken');

const { updateComment } = require('../../Controllers/Comment/updateComment')
userRoute.put('/updateComment/:id', verifyToken, updateComment);

module.exports = userRoute;