import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: any = {
  type: 'mysql',
  host: `${process.env.MYSQL_REMOTE_HOST}`,
  port: 3306,
  username: `${process.env.MYSQL_REMOTE_USER}`,
  password: `${process.env.MYSQL_REMOTE_PASSWORD}`,
  database: `${process.env.MYSQL_REMOTE_DB}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
};
