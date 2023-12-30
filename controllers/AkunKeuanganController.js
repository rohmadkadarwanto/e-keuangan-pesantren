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
const database_1 = __importDefault(require("../config/database"));
const AkunKeuangan_1 = __importDefault(require("../models/AkunKeuangan"));
const TransaksiDetail_1 = __importDefault(require("../models/TransaksiDetail"));
function getDetailSaldoAkun(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const DetailSaldoAkun = yield AkunKeuangan_1.default.findOne({
                attributes: [
                    'tipe_transaksi',
                    [
                        database_1.default.literal('AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'saldo',
                    ],
                ],
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [],
                        required: false,
                    },
                ],
                where: {
                    kode_akun: req.params.kodeAkun,
                },
                group: ['AkunKeuangan.kode_akun', 'AkunKeuangan.nama_akun', 'AkunKeuangan.tipe_transaksi', 'AkunKeuangan.saldo_awal'],
            });
            res.status(200).json(DetailSaldoAkun);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function createAkunKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, kode_entitas, nama_akun, saldo_awal, tipe_transaksi } = req.body;
            const akunKeuangan = yield AkunKeuangan_1.default.create({
                kode_akun,
                kode_entitas,
                nama_akun,
                saldo_awal,
                tipe_transaksi,
            });
            res.status(201).json(akunKeuangan);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAkunKeuanganList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const DetailSaldoAkun = yield AkunKeuangan_1.default.findAll({
                attributes: [
                    'id_akun',
                    'kode_akun',
                    'nama_akun',
                    'kode_entitas',
                    'saldo_awal',
                    'tipe_transaksi',
                    [
                        database_1.default.literal('AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'saldo',
                    ],
                ],
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [
                            'kode_jenis_transaksi',
                            'tanggal_transaksi'
                        ],
                        required: false,
                    },
                ],
                group: ['AkunKeuangan.kode_akun', 'AkunKeuangan.nama_akun', 'AkunKeuangan.tipe_transaksi', 'AkunKeuangan.saldo_awal'],
            });
            res.status(200).json(DetailSaldoAkun);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAkunKeuanganById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const akunKeuangan = yield AkunKeuangan_1.default.findByPk(req.params.id);
            res.status(200).json(akunKeuangan);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAkunKeuanganByAkun(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const DetailSaldoAkun = yield AkunKeuangan_1.default.findOne({
                attributes: [
                    'id_akun',
                    'kode_akun',
                    'nama_akun',
                    'kode_entitas',
                    'saldo_awal',
                    'tipe_transaksi',
                    [
                        database_1.default.literal('AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'saldo',
                    ],
                ],
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [],
                        required: false,
                    },
                ],
                where: {
                    kode_akun: req.params.kodeAkun,
                },
                group: ['AkunKeuangan.kode_akun', 'AkunKeuangan.nama_akun', 'AkunKeuangan.tipe_transaksi', 'AkunKeuangan.saldo_awal'],
            });
            res.status(200).json(DetailSaldoAkun);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAkunKeuanganByEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const akunKeuangan = yield AkunKeuangan_1.default.findAll({
                where: {
                    kode_entitas: req.params.kodeEntitas,
                },
            });
            res.status(200).json(akunKeuangan);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateAkunKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, nama_akun, saldo_awal, tipe_transaksi } = req.body;
            const akunKeuangan = yield AkunKeuangan_1.default.findByPk(req.params.id);
            if (akunKeuangan) {
                yield akunKeuangan.update({
                    kode_entitas,
                    nama_akun,
                    saldo_awal,
                    tipe_transaksi,
                });
                res.status(200).json(akunKeuangan);
            }
            else {
                res.status(404).json({ error: 'Financial account not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteAkunKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const akunKeuangan = yield AkunKeuangan_1.default.findByPk(req.params.id);
            if (akunKeuangan) {
                yield akunKeuangan.destroy();
                res.status(200).json({ message: 'Success' });
            }
            else {
                res.status(404).json({ error: 'Financial account not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    getDetailSaldoAkun,
    createAkunKeuangan,
    getAkunKeuanganList,
    getAkunKeuanganById,
    getAkunKeuanganByAkun,
    getAkunKeuanganByEntitas,
    updateAkunKeuangan,
    deleteAkunKeuangan,
};
