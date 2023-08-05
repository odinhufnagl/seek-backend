import { BaseController } from "../../../../classes";
import { DBConstants } from "../../../../constants";
import { Chat, File, Question, User } from "../../../../db/models";

const controller = new BaseController(Chat, "Chat");
const getChats = controller.getPlural();
const getChatByPK = controller.get(() => ({
  include: [
    {
      model: Question,
      include: [{ model: File, as: DBConstants.fields.question.COVER_IMAGE }],
    },
    {
      model: User,
      include: [{ model: File, as: DBConstants.fields.user.PROFILE_IMAGE }],
    },
  ],
}));
const postChat = controller.post();

export default { postChat, getChats, getChatByPK };
