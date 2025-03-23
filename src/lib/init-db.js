// src/lib/init-db.js
import { sequelize } from './db.js';

export async function initDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Database connected and synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}