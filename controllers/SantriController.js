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
const Santri_1 = __importDefault(require("../models/Santri"));
function createSantri(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nis, kode_entitas, nama_santri, tanggal_masuk, informasi_tambahan_santri } = req.body;
            const santri = yield Santri_1.default.create({
                nis,
                kode_entitas,
                nama_santri,
                tanggal_masuk,
                informasi_tambahan_santri,
            });
            res.status(201).json(santri);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getSantriList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const santriList = yield Santri_1.default.findAll();
            res.status(200).json(santriList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getSantriByNIS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const santri = yield Santri_1.default.findByPk(req.params.nis);
            res.status(200).json(santri);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateSantri(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, nama_santri, tanggal_masuk, informasi_tambahan_santri } = req.body;
            const santri = yield Santri_1.default.findByPk(req.params.nis);
            if (santri) {
                yield santri.update({
                    kode_entitas,
                    nama_santri,
                    tanggal_masuk,
                    informasi_tambahan_santri,
                });
                res.status(200).json(santri);
            }
            else {
                res.status(404).json({ error: 'Santri not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteSantri(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const santri = yield Santri_1.default.findByPk(req.params.nis);
            if (santri) {
                yield santri.destroy();
                res.status(200).json({ message: 'Santri deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Santri not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createSantri,
    getSantriList,
    getSantriByNIS,
    updateSantri,
    deleteSantri,
};
