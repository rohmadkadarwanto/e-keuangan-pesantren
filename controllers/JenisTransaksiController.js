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
const JenisTransaksi_1 = __importDefault(require("../models/JenisTransaksi"));
const router = express_1.default.Router();
// Create
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenisTransaksi = yield JenisTransaksi_1.default.create(req.body);
        res.status(201).json(jenisTransaksi);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Read
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenisTransaksiList = yield JenisTransaksi_1.default.findAll();
        res.status(200).json(jenisTransaksiList);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenisTransaksi = yield JenisTransaksi_1.default.findByPk(req.params.id);
        if (jenisTransaksi) {
            yield jenisTransaksi.update(req.body);
            res.status(200).json(jenisTransaksi);
        }
        else {
            res.status(404).json({ error: 'Transaction type not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Delete
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jenisTransaksi = yield JenisTransaksi_1.default.findByPk(req.params.id);
        if (jenisTransaksi) {
            yield jenisTransaksi.destroy();
            res.status(204).end();
        }
        else {
            res.status(404).json({ error: 'Transaction type not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
