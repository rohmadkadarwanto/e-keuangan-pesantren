"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Entitas.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Entitas extends sequelize_1.Model {
}
_a = Entitas;
// Declare static method for validation
Entitas.validateUniqueness = (telp_entitas, email_entitas, currentEntityId) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = { [sequelize_1.Op.not]: {} };
    if (currentEntityId) {
        whereClause[sequelize_1.Op.not] = { kode_entitas: currentEntityId };
    }
    const existingTelp = yield Entitas.findOne({
        where: Object.assign({ telp_entitas }, whereClause),
    });
    if (existingTelp) {
        throw new Error('Phone number must be unique.');
    }
    const existingEmail = yield Entitas.findOne({
        where: Object.assign({ email_entitas }, whereClause),
    });
    if (existingEmail) {
        throw new Error('Email must be unique.');
    }
});
Entitas.init({
    kode_entitas: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nama_entitas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    telp_entitas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^\+[0-9]{1,15}$/, // Example: +123456789012345
        }
    },
    alamat_entitas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email_entitas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    tanggal_masuk_entitas: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    informasi_tambahan_entitas: {
        type: sequelize_1.DataTypes.STRING,
    },
    tipe_entitas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'entitas',
    freezeTableName: true,
    timestamps: false,
});
exports.default = Entitas;
