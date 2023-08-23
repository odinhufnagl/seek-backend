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
exports.BaseController = void 0;
const constants_1 = require("../constants");
const db_1 = require("../services/db/db");
const errors_1 = require("./errors");
class BaseController {
    constructor(model, name) {
        this.defaultIdParam = "id";
        this.post = (singularOptions, pluralOptions, afterQueryParamsDBOptions) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body) {
                throw new errors_1.ApiNoBodyProvidedError();
            }
            let r;
            if (Array.isArray(req.body)) {
                r = yield (0, db_1.dbBulkCreate)(this.model, req.body, afterQueryParamsDBOptions
                    ? Object.assign(Object.assign({}, req.dbOptions), pluralOptions) : Object.assign(Object.assign({}, pluralOptions), req.dbOptions));
            }
            else {
                r = yield (0, db_1.dbCreate)(this.model, req.body, afterQueryParamsDBOptions
                    ? Object.assign(Object.assign({}, req.dbOptions), singularOptions) : Object.assign(Object.assign({}, singularOptions), req.dbOptions));
            }
            res.send(r);
        });
        this.put = (options, afterQueryParamsDBOptions, idParam = this.defaultIdParam) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params[idParam]);
            const r = yield (0, db_1.dbUpdate)(this.model, req.body, { where: { id } }
            /* afterQueryParamsDBOptions
              ? { ...req.dbOptions, ...options }
              : { ...options, ...req.dbOptions }*/
            );
            res.send(r);
        });
        this.delete = (options, afterQueryParamsDBOptions) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("dbOpp", req.dbOptions);
            const r = yield (0, db_1.dbDelete)(this.model, afterQueryParamsDBOptions
                ? Object.assign(Object.assign({}, req.dbOptions), options === null || options === void 0 ? void 0 : options(req)) : Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options(req)), req.dbOptions));
            res.send(r);
        });
        this.getPlural = (options, afterQueryParamsDBOptions = false) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const r = yield (0, db_1.dbFindAndCountAll)(this.model, afterQueryParamsDBOptions
                ? Object.assign(Object.assign({}, req.dbOptions), options === null || options === void 0 ? void 0 : options(req)) : Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options(req)), req.dbOptions));
            res.send(r);
        });
        this.get = (options, afterQueryParamsDBOptions = false, idParam = this.defaultIdParam) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params[idParam]);
            console.log("dbOptions", req.dbOptions);
            const r = yield (0, db_1.dbFindByPK)(this.model, id, afterQueryParamsDBOptions
                ? Object.assign(Object.assign({}, req.dbOptions), options === null || options === void 0 ? void 0 : options(req)) : Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options(req)), req.dbOptions));
            console.log("r", r);
            res.send(r);
        });
        this.putNtoM = (set, idParam = this.defaultIdParam) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params[idParam]);
            const body = req.body;
            const dbObject = yield (0, db_1.dbFindByPK)(this.model, id);
            body.ids && (yield set(dbObject, body.ids));
            res.send(constants_1.ResponseConstants.defaultResponses.success());
        });
        this.getNtoM = (get, idParam = this.defaultIdParam) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params[idParam]);
            const dbObject = yield (0, db_1.dbFindByPK)(this.model, id);
            const data = yield get(dbObject, req.dbOptions);
            res.send(data);
        });
        this.postNtoM = (add, idParam = this.defaultIdParam) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params[idParam]);
            const body = req.body;
            const dbObject = yield (0, db_1.dbFindByPK)(this.model, id);
            body.ids && (yield add(dbObject, body.ids));
            res.send(constants_1.ResponseConstants.defaultResponses.success());
        });
        this.deleteNtoM = (remove, idParam = this.defaultIdParam) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params[idParam]);
            const body = req.body;
            const dbObject = yield (0, db_1.dbFindByPK)(this.model, id);
            body.ids && (yield remove(dbObject, body.ids));
            res.send(constants_1.ResponseConstants.defaultResponses.success());
        });
        if (!model) {
            throw new Error("Must define model");
        }
        this.model = model;
        this.name = name;
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.put = this.put.bind(this);
    }
}
exports.BaseController = BaseController;
