// src/models/subscription.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";
import { User } from "./user";

export class Subscription extends Model {}

Subscription.init(
  {
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
  },
  { sequelize, modelName: "Subscription" }
);


// Relaciones
User.hasMany(Subscription);
Subscription.belongsTo(User);