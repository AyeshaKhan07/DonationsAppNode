require('dotenv').config();
import { DataSource } from 'typeorm';
import { ormconfig } from './orm-config';

export const connectionSource = new DataSource(ormconfig);
