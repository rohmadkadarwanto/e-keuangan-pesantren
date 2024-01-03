"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const EntitasRoutes_1 = __importDefault(require("./routes/EntitasRoutes"));
const JenisTransaksiRoutes_1 = __importDefault(require("./routes/JenisTransaksiRoutes"));
const AkunKeuanganRoutes_1 = __importDefault(require("./routes/AkunKeuanganRoutes"));
const TransaksiKeuanganRoutes_1 = __importDefault(require("./routes/TransaksiKeuanganRoutes"));
const TransaksiDetailRoutes_1 = __importDefault(require("./routes/TransaksiDetailRoutes"));
const SantriRoutes_1 = __importDefault(require("./routes/SantriRoutes"));
const WaliSantriRoutes_1 = __importDefault(require("./routes/WaliSantriRoutes"));
const NeracaRoutes_1 = __importDefault(require("./routes/NeracaRoutes"));
const TransaksiEjsRoutes_1 = __importDefault(require("./routes/TransaksiEjsRoutes"));
const app = (0, express_1.default)();
const port = 3006;
// Middleware and other configurations
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.set('view engine', 'ejs');
// Static files
app.use(express_1.default.static('public'));
app.use('/', TransaksiEjsRoutes_1.default);
// Routes
app.use('/api/wali-santri', WaliSantriRoutes_1.default);
app.use('/api/neraca', NeracaRoutes_1.default);
app.use('/api/santri', SantriRoutes_1.default);
app.use('/api/jenis-transaksi', JenisTransaksiRoutes_1.default);
app.use('/api/transaksi-keuangan', TransaksiKeuanganRoutes_1.default);
app.use('/api/entitas', EntitasRoutes_1.default);
app.use('/api/akun-keuangan', AkunKeuanganRoutes_1.default);
app.use('/api/transaksi-detail', TransaksiDetailRoutes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
