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
exports.checkUserDuplicateEmail = void 0;
const classes_1 = require("../classes");
const users_1 = require("../services/db/users");
const checkUserDuplicateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield (0, users_1.existsUser)({
        where: {
            email: req.body.email,
        },
    });
    if (userExists) {
        throw new classes_1.ApiEmailAlreadyInUseError();
    }
    next();
});
exports.checkUserDuplicateEmail = checkUserDuplicateEmail;
