"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/JenisTransaksi.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class JenisTransaksi extends sequelize_1.Model {
}
JenisTransaksi.init({
    id_jenis_transaksi: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    nama_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'jenis_transaksi',
    freezeTableName: true,
    timestamps: false,
});
exports.default = JenisTransaksi;
