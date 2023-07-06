const AppError = require('../utils/appError');
const logger = require('../utils/logger');

// Handles cast error for duplicate field value
const handleCastError23505 = () => {
  return new AppError(
    'Duplicate field value: please use another value 🟡',
    400
  );
};

// Handles expired token error
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please log in again 🟡', 401);
};

// Handles invalid token error
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again 🔴', 401);
};

// Sends error response in development environment
const sendErrorDev = (err, res) => {
  logger.info(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Sends error response in production environment
const sendErrorProd = (err, res) => {
  logger.info(err);

  if (err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🔴 🔴',
    });
  }
};

// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // Development environment: send detailed error response
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Production environment: handle specific errors and send appropriate response
    let error = { ...err };

    if (!error.parent?.code) {
      // If no specific error code, use the original error
      error = err;
    }

    if (error.parent?.code === '23505') {
      // Handling cast error for duplicate field value
      error = handleCastError23505();
    } else if (error.name === 'TokenExpiredError') {
      // Handling expired token error
      error = handleJWTExpiredError();
    } else if (error.name === 'JsonWebTokenError') {
      // Handling invalid token error
      error = handleJWTError();
    }

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
