import { BaseController } from "../../../../classes";
import { DBConstants } from "../../../../constants";
import {
  Answer,
  Area,
  CountryArea,
  File,
  Question,
  RadiusArea,
} from "../../../../db/models";

const controller = new BaseController(Answer, "answer");
const getAnswers = controller.getPlural();
const getAnswerByPK = controller.get(() => ({
  include: [
    { model: Area, include: [RadiusArea, CountryArea] },
    {
      model: Question,
      include: [{ model: File, as: DBConstants.fields.question.COVER_IMAGE }],
    },
  ],
}));
const postAnswer = controller.post({
  include: [{ model: Area, include: [RadiusArea, CountryArea] }],
});

export default { postAnswer, getAnswers, getAnswerByPK };
