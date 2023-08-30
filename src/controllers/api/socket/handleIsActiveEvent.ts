import { socket } from "../../../..";
import { SocketConstants } from "../../../constants";
import { Chat, User, UserChat } from "../../../db/models";
import { dbFindAll, updateUser } from "../../../services";
import {
  SocketControllerParams,
  SocketMessageClientIsActiveData,
} from "../../../types";

//TODO remove as much "as" in typescript as possible
//like in db-functions we should make the models partial so that we dont have to do "as User", or something like that

interface Params extends SocketControllerParams {
  data: SocketMessageClientIsActiveData;
}

const handleSocketIsActiveEvent = async ({
  sender,
  senderId,
  data,
}: Params) => {
  console.log("is active or not");
  const { userId, isActive } = data;

  updateUser(userId, {
    isActive,
    lastActive: new Date().toISOString(),
  } as User);

  //TODO: make this more efficient
  const allUserChats = await dbFindAll(UserChat, {
    where: { userId },
    include: [{ model: Chat, include: [{ model: User }] }],
  });
  console.log("allUserChats", allUserChats);
  const userIdsToSendTo: number[] = [];
  allUserChats.map((u) =>
    u.chat.users.map((u) => u.id !== userId && userIdsToSendTo.push(u.id))
  );
  userIdsToSendTo.push(userId);

  socket.sendMessageToUsers(
    userIdsToSendTo,
    SocketConstants.defaultMessages.isActive({ userId, isActive })
  );

  //TODO: send notification
  //to do this we first need to get token from reciever (hence the recieverId)
  //then we need to get senders name by accessing the db
  //and then the chatId from the data
};

export default handleSocketIsActiveEvent;
