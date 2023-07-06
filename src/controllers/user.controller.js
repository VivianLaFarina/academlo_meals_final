const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generatejwt = require('../utils/jwt');

//1 Create user (send name, email, and password through req.body) (optional role)v
exports.signup = catchAsync(async (req, res, next) => {
  // Extract user details from request body (name, email, password, and role)
  const { name, email, password, role } = req.body;

  // Check if the user already exists based on the provided email
  const userExists = await User.findOne({ where: { email: email } });
  if (userExists) {
    return next(
      new AppError(
        `This email already exists: ${email}. Please try another email. 🕵🏻‍♀️`,
        400
      )
    );
  }

  // Check if the role is valid
  if (role !== 'normal' && role !== 'admin') {
    return next(new AppError(`The role ${role} does not exist. 🚫`, 400));
  }

  // Encrypt the user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user in the database
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully. 🟢',
    data: {
      user,
    },
  });
});

//2 Log in (send email and password through req.body)
exports.login = catchAsync(async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Find the user based on the provided email
  const user = await User.findOne({ where: { email: email } });

  // Check if the user exists
  if (!user) {
    return next(new AppError('The user does not exist. 🚫 ', 400));
  }

  // Validate the provided password against the stored hashed password
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid password. 👮🏿', 401));
  }

  // Generate a JWT token for authentication
  const token = await generatejwt(user.id);

  // Send the user information and token in the response
  res.status(200).json({
    status: 'success',
    message: 'Login successful. ✅',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      role: user.role,
    },
  });
});

//3 Update user profile (only name and email)

exports.updateUser = catchAsync(async (req, res, next) => {
  // Get the ID of the user to be updated
  const { id } = req.params;

  // Update user profile (name and email)
  const { name, email } = req.body;

  const updateUser = await User.findOne({
    where: {
      id,
    },
  });

  if (!updateUser)
    next(new AppError('The user you want to update does not exist 🚫', 400));

  try {
    const user = await updateUser.update({
      name: name,
      email: email,
    });

    res.status(200).json({
      status: 'success',
      message: `Your profile has been updated successfully ✅. Your new email: 👉 ${user.email} `,
      data: {
        User: user.id,
        Name: user.name,
        Email: user.email,
        Status: user.status,
        Role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 400)
      next(new AppError('The email you are using is already in use 👮🏿'));
    else next(new AppError('Error updating the user 🔴😕', 500));
  }
});

//4 Disable user account
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return next(
      new AppError('The user you want to delete does not exist 🚫', 400)
    );
  }

  await user.destroy();

  res.status(200).json({
    status: 'success',
    message: 'User account disabled successfully 💀',
    data: null,
  });
});

//5 /orders Get all orders made by the user
exports.getAllOrders = catchAsync(async (req, res, next) => {
  // Obtain the user ID from the request
  const userId = req.user.id;

  // Find all orders made by the user
  const orders = await Order.findAll({ where: { userId } });

  res.status(200).json({
    status: 'success',
    message: 'All orders retrieved successfully.✅',
    data: {
      orders,
    },
  });
});

//6 /orders/:id Get details of a single order given an ID

//6 /orders/:id Get details of a single order given an ID
exports.getOrderById = catchAsync(async (req, res, next) => {
  // Obtain the order ID from the request parameters
  const orderId = req.params.id;

  // Find the order by its ID
  const order = await Order.findOne({ where: { id: orderId } });

  if (!order) {
    return next(
      new AppError('The order with the provided ID does not exist. 🚫', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Order details retrieved successfully. ✅',
    data: {
      order,
    },
  });
});
