
import pg from 'pg';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgresql://dbet_owner:npg_lmIDjFb4vLO2@ep-lively-leaf-a8m9uunu-pooler.eastus2.azure.neon.tech/dbet?sslmode=require', {
  dialect: 'postgres',
  dialectModule: pg
});