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
exports.dbBulkCreate = exports.dbBulkUpdate = exports.dbUpdate = exports.dbCreate = exports.dbFindByPK = exports.dbFindAndCountAll = exports.dbFindAll = exports.dbDelete = exports.dbFindOne = exports.dbBulkFindOrCreate = void 0;
const classes_1 = require("../../classes");
const dbBulkFindOrCreate = (model, values, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!values) {
        return [];
    }
    const existingIds = values
        .filter((v) => "id" in v)
        .map((v) => v.id);
    const objectsToCreate = values.filter((v) => !("id" in v));
    const created = yield (0, exports.dbBulkCreate)(model, objectsToCreate, Object.assign(Object.assign({}, options), { returning: true }));
    const ids = [...created.map((e) => e.id), ...existingIds];
    return ids;
});
exports.dbBulkFindOrCreate = dbBulkFindOrCreate;
const dbFindOne = (model, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.findOne(options);
        return res;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbFindOne = dbFindOne;
const dbDelete = (model, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.destroy(options);
        return true;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbDelete = dbDelete;
const dbFindAll = (model, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(options);
        const res = yield model.findAll(options);
        return res;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbFindAll = dbFindAll;
const dbFindAndCountAll = (model, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(options);
        const res = yield model.findAndCountAll(options);
        return res;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbFindAndCountAll = dbFindAndCountAll;
const dbFindByPK = (model, id, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.findByPk(id, options);
        return res;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbFindByPK = dbFindByPK;
const dbCreate = (model, values, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.create(values, options);
        return res;
    }
    catch (e) {
        console.log(e);
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbCreate = dbCreate;
const dbUpdate = (model, toUpdate, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.update(toUpdate, options);
        return res;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbUpdate = dbUpdate;
const dbBulkUpdate = (model, id, toUpdate, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model.update(toUpdate, Object.assign(Object.assign({}, options), { where: { id } }));
        return res;
    }
    catch (e) {
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbBulkUpdate = dbBulkUpdate;
const dbBulkCreate = (model, values, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("values", values);
        const res = yield model.bulkCreate(values, options);
        return res;
    }
    catch (e) {
        console.log(e);
        throw classes_1.DatabaseError.fromSequelizeError(e);
    }
});
exports.dbBulkCreate = dbBulkCreate;
