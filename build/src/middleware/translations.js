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
exports.addTranslation = void 0;
const classes_1 = require("../classes");
const addTranslation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query);
        //here we could do a mapping if we want to use for example sv instead of SE-se in the request
        //req.languageName = (req.query.lang as string) || DEFAULT_LANGUAGE;
        if (req.query.lang) {
            req.languageName = req.query.lang;
        }
        delete req.query.lang;
        next();
    }
    catch (e) {
        next(new classes_1.ApiQueryParamsError());
    }
});
exports.addTranslation = addTranslation;
