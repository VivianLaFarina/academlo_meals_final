const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const { where } = require('sequelize');

// 1. POST /:id - Create a new meal in the restaurant, where :id is the restaurant ID (send name and price (INT) in req.body)
exports.createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  // Find the restaurant by ID
  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
  });

  // Check if the restaurant exists
  if (!restaurant) {
    return next(
      new AppError(`The id: ${id} does NOT exist or was NOT found 🟡 `, 400)
    );
  }

  // Create a new meal
  const meal = await Meals.create({
    name: name,
    price: price,
    restaurantId: id,
  });

  // Send success response
  res.status(200).json({
    status: 'success',
    message: 'Food created successfully, enjoy your meal! 🟢',
    data: {
      meal,
    },
  });
});

// 2. GET / - Get all meals with status set to active.
exports.getMealStatus = catchAsync(async (req, res, next) => {
  // Retrieve all meals with status set to active
  const allMeals = await Meals.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'id', 'address', 'rating'],
      },
    ],
  });

  // Check if there are any meals available
  if (!allMeals || allMeals.length === 0) {
    return next(new AppError('There are no meals available 🚫', 400));
  }

  // Send success response with all meals
  res.status(200).json({
    status: 'success',
    message: 'All meals available in the system ✅',
    data: {
      allMeals,
      count: allMeals.length,
    },
  });
});

// 3. GET /:id - Get a meal by id with status set to active.
exports.getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find a meal by ID with status set to active
  const meal = await Meals.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'id', 'address', 'rating'],
      },
    ],
  });

  // Check if the meal exists
  if (!meal) {
    return next(
      new AppError(`The id: ${id} does NOT exist or was NOT found 🟡`, 404)
    );
  }

  // Send success response with the meal
  res.status(200).json({
    status: 200,
    message: 'Here is your meal, hope you enjoy it! 🟢',
    data: {
      allmealforId: meal,
    },
  });
});

// 4. PATCH /:id - Update a meal (name, price) by ID.
exports.updateMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  // Find the meal by ID
  const meal = await Meals.findOne({
    where: {
      id,
    },
  });

  // Check if the meal exists
  if (!meal) {
    return next(
      new AppError(`Meal does NOT exist or was NOT found by Id: ${id} 🟠`, 404)
    );
  }

  // Update the meal's name and price
  const updatedMeal = await meal.update({
    name,
    price,
  });

  // Send success response with the updated meal
  res.status(200).json({
    status: 'success',
    message: `The meal with ID: ${id} has been updated. ✅`,
    data: {
      meal: updatedMeal,
    },
  });
});

// 5. DELETE /:id - Disable a meal by ID.
exports.deleteMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the meal by ID with status set to active
  const meal = await Meals.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  // Check if the meal exists
  if (!meal) {
    return next(new AppError(`No se encontró la comida con el id: ${id} 🦊`));
  }

  // Disable the meal by updating its status
  const updatedMeal = await meal.update({
    status: 'cancelled',
  });

  // Send success response
  res.status(200).json({
    status: 'success',
    message: 'Tu comida ha sido eliminada ✅ Gracias! 🌞',
    data: {
      meal: updatedMeal,
    },
  });
});
const Meal = require('../models/meal.model');
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const { where } = require('sequelize');

// 1. POST /:id - Create a new meal in the restaurant, where :id is the restaurant ID (send name and price (INT) in req.body)
exports.createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  // Find the restaurant by ID
  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
  });

  // Check if the restaurant exists
  if (!restaurant) {
    return next(
      new AppError(`The id: ${id} does NOT exist or was NOT found 🟡 `, 400)
    );
  }

  // Create a new meal
  const meal = await Meals.create({
    name: name,
    price: price,
    restaurantId: id,
  });

  // Send success response
  res.status(200).json({
    status: 'success',
    message: 'Food created successfully, enjoy your meal! 🟢',
    data: {
      meal,
    },
  });
});

// 2. GET / - Get all meals with status set to active.
exports.getMealStatus = catchAsync(async (req, res, next) => {
  // Retrieve all meals with status set to active
  const allMeals = await Meals.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'id', 'address', 'rating'],
      },
    ],
  });

  // Check if there are any meals available
  if (!allMeals || allMeals.length === 0) {
    return next(new AppError('There are no meals available 🚫', 400));
  }

  // Send success response with all meals
  res.status(200).json({
    status: 'success',
    message: 'All meals available in the system ✅',
    data: {
      allMeals,
      count: allMeals.length,
    },
  });
});

// 3. GET /:id - Get a meal by id with status set to active.
exports.getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find a meal by ID with status set to active
  const meal = await Meals.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'id', 'address', 'rating'],
      },
    ],
  });

  // Check if the meal exists
  if (!meal) {
    return next(
      new AppError(`The id: ${id} does NOT exist or was NOT found 🟡`, 404)
    );
  }

  // Send success response with the meal
  res.status(200).json({
    status: 200,
    message: 'Here is your meal, hope you enjoy it! 🟢',
    data: {
      allmealforId: meal,
    },
  });
});

// 4. PATCH /:id - Update a meal (name, price) by ID.
exports.updateMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  // Find the meal by ID
  const meal = await Meals.findOne({
    where: {
      id,
    },
  });

  // Check if the meal exists
  if (!meal) {
    return next(
      new AppError(`Meal does NOT exist or was NOT found by Id: ${id} 🟠`, 404)
    );
  }

  // Update the meal's name and price
  const updatedMeal = await meal.update({
    name,
    price,
  });

  // Send success response with the updated meal
  res.status(200).json({
    status: 'success',
    message: `The meal with ID: ${id} has been updated. ✅`,
    data: {
      meal: updatedMeal,
    },
  });
});

// 5. DELETE /:id - Disable a meal by ID.
exports.deleteMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Find the meal by ID with status set to active
  const meal = await Meals.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  // Check if the meal exists
  if (!meal) {
    return next(new AppError(`No se encontró la comida con el id: ${id} 🦊`));
  }

  // Disable the meal by updating its status
  const updatedMeal = await meal.update({
    status: 'cancelled',
  });

  // Send success response
  res.status(200).json({
    status: 'success',
    message: 'Tu comida ha sido eliminada ✅ Gracias! 🌞',
    data: {
      meal: updatedMeal,
    },
  });
});
