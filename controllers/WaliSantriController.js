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
const WaliSantri_1 = __importDefault(require("../models/WaliSantri"));
function createWaliSantri(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nis, kode_entitas, nama_wali_santri, informasi_tambahan_wali_santri } = req.body;
            const waliSantri = yield WaliSantri_1.default.create({
                nis,
                kode_entitas,
                nama_wali_santri,
                informasi_tambahan_wali_santri,
            });
            res.status(201).json(waliSantri);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getWaliSantriList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const waliSantriList = yield WaliSantri_1.default.findAll();
            res.status(200).json(waliSantriList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getWaliSantriByNIS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const waliSantri = yield WaliSantri_1.default.findByPk(req.params.nis);
            res.status(200).json(waliSantri);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateWaliSantri(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, nama_wali_santri, informasi_tambahan_wali_santri } = req.body;
            const waliSantri = yield WaliSantri_1.default.findByPk(req.params.nis);
            if (waliSantri) {
                yield waliSantri.update({
                    kode_entitas,
                    nama_wali_santri,
                    informasi_tambahan_wali_santri,
                });
                res.status(200).json(waliSantri);
            }
            else {
                res.status(404).json({ error: 'Guardian not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteWaliSantri(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const waliSantri = yield WaliSantri_1.default.findByPk(req.params.nis);
            if (waliSantri) {
                yield waliSantri.destroy();
                res.status(200).json({ message: 'Guardian deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Guardian not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createWaliSantri,
    getWaliSantriList,
    getWaliSantriByNIS,
    updateWaliSantri,
    deleteWaliSantri,
};
