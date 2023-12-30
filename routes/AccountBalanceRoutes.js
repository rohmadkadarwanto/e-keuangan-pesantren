"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/AccountBalanceRoutes.ts
const express_1 = __importDefault(require("express"));
const AccountBalanceController_1 = __importDefault(require("../controllers/AccountBalanceController"));
const router = express_1.default.Router();
// Route to get detailed account balances based on kode_akun
router.get('/account-balances', AccountBalanceController_1.default.getAccountBalances);
// Route to get detailed account balances based on kode_akun
router.get('/account-balances/:kode_akun', AccountBalanceController_1.default.getAccountBalancesByCode);
exports.default = router;
