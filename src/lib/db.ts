// lib/db.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_db',
});

module.exports = {
  sequelize,
  User: require('./models/user'),
  Subscription: require('./models/subscription'),
};