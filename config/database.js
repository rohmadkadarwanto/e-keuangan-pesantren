"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: '0.0.0.0',
    port: 3306,
    username: 'root',
    password: 'Delta@1988dsn',
    database: 'e_pesantren_transaksi',
});
exports.sequelize = sequelize;
// Test the database connection
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection to the database has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
