
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";

export class User extends Model {}

User.init(
  {
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
  
} , { sequelize, modelName: "User" });