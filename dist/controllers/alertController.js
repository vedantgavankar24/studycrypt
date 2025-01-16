"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlerts = exports.createAlert = void 0;
const alertModel_1 = require("../models/alertModel");
const createAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alert = yield alertModel_1.Alert.create(req.body);
        res.status(201).json(alert);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createAlert = createAlert;
const getAlerts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alerts = yield alertModel_1.Alert.find();
        res.status(200).json(alerts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAlerts = getAlerts;
