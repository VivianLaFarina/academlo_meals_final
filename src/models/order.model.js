const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Order = db.define('orders', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('pending', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = Order;
