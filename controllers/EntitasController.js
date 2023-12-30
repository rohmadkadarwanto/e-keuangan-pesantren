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
const Entitas_1 = __importDefault(require("../models/Entitas"));
function createEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, nama_entitas, tipe_entitas } = req.body;
            const entitas = yield Entitas_1.default.create({
                kode_entitas,
                nama_entitas,
                tipe_entitas,
            });
            res.status(201).json(entitas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getEntitasList(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitasList = yield Entitas_1.default.findAll();
            res.status(200).json(entitasList);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getEntitasById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitas = yield Entitas_1.default.findByPk(req.params.id);
            res.status(200).json(entitas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { kode_entitas, nama_entitas, tipe_entitas } = req.body;
            const entitas = yield Entitas_1.default.findByPk(req.params.id);
            if (entitas) {
                yield entitas.update({
                    kode_entitas,
                    nama_entitas,
                    tipe_entitas,
                });
                res.status(200).json(entitas);
            }
            else {
                res.status(404).json({ error: 'Entity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteEntitas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entitas = yield Entitas_1.default.findByPk(req.params.id);
            if (entitas) {
                yield entitas.destroy();
                res.status(200).json({ message: 'Entity deleted successfully' });
            }
            else {
                res.status(404).json({ error: 'Entity not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = {
    createEntitas,
    getEntitasList,
    getEntitasById,
    updateEntitas,
    deleteEntitas,
};
