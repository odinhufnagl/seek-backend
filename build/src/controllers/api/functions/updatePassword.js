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
const classes_1 = require("../../../classes");
const models_1 = require("../../../db/models");
const services_1 = require("../../../services");
const updatePasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, resetPasswordToken } = req.body;
    const user = yield (0, services_1.dbFindOne)(models_1.User, { where: { resetPasswordToken } });
    if (!user) {
        throw new classes_1.ApiDatabaseNotFoundError();
    }
    const updatedUser = yield (0, services_1.dbUpdate)(models_1.User, { password: yield user.hashPassword(newPassword), resetPasswordToken: "" }, { where: { id: user.id } });
    if (!updatedUser) {
        throw new classes_1.ApiDatabaseError();
    }
    res.send(true);
});
exports.default = { updatePasswordController };
