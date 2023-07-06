const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const bcrypt = require('bcryptjs');

// Define the 'User' model
const User = db.define(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('normal', 'admin'),
      allowNull: true,
      defaultValue: 'normal',
    },
    status: {
      type: DataTypes.ENUM('active', 'disabled'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    hooks: {
      // Hook to hash the user's password before creating a new user
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      },
    },
  }
);

// Method for comparing passwords in login and register routes using bcrypt library
User.prototype.comparePasswords = function comparePasswords(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.get().password);
};

module.exports = User;
