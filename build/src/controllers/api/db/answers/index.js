"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../../classes");
const constants_1 = require("../../../../constants");
const models_1 = require("../../../../db/models");
const controller = new classes_1.BaseController(models_1.Answer, "answer");
const getAnswers = controller.getPlural();
const getAnswerByPK = controller.get(() => ({
    include: [
        { model: models_1.Area, include: [models_1.RadiusArea, models_1.CountryArea] },
        {
            model: models_1.Question,
            include: [{ model: models_1.File, as: constants_1.DBConstants.fields.question.COVER_IMAGE }],
        },
    ],
}));
const postAnswer = controller.post({
    include: [{ model: models_1.Area, include: [models_1.RadiusArea, models_1.CountryArea] }],
});
exports.default = { postAnswer, getAnswers, getAnswerByPK };
