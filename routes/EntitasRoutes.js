"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/EntitasRoutes.ts
const express_1 = __importDefault(require("express"));
const EntitasController_1 = __importDefault(require("../controllers/EntitasController"));
const router = express_1.default.Router();
router.post('/', EntitasController_1.default.createEntitas);
router.get('/', EntitasController_1.default.getEntitasList);
router.get('/:id', EntitasController_1.default.getEntitasById);
router.put('/:id', EntitasController_1.default.updateEntitas);
router.delete('/:id', EntitasController_1.default.deleteEntitas);
exports.default = router;
