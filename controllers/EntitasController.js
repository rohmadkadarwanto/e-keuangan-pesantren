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
const Entitas_1 = __importDefault(require("../models/Entitas"));
const router = express_1.default.Router();
// Create
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama_entitas, telp_entitas, email_entitas, alamat_entitas, informasi_tambahan_entitas, tipe_entitas } = req.body;
        // Membuat kode_entitas secara otomatis (contoh: EN20230101-123456)
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
        const kode_entitas = `EN${timestamp}`;
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena bulan dimulai dari 0
        const day = String(today.getDate()).padStart(2, '0');
        const tanggal_masuk_entitas = `${year}-${month}-${day}`;
        const entitas = yield Entitas_1.default.create({
            kode_entitas,
            tanggal_masuk_entitas,
            nama_entitas,
            telp_entitas,
            email_entitas,
            alamat_entitas,
            informasi_tambahan_entitas,
            tipe_entitas
        });
        res.status(201).json(entitas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Read
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entitasList = yield Entitas_1.default.findAll();
        res.status(200).json(entitasList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:id', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entitasList = yield Entitas_1.default.findByPk(_req.params.id);
        res.status(200).json(entitasList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entitas = yield Entitas_1.default.findByPk(req.params.id);
        if (entitas) {
            yield entitas.update(req.body);
            //res.status(201).json(entitas);
            res.status(201).json({ messages: 'Berhasi diupdate' });
        }
        else {
            res.status(404).json({ error: 'Entity not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Delete
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entitas = yield Entitas_1.default.findByPk(req.params.id);
        if (entitas) {
            yield entitas.destroy();
            res.status(201).json({ messages: 'Berhasi dihapus' });
        }
        else {
            res.status(404).json({ error: 'Entity not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
