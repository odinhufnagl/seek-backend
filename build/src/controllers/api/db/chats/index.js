"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const constants_1 = require("../../../../constants");
const models_1 = require("../../../../db/models");
const controller = new classes_1.BaseController(models_1.Chat, "Chat");
const getChats = controller.getPlural();
const getChatByPK = controller.get(() => ({
    include: [
        {
            model: models_1.Question,
            include: [{ model: models_1.File, as: constants_1.DBConstants.fields.question.COVER_IMAGE }],
        },
        {
            model: models_1.User,
            include: [{ model: models_1.File, as: constants_1.DBConstants.fields.user.PROFILE_IMAGE }],
        },
    ],
}));
const postChat = controller.post();
exports.default = { postChat, getChats, getChatByPK };
