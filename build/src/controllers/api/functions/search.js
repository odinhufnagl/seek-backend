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
const classes_1 = require("../../../classes");
const services_1 = require("../../../services");
//TODO: in all screens, try to minimize include in some nice way
const searchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.search_query;
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const userId = Number(req.query.userId);
    console.log("searchQuery", searchQuery, "userId", userId);
    if (!userId) {
        throw new classes_1.ApiQueryParamsError();
    }
    const chats = yield (0, services_1.searchChats)(userId, searchQuery || "", { limit, offset });
    res.send({ chats });
});
exports.default = { searchController };
