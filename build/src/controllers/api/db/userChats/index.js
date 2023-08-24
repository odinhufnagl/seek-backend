"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const models_1 = require("../../../../db/models");
const controller = new classes_1.BaseController(models_1.UserChat, "UserChat");
const getUserChats = controller.getPlural(() => ({
    include: {
        model: models_1.Chat,
        include: [{ model: models_1.User }, { model: models_1.Question }, { model: models_1.Message }],
    },
}));
const getUserChatByPK = controller.get(() => ({ include: { model: models_1.Chat } }));
const postUserChat = controller.post();
const putUserChat = controller.put();
exports.default = { postUserChat, getUserChats, getUserChatByPK, putUserChat };
