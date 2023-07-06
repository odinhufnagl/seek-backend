import { BaseController } from "../../../../classes";
import { Chat, Message, Question, User, UserChat } from "../../../../db/models";

const controller = new BaseController(UserChat, "UserChat");
const getUserChats = controller.getPlural(() => ({
  include: {
    model: Chat,
    include: [{ model: User }, { model: Question }, { model: Message }],
  },
}));
const getUserChatByPK = controller.get(() => ({ include: { model: Chat } }));
const postUserChat = controller.post();
const putUserChat = controller.put();

export default { postUserChat, getUserChats, getUserChatByPK, putUserChat };
