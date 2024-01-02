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
function createTransaksiKeuanganSinggle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, jumlah, kode_transaksi, kode_entitas, kode_jenis_transaksi, tanggal_transaksi, keterangan, tipe_transaksi } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.create({
                kode_transaksi,
                kode_entitas,
                kode_jenis_transaksi,
                tanggal_transaksi,
                keterangan,
            });
            try {
                // Simpan data transaksi detail ke dalam array untuk proses batch
                const transaksiDetailData = [];
                // Iterasi akun untuk membuat transaksi detail
                const akunKeuangan = yield AkunKeuangan_1.default.findAll({
                    where: {
                        kode_entitas: kode_entitas,
                    },
                });
                const detailDebit = {
                    kode_transaksi,
                    kode_akun: kode_akun,
                    kode_jenis_transaksi,
                    tipe_transaksi: tipe_transaksi,
                    jumlah,
                    tanggal_transaksi,
                };
                // Batch insert transaksi detail
                yield TransaksiDetail_1.default.create(detailDebit);
                for (const data of akunKeuangan) {
                    /*let tipe = tipe_transaksi || data.tipe_transaksi;
                    let kredit = 'kredit';
                    let debit = 'debit';
            
                    // Jika tipe transaksi adalah 'kredit' dan tipe_transaksi juga 'kredit'
                    if (data.tipe_transaksi === 'kredit' && tipe_transaksi === 'kredit') {
                      // Ubah tipe menjadi 'debit'
                      tipe = 'debit';
                    }
            
            
                    if (tipe_transaksi === 'kredit') {
                      kredit = 'debit';
                      debit = 'kredit';
                    }
            
            
                    if (data.tipe_transaksi === 'kredit') {
            
                    const detailKredit = {
                      kode_transaksi,
                      kode_akun: data.kode_akun,
                      kode_jenis_transaksi,
                      tipe_transaksi: kredit,
                      jumlah,
                      tanggal_transaksi,
                    };
            
                    await TransaksiDetail.create(detailKredit);
            
                    } else {
                    const detailDebit = {
                      kode_transaksi,
                      kode_akun: data.kode_akun,
                      kode_jenis_transaksi,
                      tipe_transaksi: debit,
                      jumlah,
                      tanggal_transaksi,
                    };
                    // Batch insert transaksi detail
                    await TransaksiDetail.create(detailDebit);
            
                    }*/
                }
                res.status(201).json(transaksiKeuangan);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function createTransaksiKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, jumlah, kode_transaksi, kode_entitas, kode_jenis_transaksi, tanggal_transaksi, keterangan, tipe_transaksi } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.create({
                kode_transaksi,
                kode_entitas,
                kode_jenis_transaksi,
                tanggal_transaksi,
                keterangan,
            });
            try {
                // Simpan data transaksi detail ke dalam array untuk proses batch
                const transaksiDetailData = [];
                // Iterasi akun untuk membuat transaksi detail
                const akunKeuangan = yield AkunKeuangan_1.default.findAll({
                    where: {
                        kode_entitas: kode_entitas,
                    },
                });
                for (const data of akunKeuangan) {
                    let tipe = tipe_transaksi || data.tipe_transaksi;
                    let kredit = 'kredit';
                    let debit = 'debit';
                    // Jika tipe transaksi adalah 'kredit' dan tipe_transaksi juga 'kredit'
                    if (data.tipe_transaksi === 'kredit' && tipe_transaksi === 'kredit') {
                        // Ubah tipe menjadi 'debit'
                        tipe = 'debit';
                    }
                    if (tipe_transaksi === 'kredit') {
                        kredit = 'debit';
                        debit = 'kredit';
                    }
                    if (data.tipe_transaksi === 'kredit') {
                        const detailKredit = {
                            kode_transaksi,
                            kode_akun: data.kode_akun,
                            kode_jenis_transaksi,
                            tipe_transaksi: kredit,
                            jumlah,
                            tanggal_transaksi,
                        };
                        yield TransaksiDetail_1.default.create(detailKredit);
                    }
                    else {
                        const detailDebit = {
                            kode_transaksi,
                            kode_akun: data.kode_akun,
                            kode_jenis_transaksi,
                            tipe_transaksi: debit,
                            jumlah,
                            tanggal_transaksi,
                        };
                        // Batch insert transaksi detail
                        yield TransaksiDetail_1.default.create(detailDebit);
                    }
                }
                res.status(201).json(transaksiKeuangan);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function createTransaksiKeuanganOld(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, jumlah, kode_transaksi, kode_entitas, kode_jenis_transaksi, tanggal_transaksi, keterangan, tipe_transaksi } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.create({
                kode_transaksi,
                kode_entitas,
                kode_jenis_transaksi,
                tanggal_transaksi,
                keterangan,
            });
            try {
                // Simpan data transaksi detail ke dalam array untuk proses batch
                const transaksiDetailData = [];
                // Iterasi akun untuk membuat transaksi detail
                const akunKeuangan = yield AkunKeuangan_1.default.findAll({
                    where: {
                        kode_akun: kode_akun,
                    },
                });
                for (const data of akunKeuangan) {
                    let tipe = tipe_transaksi || data.tipe_transaksi;
                    let kredit = 'kredit';
                    let debit = 'debit';
                    /*if (tipe_transaksi === 'kredit' && data.tipe_transaksi === 'kredit') {
                      kredit = 'debit';
                      debit = 'kredit';
                    }*/
                }
                const detailKredit = {
                    kode_transaksi,
                    kode_akun: kode_akun,
                    kode_jenis_transaksi,
                    tipe_transaksi: 'kredit',
                    jumlah,
                    tanggal_transaksi,
                };
                yield TransaksiDetail_1.default.create(detailKredit);
                const detailDebit = {
                    kode_transaksi,
                    kode_akun: kode_akun,
                    kode_jenis_transaksi,
                    tipe_transaksi: 'debit',
                    jumlah,
                    tanggal_transaksi,
                };
                // Batch insert transaksi detail
                yield TransaksiDetail_1.default.create(detailDebit);
                res.status(201).json(transaksiKeuangan);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getTransaksiKeuanganList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiKeuanganList = yield TransaksiKeuangan_1.default.findAll();
            res.status(200).json(transaksiKeuanganList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
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
            res.status(200).json(transaksiKeuangan);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
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
            res.status(200).json(transaksiKeuangan);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
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
                res.status(200).json(transaksiKeuangan);
            }
            else {
                res.status(404).json({ error: 'Financial transaction not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteTransaksiKeuangan(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.findByPk(req.params.id);
            if (transaksiKeuangan) {
                yield transaksiKeuangan.destroy();
                res.status(200).json({ message: 'Financial transaction deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Financial transaction not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createTransaksiKeuangan,
    getTransaksiKeuanganList,
    getTransaksiKeuanganById,
    updateTransaksiKeuangan,
    deleteTransaksiKeuangan,
    getTransaksiKeuanganByAkun,
};
