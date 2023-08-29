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
const sequelize_1 = require("sequelize");
const classes_1 = require("../../../classes");
const models_1 = require("../../../db/models");
const userBlocking_1 = __importDefault(require("../../../db/models/userBlocking"));
const services_1 = require("../../../services");
const unblockUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userBlockingId, userToBlockId } = req.body;
    if (!userBlockingId || !userToBlockId) {
        throw new classes_1.ApiBadBodyProvidedError();
    }
    const r = yield (0, services_1.dbDelete)(userBlocking_1.default, {
        where: { blockerId: userBlockingId, blockedId: userToBlockId },
    });
    const userBlocking = yield (0, services_1.dbFindByPK)(models_1.User, userBlockingId);
    //TODO: bad and slow
    const chats = yield (userBlocking === null || userBlocking === void 0 ? void 0 : userBlocking.getChats());
    const r2 = yield (0, services_1.dbUpdate)(models_1.UserChat, { isBlocked: false }, {
        where: {
            userId: userToBlockId,
            chatId: { [sequelize_1.Op.in]: chats === null || chats === void 0 ? void 0 : chats.map((c) => c.id) },
        },
    });
    res.send(r);
});
exports.default = { unblockUserController };
