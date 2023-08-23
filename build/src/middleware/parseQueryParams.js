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
exports.parseQueryParamsToDBOptions = void 0;
const classes_1 = require("../classes");
const index_1 = require("../db/models/index");
const queryParser = require("sequelize-query")(index_1.sequelize);
const parseQueryParamsToDBOptions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = (yield queryParser.parse(req));
        req.dbOptions = query;
        req.order = query.order;
        next();
    }
    catch (e) {
        next(new classes_1.ApiQueryParamsError());
    }
});
exports.parseQueryParamsToDBOptions = parseQueryParamsToDBOptions;
