"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/TransaksiKeuanganRoutes.ts
const express_1 = __importDefault(require("express"));
const TransaksiKeuanganController_1 = __importDefault(require("../controllers/TransaksiKeuanganController"));
const router = express_1.default.Router();
router.post('/', TransaksiKeuanganController_1.default.createTransaksiKeuangan);
router.get('/', TransaksiKeuanganController_1.default.getTransaksiKeuanganList);
router.get('/:id', TransaksiKeuanganController_1.default.getTransaksiKeuanganById);
router.put('/:id', TransaksiKeuanganController_1.default.updateTransaksiKeuangan);
router.delete('/:id', TransaksiKeuanganController_1.default.deleteTransaksiKeuangan);
router.get('/akun/:kodeAkun', TransaksiKeuanganController_1.default.getTransaksiKeuanganByAkun);
exports.default = router;
