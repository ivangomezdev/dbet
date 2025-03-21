// lib/models/user.js
import {  DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subscriptionStatus: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    defaultValue: 'inactive',
  },
});

export { User };