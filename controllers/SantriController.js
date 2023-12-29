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
const Santri_1 = __importDefault(require("../models/Santri"));
const Entitas_1 = __importDefault(require("../models/Entitas"));
const router = express_1.default.Router();
// Create
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nis, nama_santri, tanggal_masuk, informasi_tambahan_santri } = req.body;
        // Membuat kode_entitas secara otomatis (contoh: EN20230101-123456)
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
        const kode_entitas = `EN${timestamp}`;
        // Simpan data entitas ke tabel Entitas
        yield Entitas_1.default.create({
            kode_entitas,
            nama_entitas: nama_santri,
            tipe_entitas: 'santri', // Menggunakan nama_santri sebagai nama_entitas, sesuaikan dengan kebutuhan
        });
        // Simpan data santri ke tabel Santri
        const santri = yield Santri_1.default.create({
            nis,
            kode_entitas,
            nama_santri,
            tanggal_masuk,
            informasi_tambahan_santri,
        });
        res.status(201).json({ success: true, santri });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Read
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const santriList = yield Santri_1.default.findAll();
        res.status(200).json(santriList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update
router.put('/:nis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const santri = yield Santri_1.default.findByPk(req.params.nis);
        if (santri) {
            yield santri.update(req.body);
            res.status(200).json(santri);
        }
        else {
            res.status(404).json({ error: 'Student not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Delete
router.delete('/:nis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const santri = yield Santri_1.default.findByPk(req.params.nis);
        if (santri) {
            yield santri.destroy();
            res.status(204).end();
        }
        else {
            res.status(404).json({ error: 'Student not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
