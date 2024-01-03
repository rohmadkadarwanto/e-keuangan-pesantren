"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/JenisTransaksi.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class JenisTransaksi extends sequelize_1.Model {
}
JenisTransaksi.init({
    /*id_jenis_transaksi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },*/
    kode_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    nama_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: database_1.default,
    modelName: 'jenis_transaksi',
    freezeTableName: true,
    timestamps: false,
});
exports.default = JenisTransaksi;
