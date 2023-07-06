const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Restaurant = require('../models/restaurant.model');
const Meal = require('../models/meal.model');
const Order = require('../models/order.model');

// Middleware to validate the order
exports.validateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Check if the order has been completed
  const orderComplete = await Order.findOne({
    where: {
      id,
      status: 'completed',
    },
  });

  if (orderComplete) {
    return next(
      new AppError(`Order with ID ${id} has already been completed.`)
    );
  }

  // Find the active order with associated meals and restaurant
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status'],
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'status'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'status'],
        },
      },
    ],
  });

  if (!order) {
    return next(new AppError(`Order with ID ${id} was not found.`, 404));
  }

  req.order = order;
  next();
});
