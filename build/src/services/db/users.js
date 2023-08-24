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
exports.updateUser = exports.createUser = exports.findUserByPK = exports.existsUser = exports.findUser = exports.findUsers = void 0;
const classes_1 = require("../../classes");
const models_1 = require("../../db/models");
const db_1 = require("./db");
const findUsers = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, db_1.dbFindAll)(models_1.models.User, options);
    if (!res) {
        throw new classes_1.DatabaseNotFoundError();
    }
    return res.filter((usr) => delete usr["password"] && usr);
});
exports.findUsers = findUsers;
const findUser = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, db_1.dbFindOne)(models_1.models.User, options);
    if (!res) {
        throw new classes_1.DatabaseNotFoundError();
    }
    return res;
});
exports.findUser = findUser;
const existsUser = (options) => __awaiter(void 0, void 0, void 0, function* () {
    return Boolean(yield (0, db_1.dbFindOne)(models_1.models.User, options));
});
exports.existsUser = existsUser;
const findUserByPK = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const res = (yield (0, db_1.dbFindByPK)(models_1.models.User, id, options));
    if (!res) {
        throw new classes_1.DatabaseNotFoundError();
    }
    return res;
});
exports.findUserByPK = findUserByPK;
const createUser = (values, options) => __awaiter(void 0, void 0, void 0, function* () {
    const res = (yield (0, db_1.dbCreate)(models_1.models.User, values, options));
    if (!res) {
        throw new classes_1.DatabaseCreateError();
    }
    return res;
});
exports.createUser = createUser;
const updateUser = (userId, toUpdate, options) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, db_1.dbUpdate)(models_1.models.User, toUpdate, Object.assign(Object.assign({}, options), { where: { id: userId } }));
    return res;
});
exports.updateUser = updateUser;
