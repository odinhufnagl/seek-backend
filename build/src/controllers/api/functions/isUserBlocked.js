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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../classes");
const userBlocking_1 = __importDefault(require("../../../db/models/userBlocking"));
const services_1 = require("../../../services");
const isUserBlockedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blockerId, userId } = req.query;
    if (!blockerId || !userId) {
        throw new classes_1.ApiQueryParamsError();
    }
    const r = yield (0, services_1.dbFindOne)(userBlocking_1.default, {
        where: { blockerId, blockedId: userId },
    });
    if (r) {
        res.send(true);
        return;
    }
    res.send(false);
});
exports.default = { isUserBlockedController };
