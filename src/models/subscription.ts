// lib/models/subscription.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';
import { User } from './user.js';

const Subscription = sequelize.define('Subscription', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  plan: {
    type: DataTypes.ENUM('basic', 'premium', 'pro'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'cancelled'),
    defaultValue: 'active',
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
  },
});

// Relaciones
User.hasMany(Subscription);
Subscription.belongsTo(User);

export { Subscription };