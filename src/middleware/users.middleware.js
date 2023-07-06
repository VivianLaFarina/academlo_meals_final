const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const Order = require('../models/order.model');

// Middleware to validate a user
exports.validateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError(`User with ID ${id} was not found.`, 404));
  }

  req.user = user;
  next();
});

// Middleware to validate a user session
exports.validateUserSession = catchAsync(async (req, res, next) => {
  const { userSession } = req;

  // Find the user by session ID
  const user = await User.findOne({
    where: {
      id: userSession.id,
      status: 'active',
    },
    include: [
      {
        model: Order,
        attributes: {
          exclude: ['mealId', 'userId', 'status', 'updatedAt', 'createdAt'],
        },
        include: [
          {
            model: Meal,
            attributes: {
              exclude: [
                'status',
                'restaurantId',
                'userId',
                'updatedAt',
                'createdAt',
              ],
            },
            include: [
              {
                model: Restaurant,
                attributes: {
                  exclude: ['status', 'updatedAt', 'createdAt'],
                },
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    return next(
      new AppError(`User with ID ${userSession.id} was not found.`, 404)
    );
  }

  req.user = user;
  next();
});
