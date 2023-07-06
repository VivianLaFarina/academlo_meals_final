const { body, validationResult } = require('express-validator');

// Middleware for validating fields with mapping
const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

// Validation for creating users
exports.createValidationUsers = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Must be a valid email.'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  validFields,
];

// Validation for updating users
exports.updateValidationUsers = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Must be a valid email.'),
  validFields,
];

// Validation for user login
exports.loginValidationUsers = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .isEmail()
    .withMessage('Must be a valid email.'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  validFields,
];

// Validation for creating restaurant premises
exports.createLocalRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('address').notEmpty().withMessage('Address cannot be empty.'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5'),
  validFields,
];

// Validation for updating restaurant premises
exports.updateLocalRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('address').notEmpty().withMessage('Address cannot be empty.'),
  validFields,
];

// Validation for reviews
exports.validationReviews = [
  body('comment').notEmpty().withMessage('Comment cannot be empty.'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5'),
  validFields,
];

// Validation for meals
exports.MealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty.')
    .isInt({ min: 1 })
    .withMessage('Price must be a number'),
  validFields,
];

// Validation for orders
exports.orderValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be empty.')
    .isInt()
    .withMessage('Quantity must be a number'),
  body('mealId')
    .notEmpty()
    .withMessage('mealId cannot be empty.')
    .isInt()
    .withMessage('mealId must be a number'),
  validFields,
];
