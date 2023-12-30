"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/AkunKeuangan.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const TransaksiDetail_1 = __importDefault(require("./TransaksiDetail"));
class AkunKeuangan extends sequelize_1.Model {
}
AkunKeuangan.init({
    id_akun: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_akun: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    nama_akun: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    saldo_awal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING(10),
    },
}, {
    sequelize: database_1.default,
    modelName: 'AkunKeuangan',
    tableName: 'akun_keuangan',
    freezeTableName: true,
    timestamps: false, // Exclude timestamps
});
AkunKeuangan.hasMany(TransaksiDetail_1.default, {
    foreignKey: 'kode_akun',
    sourceKey: 'kode_akun',
});
exports.default = AkunKeuangan;
