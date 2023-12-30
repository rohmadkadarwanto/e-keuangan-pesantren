"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/AkunKeuanganRoutes.ts
const express_1 = __importDefault(require("express"));
const AkunKeuanganController_1 = __importDefault(require("../controllers/AkunKeuanganController"));
const router = express_1.default.Router();
router.post('/', AkunKeuanganController_1.default.createAkunKeuangan);
router.get('/', AkunKeuanganController_1.default.getAkunKeuanganList);
router.put('/:id', AkunKeuanganController_1.default.updateAkunKeuangan);
router.delete('/:id', AkunKeuanganController_1.default.deleteAkunKeuangan);
router.get('/:kodeAkun', AkunKeuanganController_1.default.getAkunKeuanganByAkun);
router.get('/entitas/:kodeEntitas', AkunKeuanganController_1.default.getAkunKeuanganByEntitas);
//router.get('/saldo', AkunKeuanganController.getDetailSaldoAkun);
router.get('/saldo/:kodeAkun', AkunKeuanganController_1.default.getDetailSaldoAkun);
exports.default = router;
