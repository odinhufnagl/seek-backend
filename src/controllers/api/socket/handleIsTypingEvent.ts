import { socket } from "../../../..";
import { SocketConstants } from "../../../constants";
import { Chat, User } from "../../../db/models";
import { dbFindByPK } from "../../../services";
import {
  SocketControllerParams,
  SocketMessageClientTypingData,
} from "../../../types";

interface Params extends SocketControllerParams {
  data: SocketMessageClientTypingData;
}

const handleSocketIsTypingEvent = async ({
  sender,
  senderId,
  data,
}: Params) => {
  console.log("is typing");
  const { chatId, userId, isTyping } = data;
  const chat = await dbFindByPK(Chat, chatId, { include: [{ model: User }] });
  const otherUser = chat?.users.find((u) => u.id !== userId);
  if (!otherUser) {
    return;
  }
  socket.sendMessageToUsers(
    otherUser?.id,
    SocketConstants.defaultMessages.isTyping({ chatId, isTyping, userId })
  );

  //TODO: send notification
  //to do this we first need to get token from reciever (hence the recieverId)
  //then we need to get senders name by accessing the db
  //and then the chatId from the data
};

export default handleSocketIsTypingEvent;
