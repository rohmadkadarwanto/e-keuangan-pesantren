"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Entitas.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Entitas extends sequelize_1.Model {
}
Entitas.init({
    id_entitas: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    nama_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipe_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'entitas',
    freezeTableName: true,
    timestamps: false,
});
exports.default = Entitas;
