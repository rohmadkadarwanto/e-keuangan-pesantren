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
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    kode_transaksi: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    kode_akun: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    kode_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    jumlah: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0,
        },
    },
    tanggal_transaksi: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    modelName: 'TransaksiDetails',
    tableName: 'transaksi_detail',
    freezeTableName: true,
    sequelize: database_1.default,
    timestamps: false, // Exclude timestamps
});
exports.default = TransaksiDetail;
