const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('perfect-express-sanitizer');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

// Import routers
const mealRouter = require('./routes/meals.routes');
const orderRouter = require('./routes/orders.routes');
const restaurantRouter = require('./routes/restaurants.routes');
const userRouter = require('./routes/users.routes');

const app = express();

// Set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 100, // Maximum number of requests allowed from a single IP within the specified window
  message: 'Too many requests from this IP, please try again in one hour',
});

// Middleware
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
