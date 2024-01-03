"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/dashboard', (req, res) => {
    res.render('pages/transaksi/dashboard');
});
router.get('/nasabah', (req, res) => {
    res.render('pages/nasabah/nasabah');
});
router.get('/', (req, res) => {
    res.render('pages/nasabah/nasabah');
});
router.get('/akun', (req, res) => {
    res.render('pages/transaksi/akun');
});
router.get('/transaksi', (req, res) => {
    res.render('pages/transaksi/transaksi');
});
router.get('/laporan/neraca', (req, res) => {
    res.render('pages/transaksi/neraca');
});
router.get('/laporan/arus-kas', (req, res) => {
    res.render('pages/transaksi/arus-kas');
});
router.get('/laporan/buku-besar', (req, res) => {
    res.render('pages/transaksi/buku-besar');
});
exports.default = router;
