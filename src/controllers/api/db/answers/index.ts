import { BaseController } from "../../../../classes";
import { Answer, Area, CountryArea, RadiusArea } from "../../../../db/models";

const controller = new BaseController(Answer, "answer");
const getAnswers = controller.getPlural();
const getAnswerByPK = controller.get(() => ({
  include: [{ model: Area, include: [RadiusArea, CountryArea] }],
}));
const postAnswer = controller.post({
  include: [{ model: Area, include: [RadiusArea, CountryArea] }],
});

export default { postAnswer, getAnswers, getAnswerByPK };
