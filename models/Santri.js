"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Santri.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Santri extends sequelize_1.Model {
}
Santri.init({
    nis: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    nama_santri: {
        type: sequelize_1.DataTypes.STRING,
    },
    tanggal_masuk: {
        type: sequelize_1.DataTypes.DATE,
    },
    informasi_tambahan_santri: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'santri',
    freezeTableName: true,
    timestamps: false,
});
exports.default = Santri;
