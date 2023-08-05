import { socket } from "../../../..";
import { SocketConstants } from "../../../constants";
import { Chat, Message, User } from "../../../db/models";
import { dbCreate, dbFindByPK } from "../../../services";
import {
  SocketControllerParams,
  SocketMessageClientUserMessageData,
} from "../../../types";
//TODO: look at the other controller
interface Params extends SocketControllerParams {
  data: SocketMessageClientUserMessageData;
}

const handleSocketChatMessage = async ({ sender, senderId, data }: Params) => {
  console.log("is typing");
  const { userId, message, chatId } = data;
  const chat = await dbFindByPK(Chat, chatId, { include: [{ model: User }] });
  const otherUser = chat?.users.find((u) => u.id !== userId);

  if (!otherUser) {
    return;
  }
  const newMessage = await dbCreate(Message, {
    chatId,
    userId,
    text: message,
  } as Message);
  socket.sendMessageToUsers(
    [otherUser?.id, userId],
    SocketConstants.defaultMessages.chatMessage({
      chatId,
      userId,
      message,
      messageId: newMessage.id,
    })
  );

  //TODO: send notification
  //to do this we first need to get token from reciever (hence the recieverId)
  //then we need to get senders name by accessing the db
  //and then the chatId from the data
};
export default handleSocketChatMessage;
