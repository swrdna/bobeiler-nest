import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database.config';
import { DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource(
  databaseConfig as DataSourceOptions,
);
