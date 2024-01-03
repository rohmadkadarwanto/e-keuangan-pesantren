"use strict";
// src/controllers/TransaksiKeuanganController.ts
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
function createTransfer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun_asal, kode_akun_tujuan, jumlah, keterangan } = req.body;
            const accountAsal = yield AkunKeuangan_1.default.findOne({ where: { kode_akun: kode_akun_asal } });
            const accountTujuan = yield AkunKeuangan_1.default.findOne({ where: { kode_akun: kode_akun_tujuan } });
            if (!accountAsal || !accountTujuan) {
                return res.status(404).json({ error: 'Akun tidak ditemukan' });
            }
            if (accountAsal.saldo_awal < jumlah) {
                return res.status(400).json({ error: 'Saldo tidak mencukupi' });
            }
            const transactionData = {
                kode_transaksi: generateTransactionCode(),
                kode_akun_asal,
                kode_akun_tujuan,
                jumlah,
                tanggal_transaksi: new Date(),
                keterangan,
                tipe_transaksi: 'transfer',
            };
            const transaction = yield TransaksiKeuangan_1.default.create(transactionData);
            const detailAsal = {
                kode_transaksi: transaction.kode_transaksi,
                kode_akun: kode_akun_asal,
                tipe_transaksi: 'debit',
                jumlah,
                tanggal_transaksi: transaction.tanggal_transaksi,
            };
            const detailTujuan = {
                kode_transaksi: transaction.kode_transaksi,
                kode_akun: kode_akun_tujuan,
                tipe_transaksi: 'kredit',
                jumlah,
                tanggal_transaksi: transaction.tanggal_transaksi,
            };
            yield TransaksiDetail_1.default.bulkCreate([detailAsal, detailTujuan]);
            return res.status(201).json(transaction);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function createStorTunai(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, jumlah, keterangan } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.create({
                kode_transaksi: generateKodeTransaksi(),
                kode_entitas: 'kode_entitas_yang_sesuai',
                kode_jenis_transaksi: 'kode_jenis_transaksi_stor_tunai',
                tanggal_transaksi: new Date(),
                keterangan,
            });
            const akunKeuangan = yield AkunKeuangan_1.default.findOne({
                where: {
                    kode_akun,
                    tipe_transaksi: 'debit', // Sesuaikan dengan logika bisnis Anda
                },
            });
            if (akunKeuangan) {
                const detailDebit = {
                    kode_transaksi: transaksiKeuangan.kode_transaksi,
                    kode_transaksi_detail: generateKodeTransaksiDetail(),
                    kode_akun: akunKeuangan.kode_akun,
                    tipe_transaksi: 'debit',
                    jumlah,
                    tanggal_transaksi: new Date(),
                };
                yield TransaksiDetail_1.default.create(detailDebit);
                // Update saldo_akun di AkunKeuangan
                yield akunKeuangan.update({
                    saldo_awal: akunKeuangan.saldo_awal + jumlah,
                });
                return res.status(201).json(transaksiKeuangan);
            }
            else {
                return res.status(404).json({ error: 'Account not found' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function createTarikTunai(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun, jumlah, keterangan } = req.body;
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.create({
                kode_transaksi: generateKodeTransaksi(),
                kode_entitas: 'kode_entitas_yang_sesuai',
                kode_jenis_transaksi: 'kode_jenis_transaksi_tarik_tunai',
                tanggal_transaksi: new Date(),
                keterangan,
            });
            const akunKeuangan = yield AkunKeuangan_1.default.findOne({
                where: {
                    kode_akun,
                    tipe_transaksi: 'kredit', // Sesuaikan dengan logika bisnis Anda
                },
            });
            if (akunKeuangan) {
                const detailKredit = {
                    kode_transaksi: transaksiKeuangan.kode_transaksi,
                    kode_transaksi_detail: generateKodeTransaksiDetail(),
                    kode_akun: akunKeuangan.kode_akun,
                    tipe_transaksi: 'kredit',
                    jumlah,
                    tanggal_transaksi: new Date(),
                };
                yield TransaksiDetail_1.default.create(detailKredit);
                // Update saldo_akun di AkunKeuangan
                yield akunKeuangan.update({
                    saldo_awal: akunKeuangan.saldo_awal - jumlah,
                });
                return res.status(201).json(transaksiKeuangan);
            }
            else {
                return res.status(404).json({ error: 'Account not found' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function checkBalance(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Keseimbangan Keseluruhan
            const totalBalance = yield TransaksiDetail_1.default.sum('jumlah');
            // Keseimbangan Per Entitas
            const entitasBalances = yield TransaksiDetail_1.default.findAll({
                attributes: [[database_1.default.fn('SUM', database_1.default.literal('jumlah')), 'total_balance']],
                group: [], // Kosongkan karena tidak ada kolom yang dikelompokkan
            });
            const balanceInfo = {
                total_balance: totalBalance || 0,
                entitas_balances: entitasBalances.map((entitasBalance) => ({
                    kode_entitas: entitasBalance.kode_entitas,
                    total_balance: entitasBalance.get('total_balance') || 0,
                })),
            };
            return res.status(200).json(balanceInfo);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getSaldo(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Saldo Keseluruhan
            const totalSaldo = (yield AkunKeuangan_1.default.sum('saldo_awal')) + (yield TransaksiDetail_1.default.sum('jumlah'));
            // Saldo Per Akun
            const akunSaldo = yield AkunKeuangan_1.default.findAll({
                attributes: ['kode_akun', 'nama_akun', 'saldo_awal', [database_1.default.fn('SUM', database_1.default.literal('TransaksiDetails.jumlah')), 'total_transaksi']],
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [],
                        required: false,
                        where: {
                            kode_akun: database_1.default.col('AkunKeuangan.kode_akun'),
                        },
                    },
                ],
                group: ['AkunKeuangan.kode_akun'],
            });
            const saldoInfo = {
                total_saldo: totalSaldo || 0,
                akun_saldo: akunSaldo.map((akun) => ({
                    kode_akun: akun.kode_akun,
                    nama_akun: akun.nama_akun,
                    saldo_awal: akun.saldo_awal,
                    total_transaksi: akun.get('total_transaksi') || 0,
                    saldo_akhir: akun.saldo_awal + (akun.get('total_transaksi') || 0),
                })),
            };
            return res.status(200).json(saldoInfo);
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
// Fungsi untuk menghasilkan kode transaksi unik
function generateKodeTransaksi() {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    return `TR${timestamp}`;
}
// Fungsi untuk menghasilkan kode transaksi detail unik
function generateKodeTransaksiDetail() {
    const timestamp = new Date().getTime().toString();
    return `TD${timestamp}`;
}
exports.default = {
    createTransfer,
    createTarikTunai,
    createStorTunai,
    checkBalance,
    getSaldo,
};
