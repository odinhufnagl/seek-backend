import { Response } from "express";
import { Op } from "sequelize";
import { ApiBadBodyProvidedError } from "../../../classes";
import { User, UserChat } from "../../../db/models";
import UserBlocking from "../../../db/models/userBlocking";
import { dbDelete, dbFindByPK, dbUpdate } from "../../../services";
import { RequestUnblockUser } from "../../../types";

const unblockUserController = async (
  req: RequestUnblockUser,
  res: Response
) => {
  const { userBlockingId, userToBlockId } = req.body;
  if (!userBlockingId || !userToBlockId) {
    throw new ApiBadBodyProvidedError();
  }
  const r = await dbDelete(UserBlocking, {
    where: { blockerId: userBlockingId, blockedId: userToBlockId },
  });
  const userBlocking = await dbFindByPK(User, userBlockingId);
  //TODO: bad and slow
  const chats = await userBlocking?.getChats();
  const r2 = await dbUpdate(
    UserChat,
    { isBlocked: false },
    {
      where: {
        userId: userToBlockId,
        chatId: { [Op.in]: chats?.map((c) => c.id) },
      },
    }
  );
  res.send(r);
};

export default { unblockUserController };
