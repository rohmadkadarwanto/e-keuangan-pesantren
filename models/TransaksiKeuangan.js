"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/TransaksiKeuangan.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const TransaksiDetail_1 = __importDefault(require("./TransaksiDetail"));
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
    sequelize: database_1.default,
    modelName: 'TransaksiKeuangan',
    tableName: 'transaksi_keuangan',
    freezeTableName: true,
    timestamps: false,
});
TransaksiKeuangan.hasMany(TransaksiDetail_1.default, {
    foreignKey: 'kode_transaksi',
    sourceKey: 'kode_transaksi',
});
exports.default = TransaksiKeuangan;
