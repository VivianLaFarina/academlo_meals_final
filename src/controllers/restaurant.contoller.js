const catchAsync = require('../utils/catchAsync');
const restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const Review = require('../models/review.model');
const User = require('../models/user.model');

// 1 POST / Create a new restaurant (send name, address, rating (INT)). Rating must be a value from 1 to 5.
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  // Create a new restaurant with the provided name, address, and rating
  const newRestaurant = await restaurant.create({
    name: name,
    address: address,
    rating: rating,
  });

  // Check if all the required fields are provided
  if (!name || !address || !rating) {
    return next(
      new AppError('All fields are required to create a restaurant.', 400)
    );
  }

  // Send a success response with the created restaurant data
  res.status(200).json({
    status: 'success',
    message: 'Restaurant created successfully.',
    data: {
      restaurant: newRestaurant,
    },
  });
});

// 2 GET / Get all restaurants with status "active".
exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  // Find one restaurant with status "active" to check if any restaurant exists
  const foundRestaurant = await restaurant.findOne({
    where: { status: 'active' },
  });

  if (!foundRestaurant) {
    // If no restaurant found, return an error
    next(new AppError('No restaurants found.', 400));
  }

  // Find all restaurants with status "active" and include associated reviews and users
  const allRestaurants = await restaurant.findAll({
    where: { status: 'active' },
    attributes: ['id', 'name', 'address', 'rating'],
    include: [
      {
        model: Review,
        where: { status: 'active' },
        attributes: ['comment', 'rating'],
        include: {
          model: User,
          where: { status: true },
          attributes: ['name', 'email'],
        },
      },
    ],
  });

  // Send a success response with all the restaurants and their associated reviews and users
  res.status(200).json({
    status: 'success',
    message: 'All restaurants retrieved successfully.',
    data: {
      allRestaurants,
    },
  });
});

// 3 GET /:id Get a restaurant by ID.
exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find a restaurant by the provided ID
  const restaurantById = await restaurant.findOne({
    where: {
      id: id,
    },
  });

  if (!restaurantById) {
    // If no restaurant found, return an error
    next(new AppError(`No restaurant found with ID: ${id}.`));
  }

  // Send a success response with the restaurant data
  res.status(200).json({
    status: 'success',
    message: `Restaurant with ID: ${id} retrieved successfully.`,
    data: {
      restaurantById,
    },
  });
});

// 4 PATCH /:id Update a restaurant (name, address).
exports.updateRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  // Find a restaurant by the provided ID
  const restaurantById = await restaurant.findOne({
    where: {
      id: id,
    },
  });

  if (!restaurantById) {
    // If no restaurant found, return an error
    next(new AppError(`No restaurant found with ID: ${id}.`));
  }

  // Update the restaurant's

  const updatedRestaurant = await restaurantById.update({
    name: name,
    address: address,
  });

  // Send a success response with the updated restaurant data
  res.status(200).json({
    status: 'success',
    message: `Restaurant with ID: ${id} updated successfully.`,
    data: {
      updatedRestaurant,
    },
  });
});

// 5 DELETE /:id Disable a restaurant.
exports.deleteRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find a restaurant by the provided ID
  const restaurantById = await restaurant.findOne({
    where: {
      id: id,
    },
  });

  if (!restaurantById) {
    // If no restaurant found, return an error
    next(new AppError(`No restaurant found with ID: ${id}.`));
  }

  // Disable the restaurant by setting its status to "inactive"
  const deletedRestaurant = await restaurantById.update({
    status: 'inactive',
  });

  // Send a success response with the deleted restaurant data
  res.status(200).json({
    status: 'success',
    message: `Restaurant with ID: ${id} disabled successfully.`,
    data: {
      deletedRestaurant,
    },
  });
});

// 6 POST /reviews/:id Create a new review for the restaurant, where :id is the restaurant ID (send comment, rating (INT) in req.body).
exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const userId = req.sessionUser.id;
  const { id } = req.params;

  // Find a restaurant by the provided ID
  const restaurantById = await restaurant.findOne({
    where: {
      id,
    },
  });

  if (!restaurantById) {
    // If no restaurant found, return an error
    next(new AppError(`Restaurant with ID: ${id} does not exist.`, 400));
  }

  // Create a new review with the provided comment, rating, restaurantId, and userId
  const review = await Review.create({
    comment: comment,
    rating: rating,
    restaurantId: id,
    userId: userId,
  });

  console.log(review);

  // Send a success response with the created review data
  res.status(200).json({
    status: 'success',
    message: 'Review created successfully.',
    data: {
      review,
    },
  });
});

// 7 PATCH /reviews/:restaurantId/:id Update a review made in a restaurant, where :id is the review ID and :restaurantId is the restaurant ID (comment, rating). ONLY THE AUTHOR OF THE REVIEW CAN UPDATE THEIR OWN REVIEW.

exports.updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  const userId = req.sessionUser.id;

  // Find a review by the provided ID
  const reviewById = await Review.findOne({
    where: {
      id: id,
    },
  });

  if (!reviewById) {
    // If no review found, return an error
    return next(new AppError(`Review with ID: ${id} does not exist.`, 400));
  }

  // Check if the logged-in user is the author of the review

  // Update the review's comment and rating
  const updatedReview = await reviewById.update({
    comment: comment,
    rating: rating,
  });

  // Send a success response with the updated review data
  res.status(200).json({
    status: 'success',
    message: `Review with ID: ${id} updated successfully.`,
    data: {
      updatedReview,
    },
  });
});

// 8 DELETE /reviews/:restaurantId/:id Delete a review made in a restaurant and set its status to "deleted", where :id is the review ID and :restaurantId is the restaurant ID. ONLY THE AUTHOR OF THE REVIEW CAN UPDATE THEIR OWN REVIEW.
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.sessionUser.id;
  const restaurantId = req.params.restaurantId;

  // Find a review by the

  const reviewById = await Review.findOne({
    where: {
      id,
      userId,
      restaurantId,
    },
  });

  if (!reviewById) {
    // If no review found, return an error
    next(
      new AppError(
        `Review with ID ${id} does not exist or the restaurant with ID ${restaurantId} does not exist in our database.`,
        404
      )
    );
  }

  // Disable the review by setting its status to "inactive"
  await reviewById.update({
    status: 'inactive',
  });

  // Send a success response
  res.status(200).json({
    status: 'success',
    message: `Review with ID: ${id} disabled successfully.`,
  });
});
