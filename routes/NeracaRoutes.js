"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NeracaController_1 = __importDefault(require("../controllers/NeracaController"));
const router = express_1.default.Router();
// Rute untuk mendapatkan laporan neraca
router.get('/', NeracaController_1.default.generateNeraca);
exports.default = router;
