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
const JenisTransaksi_1 = __importDefault(require("../models/JenisTransaksi"));
function createJenisTransaksi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_jenis_transaksi, nama_jenis_transaksi } = req.body;
            const jenisTransaksi = yield JenisTransaksi_1.default.create({
                kode_jenis_transaksi,
                nama_jenis_transaksi,
            });
            res.status(201).json(jenisTransaksi);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getJenisTransaksiList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jenisTransaksiList = yield JenisTransaksi_1.default.findAll();
            res.status(200).json(jenisTransaksiList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getJenisTransaksiById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jenisTransaksi = yield JenisTransaksi_1.default.findByPk(req.params.id);
            res.status(200).json(jenisTransaksi);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateJenisTransaksi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_jenis_transaksi, nama_jenis_transaksi } = req.body;
            const jenisTransaksi = yield JenisTransaksi_1.default.findByPk(req.params.id);
            if (jenisTransaksi) {
                yield jenisTransaksi.update({
                    kode_jenis_transaksi,
                    nama_jenis_transaksi,
                });
                res.status(200).json(jenisTransaksi);
            }
            else {
                res.status(404).json({ error: 'Transaction type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteJenisTransaksi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jenisTransaksi = yield JenisTransaksi_1.default.findByPk(req.params.id);
            if (jenisTransaksi) {
                yield jenisTransaksi.destroy();
                res.status(200).json({ message: 'Transaction type deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Transaction type not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createJenisTransaksi,
    getJenisTransaksiList,
    getJenisTransaksiById,
    updateJenisTransaksi,
    deleteJenisTransaksi,
};
