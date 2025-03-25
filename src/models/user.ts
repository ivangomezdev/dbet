import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";

// Define la interfaz para las propiedades del modelo User
interface UserAttributes {
  id: number;
  email: string;
  password: string | null;
  subscriptionStatus: "FREE" | "MONTHLY" | "YEAR" | "inactive";
  name: string | null;
  surname: string | null;
  phone: string | null;
  address: string | null;
}

// Extiende la clase User con la interfaz
export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string | null;
  public subscriptionStatus!: "FREE" | "MONTHLY" | "YEAR" | "inactive";
  public name!: string | null;
  public surname!: string | null;
  public phone!: string | null;
  public address!: string | null;
}

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
      type: DataTypes.ENUM("MONTHLY", "FREE", "YEAR", "inactive"),
      defaultValue: "inactive",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "User" }
);

export default User;