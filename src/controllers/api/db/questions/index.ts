import { BaseController } from "../../../../classes";
import { Question } from "../../../../db/models";

const controller = new BaseController(Question, "question");
const getQuestions = controller.getPlural();
const getQuestionByPK = controller.get();
const postQuestion = controller.post();

export default { postQuestion, getQuestions, getQuestionByPK };
