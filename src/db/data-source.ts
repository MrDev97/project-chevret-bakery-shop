import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: any = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DB}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
};
