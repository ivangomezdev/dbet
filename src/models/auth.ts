import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";
import { User } from "./user";
export class Auth extends Model {}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    verificationCode: {
      type: DataTypes.INTEGER,
    },
    codeUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", 
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Auth" }
);

// Un usuario tiene una autenticación
User.hasOne(Auth, {
    foreignKey: "userId",
    as: "authData", // Alias para consultas
  });
  
  // La autenticación pertenece a un usuario
  Auth.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
