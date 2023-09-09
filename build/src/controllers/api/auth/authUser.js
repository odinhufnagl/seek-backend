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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../../services/db/users");
const classes_1 = require("../../../classes");
const constants_1 = require("../../../constants");
const models_1 = require("../../../db/models");
const auth_1 = require("../../../services/auth");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const user = yield (0, users_1.createUser)(userData, {
        include: [
            { model: models_1.File, as: constants_1.DBConstants.fields.user.PROFILE_IMAGE },
            { model: models_1.Location, include: [{ model: models_1.Coordinate }] },
        ],
    });
    const token = (0, auth_1.generateUserToken)(user.id, constants_1.UserRole.USER);
    res.send({ accessToken: token, user });
});
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, users_1.findUser)({
        where: { email },
        attributes: { include: ["password"] },
        include: [{ model: models_1.File, as: constants_1.DBConstants.fields.user.PROFILE_IMAGE }],
    });
    if (!user.password) {
        throw new classes_1.ApiWrongPasswordEmailError();
    }
    var passwordIsValid = yield user.validatePassword(password, user.password);
    if (!passwordIsValid) {
        throw new classes_1.ApiWrongPasswordEmailError();
    }
    const token = (0, auth_1.generateUserToken)(user.id, constants_1.UserRole.USER);
    res.send({
        user,
        accessToken: token,
    });
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.curUserId || req.userRole !== constants_1.UserRole.USER) {
        throw new classes_1.ApiAuthenticateError();
    }
    //user comes from middleware (token object)
    const user = yield (0, users_1.findUserByPK)(req.curUserId, {
        include: [{ model: models_1.File, as: constants_1.DBConstants.fields.user.PROFILE_IMAGE }],
    });
    const token = (0, auth_1.generateUserToken)(user.id, constants_1.UserRole.USER);
    res.send({ user, accessToken: token });
});
exports.default = { signUp, signIn, authenticate };
