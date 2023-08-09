import { Response } from "express";
import { ApiBadBodyProvidedError } from "../../../classes";
import { UserChat } from "../../../db/models";
import { dbUpdate } from "../../../services";
import { RequestNewChatSeen } from "../../../types";
//TODO: in all screens, try to minimize include in some nice way

const newChatSeenController = async (
  req: RequestNewChatSeen,
  res: Response
) => {
  const { chatId, userId } = req.body;
  console.log("chatId", chatId, "userId", userId);
  if (!chatId || !userId) {
    throw new ApiBadBodyProvidedError();
  }
  const r = await dbUpdate(
    UserChat,
    { isInformed: true },
    { where: { userId, chatId } }
  );
  res.send(r);
};

export default { newChatSeenController };
