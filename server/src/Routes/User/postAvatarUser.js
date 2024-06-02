const express = require('express');
const { postAvatarUser } = require('../../Controllers/User/postAvatarUser');
const { verifyToken } = require('../../middlewares/baseToken');
const { upload } = require('../../middlewares/upload');

const userRoute = express.Router();
userRoute.put("/postAvatarUser/:id", upload.single("dataUpload"), verifyToken, postAvatarUser)
module.exports = userRoute;
