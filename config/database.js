"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/database.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: '103.210.69.93',
    port: 3306,
    username: 'root',
    password: 'Delta@1988dsn',
    database: 'e_pesantren_transaksi',
    logging: false, // Enable logging
});
// Test the database connection
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection to the database has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
