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
exports.searchChats = void 0;
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
const models_1 = require("../db/models");
const db_1 = require("./db/db");
const searchChats = (userId, searchQuery, dbOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const userChats = yield (0, db_1.dbFindAndCountAll)(models_1.UserChat, Object.assign({ where: { userId }, include: [
            {
                model: models_1.Chat,
                include: [
                    {
                        model: models_1.User,
                        where: {
                            [sequelize_1.Op.and]: {
                                id: { [sequelize_1.Op.not]: userId },
                                name: { [sequelize_1.Op.iLike]: `%${searchQuery}%` },
                            },
                        },
                        include: [
                            { model: models_1.File, as: constants_1.DBConstants.fields.user.PROFILE_IMAGE },
                        ],
                    },
                ],
            },
        ] }, dbOptions));
    const chats = userChats.rows.map((uc) => uc.chat);
    return { count: userChats.count, rows: chats };
});
exports.searchChats = searchChats;
