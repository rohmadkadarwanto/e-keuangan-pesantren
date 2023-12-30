"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/SantriRoutes.ts
const express_1 = __importDefault(require("express"));
const SantriController_1 = __importDefault(require("../controllers/SantriController"));
const router = express_1.default.Router();
router.post('/', SantriController_1.default.createSantri);
router.get('/', SantriController_1.default.getSantriList);
router.get('/:nis', SantriController_1.default.getSantriByNIS);
router.put('/:nis', SantriController_1.default.updateSantri);
router.delete('/:nis', SantriController_1.default.deleteSantri);
exports.default = router;
