const User = require('./user.model');
const Order = require('./order.model');
const Meal = require('./meal.model');
const Review = require('./review.model');
const Restaurant = require('./restaurant.model');

// Function to initialize the model associations
const initModel = () => {
  // Define associations between Users and Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // Define associations between Users and Orders
  User.hasMany(Order);
  Order.belongsTo(User);

  // Define associations between Meals and Orders
  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  // Define associations between Restaurants and Meals
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  // Define associations between Restaurants and Reviews
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);
};

module.exports = initModel;
