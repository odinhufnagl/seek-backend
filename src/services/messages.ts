import { socket } from "../..";
import { SocketConstants } from "../constants";
import { Chat, Message, User } from "../db/models";
import { dbCreate, dbFindByPK } from "./db/db";

export const sendMessage = async (
  message: Message
): Promise<Message | null> => {
  const res = await dbCreate(Message, message, {});
  const messageCreated = await dbFindByPK(Message, res.id, {
    include: [{ model: Chat, include: [{ model: User }] }],
  });
  if (!messageCreated) {
    return null;
  }
  console.log("res", res);
  const otherUser = messageCreated.chat?.users.find(
    (u) => u.id !== res?.userId
  );
  if (!otherUser) {
    return null;
  }
  console.log("otherUser", otherUser);
  socket.sendMessageToUsers(
    [otherUser?.id, res.userId],
    SocketConstants.defaultMessages.chatMessage({
      chatId: res.chatId,
      message: res.text,
      userId: res.userId,
      messageId: messageCreated.id,
    })
  );
  console.log("message", message);
  return res;
};
