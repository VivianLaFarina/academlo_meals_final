const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Restaurant = require('../models/restaurant.model');
const Meal = require('../models/meal.model');
const Review = require('../models/review');

// Middleware to validate the restaurant
exports.validateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the restaurant by ID
  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Review,
        where: { status: 'active' },
        attributes: { exclude: ['createdAt', 'updatedAt', 'restaurantId'] },
        required: false,
      },
      {
        model: Meal,
      },
    ],
  });

  if (!restaurant) {
    return next(
      new AppError(`The Restaurant with ID ${id} was not found`, 404)
    );
  }

  req.meals = restaurant.meals;
  req.restaurant = restaurant;
  next();
});

// Middleware to validate the review
exports.validateReview = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;

  // Find the review by ID and associated restaurant ID
  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
      status: 'active',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  if (!review) {
    return next(new AppError(`The review was not found`, 404));
  }

  req.review = review;
  next();
});
