"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/WaliSantriRoutes.ts
const express_1 = __importDefault(require("express"));
const WaliSantriController_1 = __importDefault(require("../controllers/WaliSantriController"));
const router = express_1.default.Router();
router.post('/', WaliSantriController_1.default.createWaliSantri);
router.get('/', WaliSantriController_1.default.getWaliSantriList);
router.get('/:nis', WaliSantriController_1.default.getWaliSantriByNIS);
router.put('/:nis', WaliSantriController_1.default.updateWaliSantri);
router.delete('/:nis', WaliSantriController_1.default.deleteWaliSantri);
exports.default = router;
