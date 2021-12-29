const { sequelize } = require('./DBconfig');
const User = require('../models/userModel');
const Task = require('../models/taskModel');

const option = process.argv[2] === '--f' ? { force: true } : {};

sequelize
  .sync(option)
  .then(async () => {
    console.log('Sync Database success !');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });
