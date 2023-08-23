"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_1 = __importDefault(require("../../../../../controllers/api/db/users/questions"));
const middleware_1 = require("../../../../../middleware");
const wrappers_1 = require("../../../../../wrappers");
const router = express_1.default.Router({ mergeParams: true });
router.get("/new", [middleware_1.parseQueryParamsToDBOptions], (0, wrappers_1.asyncWrapper)(questions_1.default.getNewQuestion));
exports.default = router;
