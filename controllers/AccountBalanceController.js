"use strict";var __awaiter=this&&this.__awaiter||function(a,t,n,e){return new(n||(n=Promise))(function(s,u){function i(a){try{o(e.next(a))}catch(t){u(t)}}function d(a){try{o(e.throw(a))}catch(t){u(t)}}function o(a){var t;a.done?s(a.value):((t=a.value)instanceof n?t:new n(function(a){a(t)})).then(i,d)}o((e=e.apply(a,t||[])).next())})},__importDefault=this&&this.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(exports,"__esModule",{value:!0});const database_1=__importDefault(require("../config/database"));function getAccountBalances(a,t){return __awaiter(this,void 0,void 0,function*(){try{let a=yield database_1.default.query(`
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
    `),n=a.map(a=>({kode_akun:a.kode_akun,nama_akun:a.nama_akun,tipe_transaksi:a.tipe_transaksi,saldo:a.saldo}));t.status(200).json({accountBalances:n})}catch(e){t.status(500).json({error:e.message})}})}function getAccountBalancesByCode(a,t){return __awaiter(this,void 0,void 0,function*(){try{let{kode_akun:n}=a.params,e=yield database_1.default.query(`
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
      `,{replacements:{kode_akun:n}}),s=e.map(a=>({kode_akun:a.kode_akun,nama_akun:a.nama_akun,tipe_transaksi:a.tipe_transaksi,saldo:a.saldo}));t.status(200).json({accountBalances:s})}catch(u){t.status(500).json({error:u.message})}})}exports.default={getAccountBalances,getAccountBalancesByCode};
