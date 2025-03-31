
import pg from 'pg';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgresql://neondb_owner:npg_UXvIbT7h2qcj@ep-green-water-a8w762fm-pooler.eastus2.azure.neon.tech/neondb?sslmode=require', {
  dialect: 'postgres',
  dialectModule: pg
});