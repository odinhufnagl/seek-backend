"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const models_1 = require("../../../../db/models");
const controller = new classes_1.BaseController(models_1.NotificationToken, "notificationToken");
const getNotificationTokens = controller.getPlural();
const getNotificationTokenByPK = controller.get();
const postNotificationToken = controller.post();
const deleteNotificationTokens = controller.delete();
exports.default = {
    postNotificationToken,
    getNotificationTokens,
    getNotificationTokenByPK,
    deleteNotificationTokens,
};
