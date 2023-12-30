"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/WaliSantri.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class WaliSantri extends sequelize_1.Model {
}
WaliSantri.init({
    nis: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    nama_wali_santri: {
        type: sequelize_1.DataTypes.STRING,
    },
    informasi_tambahan_wali_santri: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.default,
    modelName: 'wali_santri',
    freezeTableName: true,
    timestamps: false,
});
exports.default = WaliSantri;
