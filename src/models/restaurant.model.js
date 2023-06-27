const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Restaurant = db.define('restaurants', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Restaurant;
