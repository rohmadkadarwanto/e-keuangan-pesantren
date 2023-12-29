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
const express_1 = __importDefault(require("express"));
const AkunKeuangan_1 = __importDefault(require("../models/AkunKeuangan"));
const router = express_1.default.Router();
// Create
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { kode_akun, kode_entitas, nama_akun, saldo_awal, tipe_transaksi } = req.body;
        const akunKeuangan = yield AkunKeuangan_1.default.create({
            kode_akun,
            kode_entitas,
            nama_akun,
            saldo_awal,
            tipe_transaksi
        });
        res.status(201).json(akunKeuangan);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Read
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const akunKeuanganList = yield AkunKeuangan_1.default.findAll();
        res.status(200).json(akunKeuanganList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:id', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const akunKeuanganList = yield AkunKeuangan_1.default.findByPk(_req.params.id);
        res.status(200).json(akunKeuanganList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { kode_entitas, nama_akun, saldo_awal, tipe_transaksi } = req.body;
        const akunKeuangan = yield AkunKeuangan_1.default.findByPk(req.params.id);
        if (akunKeuangan) {
            yield akunKeuangan.update({
                kode_entitas,
                nama_akun,
                saldo_awal,
                tipe_transaksi
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
}));
// Delete
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const akunKeuangan = yield AkunKeuangan_1.default.findByPk(req.params.id);
        if (akunKeuangan) {
            yield akunKeuangan.destroy();
            res.status(404).json({ error: 'success' });
        }
        else {
            res.status(404).json({ error: 'Financial account not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
