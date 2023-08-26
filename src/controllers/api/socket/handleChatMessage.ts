import { socket } from "../../../..";
import { NotificationConstants, SocketConstants } from "../../../constants";
import { Chat, Message, User } from "../../../db/models";
import {
  dbCreate,
  dbFindByPK,
  sendNotificationToUsers,
} from "../../../services";
import {
  SocketControllerParams,
  SocketMessageClientUserMessageData,
} from "../../../types";
//TODO: look at the other controller
interface Params extends SocketControllerParams {
  data: SocketMessageClientUserMessageData;
}

const handleSocketChatMessage = async ({ sender, senderId, data }: Params) => {
  console.log("is sending message");
  const { userId, message, chatId } = data;
  const chat = await dbFindByPK(Chat, chatId, { include: [{ model: User }] });
  const otherUser = chat?.users.find((u) => u.id !== userId);
  const user = chat?.users.find((u) => u.id === userId);
  if (!otherUser || !user) {
    return;
  }
  if (user?.userChat?.isBlocked) {
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
  sendNotificationToUsers([otherUser.id], () =>
    NotificationConstants.defaultNotifications.message({
      chatId,
      message,
      userId,
      userName: user.name,
      language: "en",
    })
  );

  //TODO: send notification
  //to do this we first need to get token from reciever (hence the recieverId)
  //then we need to get senders name by accessing the db
  //and then the chatId from the data
};
export default handleSocketChatMessage;
