"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const models_1 = require("../../../../db/models");
const controller = new classes_1.BaseController(models_1.Question, "question");
const getQuestions = controller.getPlural();
const getQuestionByPK = controller.get();
const postQuestion = controller.post();
exports.default = { postQuestion, getQuestions, getQuestionByPK };
