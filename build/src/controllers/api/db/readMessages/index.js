"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const models_1 = require("../../../../db/models");
const controller = new classes_1.BaseController(models_1.ReadMessage, "readMessage");
const getReadMessages = controller.getPlural();
const getReadMessageByPK = controller.get();
const postReadMessage = controller.post();
exports.default = { postReadMessage, getReadMessages, getReadMessageByPK };
