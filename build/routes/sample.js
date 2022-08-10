"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const sample_1 = __importDefault(require("../controllers/sample"));
const router = express_1.default.Router();
router.get('/ping', sample_1.default.serverHealthCheck);
module.exports = router;
