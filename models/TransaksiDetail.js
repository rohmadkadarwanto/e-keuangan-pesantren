"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/TransaksiDetail.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TransaksiDetail extends sequelize_1.Model {
}
TransaksiDetail.init({
    id_transaksi_detail: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_transaksi_detail: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
    },
    kode_transaksi: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    kode_akun: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    kode_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    jumlah: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    tanggal_transaksi: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: 'transaksi_detail',
    freezeTableName: true,
    sequelize: database_1.default,
    timestamps: false, // Exclude timestamps
});
exports.default = TransaksiDetail;
