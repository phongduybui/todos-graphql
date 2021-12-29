function handleDuplicateEmail(err) {
  err.statusCode = 400;
  err.message = 'Email already exist';
}

function handleExpiredToken(err) {
  err.statusCode = 401;
  err.message = 'Login session has expired. Please login again !!';
}

function handleInvalidToken(err) {
  err.statusCode = 400;
  err.message = 'Login fail. Please try again !!';
}

function sendErrPro(err, res) {
  err.statusCode = err.statusCode || 400;
  res.status(err.statusCode).json({
    status: 'fail',
    message: err.message,
  });
}

function sendErrDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    Error: err,
    message: err.message,
    stack: err.stack,
  });
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'dev') sendErrDev(err, res);
  else if (process.env.NODE_ENV === 'prod') {
    if (err.original) {
      if (err.original.errno === 1062) handleDuplicateEmail(err);
    }
    if (err.message === 'jwt expired') handleExpiredToken(err);
    if (err.message === 'invalid signature') handleInvalidToken(err);
    sendErrPro(err, res);
  }
};
