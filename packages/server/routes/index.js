const AppError = require('../utils/AppError');
const userRouter = require('./userRoutes');
const taskRouter = require('./taskRoutes');
const errorController = require('../controllers/errorController');

module.exports = (app) => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/tasks', taskRouter);
  // app.all('/*', (req, res, next) => {
  //   next(new AppError('Page not found', 404));
  // });
  app.use(errorController);
};
