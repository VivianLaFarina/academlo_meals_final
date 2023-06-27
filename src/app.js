const express = require('express');
const cors = require('cors');

// import routes
const mealRouter = require('./routes/meals.routes');
const orderRouter = require('./routes/orders.routes');
const restaurantRouter = require('./routes/restaurants.routes');
const reviewsRouter = require('./routes/reviews.routes');
const userRouter = require('./routes/users.routes');

const app = express();

app.use(express.json());
app.use(cors());

// routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewsRouter);

module.exports = app;
