"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EntitasRoutes_1 = __importDefault(require("./routes/EntitasRoutes"));
const JenisTransaksiRoutes_1 = __importDefault(require("./routes/JenisTransaksiRoutes"));
const AkunKeuanganRoutes_1 = __importDefault(require("./routes/AkunKeuanganRoutes"));
const TransaksiKeuanganRoutes_1 = __importDefault(require("./routes/TransaksiKeuanganRoutes"));
const TransaksiDetailRoutes_1 = __importDefault(require("./routes/TransaksiDetailRoutes"));
const SantriRoutes_1 = __importDefault(require("./routes/SantriRoutes"));
const WaliSantriRoutes_1 = __importDefault(require("./routes/WaliSantriRoutes"));
const NeracaRoutes_1 = __importDefault(require("./routes/NeracaRoutes"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware and other configurations
// Routes
app.use('/api', EntitasRoutes_1.default);
app.use('/api', JenisTransaksiRoutes_1.default);
app.use('/api', AkunKeuanganRoutes_1.default);
app.use('/api', TransaksiKeuanganRoutes_1.default);
app.use('/api', TransaksiDetailRoutes_1.default);
app.use('/api', SantriRoutes_1.default);
app.use('/api', WaliSantriRoutes_1.default);
app.use('/api', NeracaRoutes_1.default); // Add this line for Neraca route
// Add similar lines for other routes
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});