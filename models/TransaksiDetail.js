"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/TransaksiDetail.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const JenisTransaksi_1 = __importDefault(require("./JenisTransaksi"));
class TransaksiDetail extends sequelize_1.Model {
    static associate(models) {
        TransaksiDetail.belongsTo(models.AkunKeuangan, {
            foreignKey: 'kode_akun',
            as: 'akun_keuangan',
        });
    }
}
TransaksiDetail.init({
    id_transaksi_detail: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    kode_transaksi_detail: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    kode_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    },
    kode_akun: {
        type: sequelize_1.DataTypes.STRING,
    },
    kode_jenis_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING,
    },
    jumlah: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    tanggal_transaksi: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'transaksi_detail',
    freezeTableName: true,
    timestamps: false,
});
// Define associations after model initialization
TransaksiDetail.belongsTo(JenisTransaksi_1.default, { foreignKey: 'kode_jenis_transaksi', as: 'JenisTransaksi' });
exports.default = TransaksiDetail;
