const Task = require('../models/taskModel');
const { Op, or } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const moment = require('moment');

/**
 * @desc Create new task
 * @rotue [POST] /api/v1/tasks
 * @access Public
 */
exports.createTask = catchAsync(async (req, res) => {
  req.body.user_id = req.user.user_id;
  const task = await Task.create(req.body);
  res.status(200).json({
    status: 'Success',
    task,
  });
});

/**
 * @desc Get all task of current user
 * @rotue [GET] /api/v1/tasks
 * @access Current user
 */
exports.getTasks = catchAsync(async (req, res) => {
  let { offset = 0, limit = 6, filter, order_by } = req.query;

  offset = parseInt(offset);
  limit = parseInt(limit);
  order_by = order_by
    ? JSON.parse(decodeURIComponent(order_by))
    : { createdAt: 'DESC' };

  console.log({ offset, limit, order_by, filter });

  const where = filter
    ? {
        user_id: req.user.user_id,
        task_name: {
          [Op.substring]: filter,
        },
      }
    : {
        user_id: req.user.user_id,
      };

  const taskList = await Task.findAndCountAll({
    where,
    limit,
    offset,
    order: order_by && Object.entries(order_by),
  });

  taskList.rows.forEach((task) => {
    task.dataValues.task_due = moment(task.dataValues.task_due).format(
      'YYYY-MM-DD h:mm a'
    );
  });

  res.status(200).json({
    status: 'success',
    data: {
      count: taskList.count,
      tasks: taskList.rows,
      // totalPages: Math.ceil(taskList.count / per_page),
      // currentPage: page,
    },
  });
});

/**
 * @desc Update task
 * @rotue [PUT] /api/v1/tasks/:id
 * @access Current user
 */
exports.updateTask = catchAsync(async (req, res, next) => {
  let task = await Task.findByPk(req.params.id);
  if (!task) {
    return next(new AppError('Task not found', 404));
  }

  task.task_name = req.body.task_name || task.task_name;
  task.task_description = req.body.task_description || task.task_description;
  task.task_due = req.body.task_due || task.task_due;
  task.priority = req.body.priority || task.priority;
  task.completed =
    typeof req.body.completed === 'boolean'
      ? req.body.completed
      : task.completed;

  const updatedTask = await task.save();

  res.status(200).json({
    status: 'Success',
    updatedTask,
  });
});

/**
 * @desc Delete task
 * @rotue [DELETE] /api/v1/tasks/:id
 * @access Current user
 */
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) return next(new AppError('Task not found', 404));

  await task.destroy();

  res.status(200).json({
    status: 'Success',
    task: { task_id: task.task_id },
  });
});

/**
 * @desc Get task detail
 * @rotue [GET] /api/v1/tasks/:id
 * @access Current user
 */
exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return next(new AppError('Task not found', 404));
  res.status(200).json({
    status: 'Success',
    task,
  });
});
