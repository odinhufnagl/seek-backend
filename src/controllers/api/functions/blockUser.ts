import { Response } from "express";
import { Op } from "sequelize";
import { ApiBadBodyProvidedError } from "../../../classes";
import { User, UserChat } from "../../../db/models";
import UserBlocking from "../../../db/models/userBlocking";
import { dbCreate, dbFindByPK, dbUpdate } from "../../../services";
import { RequestBlockUser } from "../../../types";

const blockUserController = async (req: RequestBlockUser, res: Response) => {
  const { userBlockingId, userToBlockId } = req.body;
  if (!userBlockingId || !userToBlockId) {
    throw new ApiBadBodyProvidedError();
  }
  const r = await dbCreate(UserBlocking, {
    blockedId: userToBlockId,
    blockerId: userBlockingId,
  } as UserBlocking);
  const userBlocking = await dbFindByPK(User, userBlockingId);
  //TODO: bad and slow
  const chats = await userBlocking?.getChats();
  const r2 = await dbUpdate(
    UserChat,
    { isBlocked: true },
    {
      where: {
        userId: userToBlockId,
        chatId: { [Op.in]: chats?.map((c) => c.id) },
      },
    }
  );

  res.send(r);
};

export default { blockUserController };
