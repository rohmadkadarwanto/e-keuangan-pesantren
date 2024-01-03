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
const TransaksiDetail_1 = __importDefault(require("../models/TransaksiDetail"));
const TransaksiKeuangan_1 = __importDefault(require("../models/TransaksiKeuangan"));
const AkunKeuangan_1 = __importDefault(require("../models/AkunKeuangan"));
function createTransaksiDetail(detailData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield TransaksiDetail_1.default.create(detailData);
        }
        catch (error) {
            throw new Error(`Error creating transaction detail: ${error.message}`);
        }
    });
}
function createTransaksiKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, jumlah, kode_transaksi, kode_entitas, kode_jenis_transaksi, tanggal_transaksi, keterangan } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.create({
                kode_transaksi,
                kode_entitas,
                kode_jenis_transaksi,
                tanggal_transaksi,
                keterangan,
            });
            const tipeTransaksi = yield AkunKeuangan_1.default.findAll({ where: { kode_akun } });
            // Simpan data transaksi detail ke dalam array untuk proses batch
            const akunKeuangan = yield AkunKeuangan_1.default.findAll({ where: { kode_entitas } });
            for (const data of akunKeuangan) {
                const tipe = data.tipe_transaksi;
                const kredit = tipeTransaksi[0].tipe_transaksi === 'kredit' ? 'debit' : 'kredit';
                //tipeTransaksi[0].tipe_transaksi
                const detailData = {
                    kode_transaksi,
                    kode_transaksi_detail: `TD${new Date().toISOString().replace(/[^0-9]/g, '')}`,
                    kode_akun: data.kode_akun,
                    kode_jenis_transaksi,
                    tipe_transaksi: tipe === 'debit' ? (kredit === 'debit' ? 'kredit' : 'debit') : (kredit === 'debit' ? 'debit' : 'kredit'),
                    jumlah,
                    tanggal_transaksi,
                };
                yield createTransaksiDetail(detailData);
            }
            return res.status(201).json(transaksiKeuangan);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getTransaksiKeuanganList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiKeuanganList = yield TransaksiKeuangan_1.default.findAll();
            return res.status(200).json(transaksiKeuanganList);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getTransaksiKeuanganById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.findByPk(req.params.id);
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
                    kode_entitas: req.params.id
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
            return res.status(200).json(transaksiKeuangan);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getTransaksiKeuanganByAkun(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.findAll({
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        where: {
                            kode_akun: req.params.kodeAkun,
                        },
                        required: false,
                    },
                ],
            });
            return res.status(200).json(transaksiKeuangan);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function updateTransaksiKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, kode_jenis_transaksi, tanggal_transaksi, keterangan } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.findByPk(req.params.id);
            if (transaksiKeuangan) {
                yield transaksiKeuangan.update({
                    kode_entitas,
                    kode_jenis_transaksi,
                    tanggal_transaksi,
                    keterangan,
                });
                return res.status(200).json(transaksiKeuangan);
            }
            else {
                return res.status(404).json({ error: 'Financial transaction not found' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function deleteTransaksiKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.findByPk(req.params.id);
            if (transaksiKeuangan) {
                yield transaksiKeuangan.destroy();
                return res.status(200).json({ message: 'Financial transaction deleted successfully' });
            }
            else {
                return res.status(404).json({ error: 'Financial transaction not found' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function generateTransactionCode() {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    const randomNumber = Math.floor(Math.random() * 100000000);
    return `TR${timestamp}${randomNumber}`;
}
exports.default = {
    createTransaksiKeuangan,
    getTransaksiKeuanganList,
    getTransaksiKeuanganById,
    updateTransaksiKeuangan,
    deleteTransaksiKeuangan,
    getTransaksiKeuanganByAkun,
};
