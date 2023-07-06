middleware.js;

const Users = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/review');
const Orders = require('../models/order.model');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Middleware to protect routes with token authentication
exports.protects = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract the token from the Authorization header
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please provide a valid token to log in', 401));
  }

  // Verify the token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  // Find the user associated with the decoded token
  const user = await Users.findOne({
    where: {
      id: decoded.id,
      status: 'active',
    },
  });

  if (!user) {
    return next(
      new AppError(
        'The user associated with this token is no longer active',
        401
      )
    );
  }

  // Add the user to the request object for further use
  req.sessionUser = user;
  next();
});

// Middleware to protect account owner, orders, and reviews
exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  // Check if the current user owns the account
  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});

exports.protectAccountOwnerByOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  // Find the order by ID
  const order = await Orders.findOne({
    where: { id },
  });

  // Check if the current user owns the order
  if (order.userId !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});

exports.protectAccountOwnerByReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  // Find the review by ID
  const review = await Reviews.findOne({
    where: { id },
  });

  // Check if the current user owns the review
  if (review.userId !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

  next();
});

// Middleware to restrict access based on user roles
exports.restrictionTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have access to perform this action!', 403)
      );
    }

    next();
  };
};
