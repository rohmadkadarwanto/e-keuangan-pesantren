"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/TransaksiKeuangan.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class TransaksiKeuangan extends sequelize_1.Model {
}
TransaksiKeuangan.init({
    id_transaksi: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_transaksi: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    kode_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    },
    tanggal_transaksi: {
        type: sequelize_1.DataTypes.DATE,
    },
    keterangan: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'transaksi_keuangan',
    freezeTableName: true,
    timestamps: false,
});
exports.default = TransaksiKeuangan;
