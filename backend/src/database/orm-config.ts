import { mysqlConfig } from './mysql-config';
import { DataSourceOptions } from 'typeorm';

export const ormconfig: DataSourceOptions = {
  ...mysqlConfig,
  type: 'mysql',
  synchronize: false,
  logging: false,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/*{.ts,.js}'],
};