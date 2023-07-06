import { BaseController } from "../../../../classes";
import { ReadMessage } from "../../../../db/models";

const controller = new BaseController(ReadMessage, "readMessage");
const getReadMessages = controller.getPlural();
const getReadMessageByPK = controller.get();
const postReadMessage = controller.post();

export default { postReadMessage, getReadMessages, getReadMessageByPK };
