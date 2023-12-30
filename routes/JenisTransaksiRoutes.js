"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/JenisTransaksiRoutes.ts
const express_1 = __importDefault(require("express"));
const JenisTransaksiController_1 = __importDefault(require("../controllers/JenisTransaksiController"));
const router = express_1.default.Router();
router.post('/', JenisTransaksiController_1.default.createJenisTransaksi);
router.get('/', JenisTransaksiController_1.default.getJenisTransaksiList);
router.get('/:id', JenisTransaksiController_1.default.getJenisTransaksiById);
router.put('/:id', JenisTransaksiController_1.default.updateJenisTransaksi);
router.delete('/:id', JenisTransaksiController_1.default.deleteJenisTransaksi);
exports.default = router;
