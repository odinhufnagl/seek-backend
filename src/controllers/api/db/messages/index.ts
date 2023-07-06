import { BaseController } from "../../../../classes";
import { Message, ReadMessage } from "../../../../db/models";
const controller = new BaseController(Message, "Message");
const getMessages = controller.getPlural(() => ({
  include: [{ model: ReadMessage }],
}));
const getMessageByPK = controller.get();
const postMessage = controller.post();

export default { postMessage, getMessages, getMessageByPK };
