"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Entitas.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Entitas extends sequelize_1.Model {
}
Entitas.init({
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    nama_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    telp_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    alamat_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    email_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    tanggal_masuk_entitas: {
        type: sequelize_1.DataTypes.DATE,
    },
    informasi_tambahan_entitas: {
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
