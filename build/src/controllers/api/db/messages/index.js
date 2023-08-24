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
const classes_1 = require("../../../../classes");
const models_1 = require("../../../../db/models");
const services_1 = require("../../../../services");
const controller = new classes_1.BaseController(models_1.Message, "Message");
const getMessages = controller.getPlural(() => ({
    include: [{ model: models_1.ReadMessage }],
}));
const getMessageByPK = controller.get();
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield (0, services_1.sendMessage)(req.body);
    console.log("message to send", message);
    res.send(message);
});
exports.default = { postMessage, getMessages, getMessageByPK };
