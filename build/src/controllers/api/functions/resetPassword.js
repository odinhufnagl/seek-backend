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
const uuid_1 = require("uuid");
const classes_1 = require("../../../classes");
const constants_1 = require("../../../constants");
const models_1 = require("../../../db/models");
const services_1 = require("../../../services");
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new classes_1.ApiBadBodyProvidedError();
    }
    const user = yield (0, services_1.dbFindOne)(models_1.User, { where: { email } });
    if (!user) {
        throw new classes_1.ApiDatabaseNotFoundError();
    }
    const token = (0, uuid_1.v4)().substring(0, 20);
    const emailIsSent = yield (0, services_1.sendEmail)(constants_1.EmailConstants.defaultEmail.resetPassword({
        token,
        recipient: email,
        language: (0, services_1.serverLanguageFromDBLanguage)(user.language),
    }));
    if (!emailIsSent) {
        throw new classes_1.ApiEmailError();
    }
    const updatedUser = yield (0, services_1.dbUpdate)(models_1.User, { resetPasswordToken: token }, { where: { id: user.id } });
    if (updatedUser[0] === 0) {
        throw new classes_1.ApiDatabaseError();
    }
    res.send(true);
});
exports.default = { resetPasswordController };
