"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.dataSourceOptions = {
    type: 'mysql',
    host: `${process.env.MYSQL_HOST}`,
    port: 3306,
    username: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DB}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    migrations: ['dist/db/migrations/**/*{.ts,.js}'],
};
//# sourceMappingURL=data-source.js.map