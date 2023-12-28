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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const AkunKeuangan_1 = __importDefault(require("../models/AkunKeuangan"));
const TransaksiDetail_1 = __importDefault(require("../models/TransaksiDetail"));
function generateNeraca(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const akunList = yield AkunKeuangan_1.default.findAll({
                attributes: [
                    'kode_akun',
                    'nama_akun',
                    'saldo_awal',
                ],
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [
                            [
                                sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.literal("CASE WHEN `transaksi_detail`.`tipe_transaksi` = 'debit' THEN `transaksi_detail`.`jumlah` ELSE 0 END")),
                                'debit',
                            ],
                            [
                                sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.literal("CASE WHEN `transaksi_detail`.`tipe_transaksi` = 'kredit' THEN `transaksi_detail`.`jumlah` ELSE 0 END")),
                                'kredit',
                            ],
                        ],
                        where: {
                            kode_akun: sequelize_1.Sequelize.col('akun_keuangan.kode_akun'),
                        },
                        required: false,
                    },
                ],
                group: ['akun_keuangan.kode_akun', 'akun_keuangan.nama_akun', 'akun_keuangan.saldo_awal'],
                raw: true,
                nest: true,
            });
            // Transform Sequelize instances into the desired format
            const neraca = akunList.map((akunItem) => ({
                kode_akun: akunItem.kode_akun,
                nama_akun: akunItem.nama_akun,
                saldo_awal: akunItem.saldo_awal,
                debit: akunItem['transaksi_details.debit'] || 0,
                kredit: akunItem['transaksi_details.kredit'] || 0,
                saldo_akhir: akunItem.saldo_awal + (akunItem['transaksi_details.debit'] || 0) - (akunItem['transaksi_details.kredit'] || 0),
            }));
            res.status(200).json({ neraca });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    generateNeraca,
};
