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
const Entitas_1 = __importDefault(require("../models/Entitas"));
const TransaksiDetail_1 = __importDefault(require("../models/TransaksiDetail"));
const TransaksiKeuangan_1 = __importDefault(require("../models/TransaksiKeuangan"));
const AkunKeuangan_1 = __importDefault(require("../models/AkunKeuangan"));
function createEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nama_entitas, tipe_entitas, telp_entitas, alamat_entitas, email_entitas, informasi_tambahan_entitas, nama_akun, saldo_awal } = req.body;
            // Mendapatkan timestamp dari saat ini (dalam bentuk string)
            const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
            // Menggunakan timestamp untuk membuat angka acak
            const randomNumber = Math.floor(Math.random() * 100000000); // Ubah sesuai kebutuhan
            // Menggabungkan timestamp dan angka acak untuk membentuk nomor rekening
            const accountNumber = timestamp + randomNumber;
            // Mengacak angka dengan mengambil 12 digit pertama
            const shuffledDigits = accountNumber.slice(0, 13).split('').sort(() => Math.random() - 0.5).join('');
            // Menambahkan angka tertentu setelah pengacakan digit
            const kodeAkunKredit = parseInt(shuffledDigits) + '381';
            const kodeAkunDebit = parseInt(shuffledDigits) + '382';
            const kode_entitas = timestamp;
            // Check uniqueness before creating an entity
            yield Entitas_1.default.validateUniqueness(telp_entitas, email_entitas);
            try {
                const entitas = yield Entitas_1.default.create({
                    kode_entitas,
                    nama_entitas,
                    tipe_entitas,
                    telp_entitas,
                    alamat_entitas,
                    email_entitas,
                    informasi_tambahan_entitas,
                    tanggal_masuk_entitas: new Date(),
                });
                const AkunKeuanganDebit = yield AkunKeuangan_1.default.create({
                    kode_akun: kodeAkunDebit,
                    kode_entitas,
                    nama_akun,
                    saldo_awal,
                    tipe_transaksi: 'debit',
                });
                const AkunKeuanganKredit = yield AkunKeuangan_1.default.create({
                    kode_akun: kodeAkunKredit,
                    kode_entitas,
                    nama_akun,
                    saldo_awal: '0',
                    tipe_transaksi: 'kredit',
                });
                return res.status(201).json({ success: true, message: 'Entitas dan Akun Keuangan berhasil dibuat.' });
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Terjadi kesalahan dalam proses pembuatan entitas dan akun keuangan.' });
            }
            //return res.status(201).json(entitas);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getEntitasById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitas = yield Entitas_1.default.findByPk(req.params.id);
            const DetailSaldoAkun = yield AkunKeuangan_1.default.findAll({
                attributes: [
                    'tipe_transaksi',
                    'saldo_awal',
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
                group: ['AkunKeuangan.kode_entitas', 'AkunKeuangan.kode_akun'],
            });
            const transaksiKeuanganDebit = yield TransaksiKeuangan_1.default.findAll({
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        //attributes: [],
                        required: true,
                        where: {
                            tipe_transaksi: 'debit'
                        }
                    },
                ],
                where: {
                    kode_entitas: req.params.id
                }
            });
            const transaksiKeuanganKredit = yield TransaksiKeuangan_1.default.findAll({
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        required: true,
                        where: {
                            tipe_transaksi: 'kredit'
                        }
                    },
                ],
                where: {
                    kode_entitas: req.params.id
                }
            });
            const saldoDebitKredit = yield TransaksiKeuangan_1.default.findAll({
                attributes: [
                    'TransaksiDetails.tipe_transaksi',
                    [
                        database_1.default.literal('COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'kredit',
                    ],
                    [
                        database_1.default.literal('COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)'),
                        'debit',
                    ],
                ],
                include: [
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [],
                        required: true,
                    },
                ],
                where: {
                    kode_entitas: req.params.id
                },
                group: [
                    'TransaksiDetails.kode_transaksi'
                ],
            });
            const saldoSetelahPenyesuaian = yield AkunKeuangan_1.default.findAll({
                attributes: [
                    'kode_akun',
                    'nama_akun',
                    'tipe_transaksi',
                    /*[
                      sequelize.literal(`AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = 'kredit' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = 'debit' THEN TransaksiDetails.jumlah ELSE 0 END), 0)`),
                      'saldo',
                    ],*/
                    [
                        database_1.default.literal('CASE WHEN AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) >= 0 THEN AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) ELSE 0 END'),
                        'kredit',
                    ],
                    [
                        database_1.default.literal('CASE WHEN AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) < 0 THEN ABS(AkunKeuangan.saldo_awal + COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'kredit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN TransaksiDetails.tipe_transaksi = \'debit\' THEN TransaksiDetails.jumlah ELSE 0 END), 0)) ELSE 0 END'),
                        'debit',
                    ],
                ],
                include: [
                    {
                        model: Entitas_1.default,
                        attributes: [],
                        where: { kode_entitas: req.params.id },
                    },
                    {
                        model: TransaksiDetail_1.default,
                        attributes: [],
                        required: false, // LEFT JOIN
                    },
                ],
                group: ['AkunKeuangan.tipe_transaksi'],
            });
            // Calculate total kredit and debit
            const totalKredit = saldoDebitKredit.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('kredit') || 0), 0);
            const totalDebit = saldoDebitKredit.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('debit') || 0), 0);
            const saldoAwal = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('saldo_awal') || 0), 0);
            return res.status(200).json({
                saldoSetelahPenyesuaian,
                entitas,
                saldoAwal,
                totalKredit,
                totalDebit,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function updateEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nama_entitas, tipe_entitas, telp_entitas, alamat_entitas, email_entitas, informasi_tambahan_entitas, nama_akun, saldo_awal } = req.body;
            // Check uniqueness before creating an entity
            yield Entitas_1.default.validateUniqueness(telp_entitas, email_entitas);
            try {
                const entitas = yield Entitas_1.default.findByPk(req.params.id);
                const akunKeuanganDebit = yield AkunKeuangan_1.default.findOne({
                    where: {
                        kode_entitas: req.params.id,
                        tipe_transaksi: 'debit',
                    },
                });
                const akunKeuanganKredit = yield AkunKeuangan_1.default.findOne({
                    where: {
                        kode_entitas: req.params.id,
                        tipe_transaksi: 'kredit',
                    },
                });
                if (entitas) {
                    yield entitas.update({
                        nama_entitas,
                        tipe_entitas,
                        telp_entitas,
                        alamat_entitas,
                        email_entitas,
                        informasi_tambahan_entitas
                    });
                    if (akunKeuanganDebit) {
                        yield akunKeuanganDebit.update({
                            nama_akun,
                            saldo_awal
                        });
                    }
                    if (akunKeuanganKredit) {
                        yield akunKeuanganKredit.update({
                            nama_akun,
                            saldo_awal
                        });
                    }
                }
                return res.status(201).json({ success: true, message: 'Entitas dan Akun Keuangan berhasil diedit.' });
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Terjadi kesalahan dalam proses perubahan entitas dan akun keuangan.' });
            }
            //return res.status(201).json(entitas);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function deleteEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitasId = req.params.id;
            const entitas = yield Entitas_1.default.findByPk(entitasId);
            if (!entitas) {
                return res.status(404).json({ error: 'Entity not found' });
            }
            // Simpan data transaksi detail ke dalam array untuk proses batch
            const transaksiKeuangan = yield TransaksiKeuangan_1.default.findAll({ where: { kode_entitas: entitasId } });
            for (const data of transaksiKeuangan) {
                yield TransaksiDetail_1.default.destroy({ where: { kode_transaksi: data.kode_transaksi } });
            }
            yield TransaksiKeuangan_1.default.destroy({ where: { kode_entitas: entitasId } });
            // Delete associated AkunKeuangan records in bulk
            yield AkunKeuangan_1.default.destroy({ where: { kode_entitas: entitasId } });
            yield entitas.destroy();
            return res.status(200).json({ message: 'Entity deleted successfully' });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getEntitasList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitasList = yield Entitas_1.default.findAll();
            return res.status(200).json(entitasList);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createEntitas,
    getEntitasList,
    getEntitasById,
    updateEntitas,
    deleteEntitas,
};
