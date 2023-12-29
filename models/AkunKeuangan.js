"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/AkunKeuangan.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class AkunKeuangan extends sequelize_1.Model {
    // Define associations
    static associate(models) {
        AkunKeuangan.hasMany(models.TransaksiDetail, {
            foreignKey: 'kode_akun',
            as: 'transaksi_details',
        });
    }
}
AkunKeuangan.init({
    /*id_akun: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },*/
    kode_akun: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    nama_akun: {
        type: sequelize_1.DataTypes.STRING,
    },
    saldo_awal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'akun_keuangan',
    freezeTableName: true,
    timestamps: false,
});
exports.default = AkunKeuangan;
