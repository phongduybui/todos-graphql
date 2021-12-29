const express = require('express');
const userRouter = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

userRouter.post('/login', userController.login);
userRouter.get('/me', protect, userController.getMe);
userRouter.post('/', userController.register);

module.exports = userRouter;
