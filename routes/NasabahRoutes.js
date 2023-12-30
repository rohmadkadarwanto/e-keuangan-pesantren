"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// santri.routes.ts
const express_1 = __importDefault(require("express"));
const NasabahController_1 = __importDefault(require("../controllers/NasabahController"));
const router = express_1.default.Router();
router.post('/nasabah/santri', NasabahController_1.default.createSantri);
exports.default = router;
