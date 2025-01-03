"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('pages/transaksi/nasabah');
});
router.get('/akun', (req, res) => {
    res.render('pages/transaksi/akun');
});
router.get('/transaksi', (req, res) => {
    res.render('pages/transaksi/transaksi');
});
exports.default = router;
