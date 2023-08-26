import { FindOptions, Op } from "sequelize";
import { DBConstants } from "../constants";
import { Chat, File, User, UserChat } from "../db/models";
import { dbFindAndCountAll } from "./db/db";

export const searchChats = async (
  userId: number,
  searchQuery: string,
  dbOptions: FindOptions<Chat>
): Promise<{ count: number; rows: Chat[] }> => {
  const userChats = await dbFindAndCountAll(UserChat, {
    where: { userId, isBlocked: false },
    include: [
      {
        model: Chat,
        include: [
          {
            model: User,
            where: {
              [Op.and]: {
                id: { [Op.not]: userId },
                name: { [Op.iLike]: `%${searchQuery}%` },
              },
            },
            include: [
              { model: File, as: DBConstants.fields.user.PROFILE_IMAGE },
            ],
          },
        ],
      },
    ],
    ...dbOptions,
  });

  const chats = userChats.rows.map((uc) => uc.chat);
  return { count: userChats.count, rows: chats };
};
