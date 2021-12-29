const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * @desc Authentication, check token
 */
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('You are not login', 401));

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findByPk(decode.id);

  if (!user) return next(new AppError('User not belong exist', 404));

  req.user = user;
  next();
});
