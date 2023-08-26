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
const sequelize_1 = require("sequelize");
const classes_1 = require("../../../../../classes");
const constants_1 = require("../../../../../constants");
const models_1 = require("../../../../../db/models");
const services_1 = require("../../../../../services");
const controller = new classes_1.BaseController(models_1.User, "user");
//TODO: check places where we use SQL and check so there is no injections available
const getChats = controller.getNtoM((user, dbOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, services_1.dbFindAndCountAll)(models_1.Chat, Object.assign({ replacements: { userId: user.id }, attributes: {
            include: [
                /*[
                  literal(`(
                            SELECT COUNT(*)
                            FROM messages AS message
                            LEFT JOIN "readMessages" AS readmessage ON message.id = readmessage."messageId" AND readmessage."userId" = :userId
                            WHERE message."chatId" = chat.id AND message."userId" != :userId AND (readmessage IS NULL)
                        )`),
                  "unreadMessagesCount",
                ],*/
                [
                    (0, sequelize_1.literal)(`(
            SELECT COUNT(*)
            FROM messages AS message
            WHERE message."chatId" = "chat"."id" AND message."userId" != :userId
            AND message."createdAt" > (
              SELECT "userChat"."lastRead"
              FROM "userChats" AS "userChat"
              WHERE "userChat"."userId" = :userId
              AND "userChat"."chatId" = "chat"."id"
            )
          )`),
                    "unreadMessagesCount",
                ],
            ],
        }, include: [
            { model: models_1.UserChat, where: { userId: user.id, isBlocked: false } },
            {
                model: models_1.User,
                where: { id: { [sequelize_1.Op.not]: user.id } },
                include: [{ model: models_1.File, as: constants_1.DBConstants.fields.user.PROFILE_IMAGE }],
            },
            { model: models_1.Question },
            {
                model: models_1.Message,
                separate: true,
                required: false,
                // where: { userId: { [Op.not]: user.id } },
                limit: 1,
                order: [["createdAt", "DESC"]],
            },
        ] }, dbOptions));
    const chats = res.rows;
    //TODO: do this in the query, but here we manually update the fieldName to lastMessage. Should be able to be done with a JOIN in some way
    chats.map((chat, i) => {
        chats[i].setDataValue("lastMessage", chat.messages && chat.messages.length > 0 ? chat.messages[0] : undefined);
        chats[i].setDataValue("messages", undefined);
    });
    return { count: res.count, rows: chats };
}));
const getNewChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    const userChat = yield (0, services_1.dbFindOne)(models_1.UserChat, {
        where: { isInformed: false, isInvited: true, userId },
        order: [["createdAt", "DESC"]],
        include: [{ model: models_1.Chat }],
    });
    res.send(userChat === null || userChat === void 0 ? void 0 : userChat.chat);
});
exports.default = { getChats, getNewChat };
