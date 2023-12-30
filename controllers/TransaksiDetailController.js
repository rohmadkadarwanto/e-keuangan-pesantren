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
const TransaksiDetail_1 = __importDefault(require("../models/TransaksiDetail"));
function createTransaksiDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_transaksi_detail, kode_transaksi, kode_akun, kode_jenis_transaksi, tipe_transaksi, jumlah, tanggal_transaksi, } = req.body;
            const transaksiDetail = yield TransaksiDetail_1.default.create({
                kode_transaksi_detail,
                kode_transaksi,
                kode_akun,
                kode_jenis_transaksi,
                tipe_transaksi,
                jumlah,
                tanggal_transaksi,
            });
            res.status(201).json(transaksiDetail);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getTransaksiDetailList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiDetailList = yield TransaksiDetail_1.default.findAll();
            res.status(200).json(transaksiDetailList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getTransaksiDetailById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiDetail = yield TransaksiDetail_1.default.findByPk(req.params.id);
            res.status(200).json(transaksiDetail);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateTransaksiDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_transaksi, kode_akun, kode_jenis_transaksi, tipe_transaksi, jumlah, tanggal_transaksi, } = req.body;
            const transaksiDetail = yield TransaksiDetail_1.default.findByPk(req.params.id);
            if (transaksiDetail) {
                yield transaksiDetail.update({
                    kode_transaksi,
                    kode_akun,
                    kode_jenis_transaksi,
                    tipe_transaksi,
                    jumlah,
                    tanggal_transaksi,
                });
                res.status(200).json(transaksiDetail);
            }
            else {
                res.status(404).json({ error: 'Transaction detail not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteTransaksiDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaksiDetail = yield TransaksiDetail_1.default.findByPk(req.params.id);
            if (transaksiDetail) {
                yield transaksiDetail.destroy();
                res.status(200).json({ message: 'Transaction detail deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Transaction detail not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createTransaksiDetail,
    getTransaksiDetailList,
    getTransaksiDetailById,
    updateTransaksiDetail,
    deleteTransaksiDetail,
};
