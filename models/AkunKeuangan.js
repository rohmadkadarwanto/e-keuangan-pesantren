"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/AkunKeuangan.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const TransaksiDetail_1 = __importDefault(require("./TransaksiDetail"));
const Entitas_1 = __importDefault(require("./Entitas"));
class AkunKeuangan extends sequelize_1.Model {
}
AkunKeuangan.init({
    kode_akun: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        primaryKey: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    nama_akun: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    saldo_awal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0,
        },
    },
    tipe_transaksi: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [['debit', 'kredit']],
        },
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
// Hubungan antara Entitas dan AkunKeuangan
Entitas_1.default.hasMany(AkunKeuangan, {
    foreignKey: 'kode_entitas',
});
AkunKeuangan.belongsTo(Entitas_1.default, {
    foreignKey: 'kode_entitas',
});
exports.default = AkunKeuangan;
