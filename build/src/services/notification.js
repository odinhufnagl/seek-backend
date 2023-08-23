"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.unsubscribeFromTopic = exports.subscribeToTopic = exports.sendNotificationToUsers = exports.sendNotification = void 0;
const admin = __importStar(require("firebase-admin"));
const sequelize_1 = require("sequelize");
const models_1 = require("../db/models");
const db_1 = require("./db/db");
const sendNotification = (tokens, notification) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hello world");
        const res = yield admin.messaging().sendEachForMulticast({
            tokens,
            notification: notification.payLoad.notification,
            data: notification.payLoad.data,
        });
        console.log("res", res.responses[0].error);
        return Boolean(res);
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.sendNotification = sendNotification;
const subscribeToTopic = (token, topic) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield admin.messaging().subscribeToTopic(token, topic);
        return Boolean(res);
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.subscribeToTopic = subscribeToTopic;
const unsubscribeFromTopic = (token, topic) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield admin.messaging().unsubscribeFromTopic(token, topic);
        return Boolean(res);
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.unsubscribeFromTopic = unsubscribeFromTopic;
const sendNotificationToUsers = (userIds, notification) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, db_1.dbFindAll)(models_1.User, {
        where: { id: { [sequelize_1.Op.in]: userIds } },
        include: [{ model: models_1.NotificationToken }],
    });
    if (!users) {
        return false;
    }
    //TODO: make this more effective, like grouping the ones with same language etc...
    for (const user of users) {
        console.log("user", user);
        const tokens = user.notificationTokens.map((t) => t.name);
        console.log("tokens", tokens);
        sendNotification(tokens, notification(user));
    }
    return true;
});
exports.sendNotificationToUsers = sendNotificationToUsers;
