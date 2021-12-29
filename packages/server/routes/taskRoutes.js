const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

taskRouter.get('/', protect, taskController.getTasks);

taskRouter.post('/', protect, taskController.createTask);

taskRouter
  .route('/:id')
  .get(protect, taskController.getTask)
  .put(protect, taskController.updateTask)
  .delete(protect, taskController.deleteTask);

module.exports = taskRouter;
