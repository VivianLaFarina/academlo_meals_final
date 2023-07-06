const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');

// 1 POST / Create a new order (send quantity and mealId in req.body)
exports.createOrder = catchAsync(async (req, res, next) => {
  // Create a new order (send quantity and mealId in req.body)
  const { quantity, mealId } = req.body;

  // Get the id of the user placing the order
  const { id } = req.sessionUser;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal)
    next(new AppError('Failed to create the order. Please try again 🟢', 404));

  const order = await Order.create({
    mealId,
    userId: id,
    totalPrice: quantity * meal.price,
    quantity,
  });

  res.status(200).json({
    status: 'success',
    message: 'Order created successfully! ✅',
    data: {
      order,
      totalPrice: quantity * meal.price,
    },
  });
});

// 2 GET /me Get all user orders
exports.getOrderUser = catchAsync(async (req, res, next) => {
  // Get all orders of the user
  const { id } = req.sessionUser;

  const orders = await Order.findAll({
    where: {
      userId: id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        attributes: ['name', 'price'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'Orders retrieved successfully! 👩🏻‍🏭',
    data: {
      orders,
    },
  });
});

// 3 PATCH /:id Mark an order by id as completed //
exports.udpateOrder = catchAsync(async (req, res, next) => {
  // Mark an order by id as completed
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id: id,
      status: ['active', 'completed'],
    },
  });

  // Check if the order exists and has an active status
  if (!order)
    next(
      new AppError(
        `The order has already been cancelled or the id: ${id} does not exist 🚫`,
        404
      )
    );

  // Check if the order is already completed
  if (order.status === 'completed')
    next(
      new AppError(`The order with id: ${id} has already been completed! 🟢`)
    );

  // Update the order status to completed
  await order.update({
    status: 'completed',
  });

  res.status(200).json({
    data: {
      status: 'success',
      message: 'Order completed successfully! ✅',
      order: order,
    },
  });
});

// 4 DELETE /:id Mark an order by id as cancelled

exports.deleteOrder = catchAsync(async (req, res, next) => {
  // Mark an order by id as cancelled
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id: id,
      status: ['active', 'cancelled'],
    },
  });

  // Check if the order exists and has an active status
  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: `The order has already been completed or the ID: ${id} does not exist 🟢`,
    });
  }

  // Check if the order is already cancelled
  if (order.status === 'cancelled') {
    return res.status(200).json({
      status: 'success',
      message: `The order with id: ${id} is already cancelled ✅ `,
    });
  }

  // If the order is not cancelled, mark it as cancelled and send a successful response
  await order.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The order was cancelled successfully 🟢',
    order: order,
  });
});

// All routes must be protected by an authentication method.
// For the POST / endpoint, the following should be done:
// Search if the meal exists, if not, send an error.
// Calculate the price for the user by multiplying the price of the found meal by the quantity requested by the user.
// Create a new order, passing the calculated price, the mealId of the previously found meal, and the quantity requested by the user.
