import { Response } from "express";
import { BaseController } from "../../../../classes";
import { Message, ReadMessage } from "../../../../db/models";
import { sendMessage } from "../../../../services";
import { RequestWithDBOptions } from "../../../../types";
const controller = new BaseController(Message, "Message");
const getMessages = controller.getPlural(() => ({
  include: [{ model: ReadMessage }],
}));
const getMessageByPK = controller.get();
const postMessage = async (req: RequestWithDBOptions, res: Response) => {
  const message = await sendMessage(req.body);
  console.log("message to send", message);
  res.send(message);
};

export default { postMessage, getMessages, getMessageByPK };
