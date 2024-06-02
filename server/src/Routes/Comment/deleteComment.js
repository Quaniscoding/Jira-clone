const express = require('express');
const userRoute = express.Router();

const { deleteComment } = require('../../Controllers/Comment/deleteComment')
userRoute.delete('/deleteComment/:id', deleteComment);

module.exports = userRoute;


