// models/user.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";
import crypto from "crypto";

interface UserAttributes {
  id: number;
  email: string;
  password: string | null;
  subscriptionStatus: "FREE" | "MONTHLY" | "YEAR" | "inactive";
  name: string | null;
  surname: string | null;
  phone: string | null;
  address: string | null;
  referral_code: string | null;
  has_used_referral: boolean;
  referred_by: number | null;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string | null;
  public subscriptionStatus!: "FREE" | "MONTHLY" | "YEAR" | "inactive";
  public name!: string | null;
  public surname!: string | null;
  public phone!: string | null;
  public address!: string | null;
  public referral_code!: string | null;
  public has_used_referral!: boolean;
  public referred_by!: number | null;
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
    referral_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    has_used_referral: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    referred_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: (user: User) => {
        if (!user.referral_code) {
          user.referral_code = crypto.randomBytes(4).toString("hex").toUpperCase(); // 8 caracteres
        }
      },
    },
  }
);

export default User;
