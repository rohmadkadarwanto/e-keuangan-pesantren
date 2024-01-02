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
function getDetailSaldoByEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const kode_entitas = req.params.kodeEntitas;
        const tipe_akun = req.params.tipeAkun || 'debit';
        try {
            const DetailSaldoAkun = yield AkunKeuangan_1.default.findAll({
                attributes: [
                    'tipe_transaksi',
                    'saldo_awal',
                    [
                        database_1.default.literal('COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'kredit',
                    ],
                    [
                        database_1.default.literal('COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'debit',
                    ],
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
                    kode_entitas: kode_entitas
                },
                group: ['AkunKeuangan.kode_entitas', 'AkunKeuangan.tipe_transaksi'],
            });
            // Calculate total kredit and debit
            const totalKredit = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('kredit') || 0), 0);
            const totalDebit = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('debit') || 0), 0);
            const saldoAwal = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('saldo_awal') || 0), 0);
            const totalSaldo = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('saldo') || 0), 0);
            // Mapping results to format the response
            const SaldoAkun = DetailSaldoAkun.map(result => ({
                tipe_transaksi: result.tipe_transaksi,
                saldo_awal: result.get('saldo_awal'),
                kredit: result.get('kredit'),
                debit: result.get('debit'),
                saldo: result.get('saldo'),
            }));
            res.status(200).json({ saldoAwal, totalSaldo, totalKredit, totalDebit });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
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
    getDetailSaldoByEntitas,
    updateAkunKeuangan,
    deleteAkunKeuangan,
};
