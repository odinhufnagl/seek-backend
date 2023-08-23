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
//TODO: in all screens, try to minimize include in some nice way
const newChatSeenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    console.log("chatId", chatId, "userId", userId);
    if (!chatId || !userId) {
        throw new classes_1.ApiBadBodyProvidedError();
    }
    const r = yield (0, services_1.dbUpdate)(models_1.UserChat, { isInformed: true }, { where: { userId, chatId } });
    res.send(r);
});
exports.default = { newChatSeenController };
