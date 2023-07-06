const authMiddleware = require('../middleware/auth.middleware');
const validationMiddleware = require('../middleware/validation.middleware');
const restaurantMiddleware = require('../middleware/restaurant.middleware');
const restaurantController = require('../controllers/restaurant.controller');

const { Router } = require('express');
const router = Router();

// Route for retrieving all local restaurants
router.route('/').get(restaurantController.findLocalRestaurantById);

// Route for creating a new local restaurant
router.route('/').post(
  authMiddleware.protects, // Middleware to protect the route and require authentication
  authMiddleware.restrictionTo('admin'), // Middleware to restrict access to admin users only
  validationMiddleware.createLocalRestaurantValidation, // Middleware for validating the request data
  restaurantController.createNewRestaurant
);

// Route for updating and deleting reviews of a restaurant
router
  .route('/reviews/:restaurantId/:id')
  .patch(
    authMiddleware.protects,
    authMiddleware.protectAccountOwnerByReview,
    validationMiddleware.validationReviews,
    restaurantMiddleware.validationReview,
    restaurantController.updateReviews
  )
  .delete(
    authMiddleware.protects,
    authMiddleware.protectAccountOwnerByReview,
    restaurantMiddleware.validationReview,
    restaurantController.deleteReviews
  );

// Route for creating a new review for a restaurant
router.post(
  '/reviews/:id',
  authMiddleware.protects,
  validationMiddleware.validationReviews,
  restaurantMiddleware.validationRestaurant,
  restaurantController.createNewsReviews
);

// Middleware for validating the restaurant by ID for all routes below
router.use('/:id', restaurantMiddleware.validationRestaurant);

// Route for retrieving a specific local restaurant by ID
router.route('/:id').get(restaurantController.findLocalRestaurantById);

// Route for updating and deleting a specific local restaurant by ID
router
  .route('/:id')
  .patch(
    authMiddleware.protects,
    authMiddleware.restrictionTo('admin'),
    validationMiddleware.updateLocalRestaurantValidation,
    restaurantController.updateLocalRestaurant
  )
  .delete(
    authMiddleware.protects,
    authMiddleware.restrictionTo('admin'),
    restaurantController.deleteLocalRestaurant
  );

module.exports = router;
