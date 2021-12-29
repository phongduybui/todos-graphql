const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const signToken = require('../utils/signToken');

/**
 * @desc Register new user
 * @rotue [POST] /api/v1/auth/register
 * @access Public
 */
exports.register = catchAsync(async (req, res, next) => {
  const { dataValues: newUser } = await User.create(req.body);
  const token = signToken(newUser.user_id);
  res.status(200).json({
    status: 'Success',
    data: {
      user: { ...newUser, password: undefined },
      token,
    },
  });
});

/**
 * @desc Login by system account
 * @rotue [POST] /api/v1/auth
 * @access Public
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ where: { email } });
  if (existUser && (await existUser.matchPassword(password))) {
    const userData = existUser.dataValues;
    const token = signToken(userData.user_id);
    res.status(200).json({
      status: 'Success',
      data: {
        user: { ...userData, password: undefined },
        token,
      },
    });
  } else return next(new AppError('Email or Password is invalid!', 400));
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.user_id);
  res.status(200).json({
    status: 'Success',
    user,
  });
});
