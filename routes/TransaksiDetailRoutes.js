"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/TransaksiDetailRoutes.ts
const express_1 = __importDefault(require("express"));
const TransaksiDetailController_1 = __importDefault(require("../controllers/TransaksiDetailController"));
const router = express_1.default.Router();
router.post('/', TransaksiDetailController_1.default.createTransaksiDetail);
router.get('/', TransaksiDetailController_1.default.getTransaksiDetailList);
router.get('/:id', TransaksiDetailController_1.default.getTransaksiDetailById);
router.put('/:id', TransaksiDetailController_1.default.updateTransaksiDetail);
router.delete('/:id', TransaksiDetailController_1.default.deleteTransaksiDetail);
exports.default = router;
