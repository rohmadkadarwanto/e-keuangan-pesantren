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
const sequelize_1 = require("sequelize");
function createEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nama_entitas, tipe_entitas, nama_akun, saldo_awal, tipe_transaksi } = req.body;
            const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
            const kode_akun = `${timestamp}`;
            const kode_entitas = `NSB${timestamp}`;
            const entitas = yield Entitas_1.default.create({
                kode_entitas,
                nama_entitas,
                tipe_entitas,
            });
            const akunKeuangan = yield AkunKeuangan_1.default.create({
                kode_akun,
                kode_entitas,
                nama_akun,
                saldo_awal,
                tipe_transaksi,
            });
            res.status(201).json(entitas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getEntitasList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitasList = yield Entitas_1.default.findAll();
            res.status(200).json(entitasList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
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
            const transaksiPenyesuaian = yield database_1.default.query(`
      SELECT
        nama_akun,
        CASE WHEN saldo >= 0 THEN saldo ELSE 0 END AS kredit,
        CASE WHEN saldo < 0 THEN ABS(saldo) ELSE 0 END AS debit,
        saldo
      FROM (
        SELECT
          e.kode_entitas,
          e.nama_entitas,
          a.kode_akun,
          a.nama_akun,
          a.saldo_awal + COALESCE(SUM(CASE WHEN td.tipe_transaksi = 'kredit' THEN td.jumlah ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN td.tipe_transaksi = 'debit' THEN td.jumlah ELSE 0 END), 0) AS saldo
        FROM
          entitas e
        JOIN
          akun_keuangan a ON e.kode_entitas = a.kode_entitas
        LEFT JOIN
          transaksi_detail td ON a.kode_akun = td.kode_akun
        WHERE
          e.kode_entitas = :id
        GROUP BY
          e.kode_entitas, a.kode_akun
      ) AS saldo_setelah_penyesuaian
    `, {
                replacements: { id: req.params.id },
                type: sequelize_1.QueryTypes.SELECT
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
                //raw: true, // Mengembalikan hasil dalam bentuk plain object, bukan instance Sequelize
                //nest: true, // Menetapkan hasil dalam bentuk yang lebih bersarang (objek dalam objek)
            });
            // Calculate total kredit and debit
            const totalKredit = saldoDebitKredit.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('kredit') || 0), 0);
            const totalDebit = saldoDebitKredit.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('debit') || 0), 0);
            const saldoAwal = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('saldo_awal') || 0), 0);
            const totalSaldo = DetailSaldoAkun.reduce((sum, akun) => sum + parseFloat(akun.getDataValue('saldo') || 0), 0);
            // Mapping results to format the response
            /*const SaldoAkun = DetailSaldoAkun.map(result => ({
              tipe_transaksi: result.tipe_transaksi,
              saldo_awal: result.get('saldo_awal'),
              kredit: result.get('kredit'),
              debit: result.get('debit'),
              saldo: result.get('saldo'),
            }));*/
            // Membuat map data
            res.status(200).json({
                saldoSetelahPenyesuaian,
                entitas,
                saldoAwal,
                totalSaldo,
                totalKredit,
                totalDebit,
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, nama_entitas, tipe_entitas } = req.body;
            const entitas = yield Entitas_1.default.findByPk(req.params.id);
            if (entitas) {
                yield entitas.update({
                    kode_entitas,
                    nama_entitas,
                    tipe_entitas,
                });
                res.status(200).json(entitas);
            }
            else {
                res.status(404).json({ error: 'Entity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitas = yield Entitas_1.default.findByPk(req.params.id);
            if (entitas) {
                yield entitas.destroy();
                res.status(200).json({ message: 'Entity deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Entity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
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
