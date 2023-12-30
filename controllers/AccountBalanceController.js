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
// src/controllers/AccountBalanceController.ts
const database_1 = __importDefault(require("../config/database"));
function getAccountBalances(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield database_1.default.query(`
    SELECT
      a.kode_akun,
      a.nama_akun,
      a.tipe_transaksi,
      a.saldo_awal + COALESCE(SUM(CASE WHEN td.tipe_transaksi = 'kredit' THEN td.jumlah ELSE 0 END), 0) -
        COALESCE(SUM(CASE WHEN td.tipe_transaksi = 'debit' THEN td.jumlah ELSE 0 END), 0) AS saldo
    FROM
      akun_keuangan a
    LEFT JOIN
      transaksi_detail td ON a.kode_akun = td.kode_akun
    WHERE
      a.kode_akun = :kode_akun
    GROUP BY
      a.kode_akun, a.nama_akun, a.tipe_transaksi, a.saldo_awal;
    `);
            // Cast the result to the desired type
            const accountBalances = result.map((row) => ({
                kode_akun: row.kode_akun,
                nama_akun: row.nama_akun,
                tipe_transaksi: row.tipe_transaksi,
                saldo: row.saldo,
            }));
            res.status(200).json({ accountBalances });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAccountBalancesByCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_akun } = req.params;
            const result = yield database_1.default.query(`
      SELECT
        a.kode_akun,
        a.nama_akun,
        a.tipe_transaksi,
        a.saldo_awal + COALESCE(SUM(CASE WHEN td.tipe_transaksi = 'kredit' THEN td.jumlah ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN td.tipe_transaksi = 'debit' THEN td.jumlah ELSE 0 END), 0) AS saldo
      FROM
        akun_keuangan a
      LEFT JOIN
        transaksi_detail td ON a.kode_akun = td.kode_akun
      WHERE
        a.kode_akun = :kode_akun
      GROUP BY
        a.kode_akun, a.nama_akun, a.tipe_transaksi, a.saldo_awal;
      `, {
                replacements: { kode_akun },
            });
            // Cast the result to the desired type
            const accountBalances = result.map((row) => ({
                kode_akun: row.kode_akun,
                nama_akun: row.nama_akun,
                tipe_transaksi: row.tipe_transaksi,
                saldo: row.saldo,
            }));
            res.status(200).json({ accountBalances });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    getAccountBalances,
    getAccountBalancesByCode,
};
