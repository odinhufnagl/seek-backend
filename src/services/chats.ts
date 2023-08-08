import { FindOptions, literal } from "sequelize";
import { DBConstants } from "../constants";
import { Chat, File, Message, Question, User, UserChat } from "../db/models";
import { dbFindAndCountAll } from "./db/db";

export const findUsersChatsWithDetails = async (
  userId: number,
  dbOptions?: FindOptions<Chat>
): Promise<{ count: number; rows: Chat[] }> => {
  const res = await dbFindAndCountAll(Chat, {
    replacements: { userId },
    attributes: {
      include: [
        [
          literal(`(
                  SELECT COUNT(*)
                  FROM messages AS message
                  WHERE message."chatId" = "chat"."id" AND message."userId" != :userId
                  AND message."createdAt" > (
                    SELECT "userChat"."lastRead"
                    FROM "userChats" AS "userChat"
                    WHERE "userChat"."userId" = :userId
                    AND "userChat"."chatId" = "chat"."id"
                  )
                )`),
          "unreadMessagesCount",
        ],
      ],
    },

    include: [
      { model: UserChat, where: { userId } },
      {
        model: User,
        // where: { id: { [Op.not]: user.id } },
        include: [{ model: File, as: DBConstants.fields.user.PROFILE_IMAGE }],
      },
      { model: Question },
      {
        model: Message,
        separate: true,
        required: false,
        // where: { userId: { [Op.not]: user.id } },
        limit: 1,
        order: [["createdAt", "DESC"]],
      },
    ],
    ...dbOptions,
  });
  const chats = res.rows;
  //TODO: do this in the query, but here we manually update the fieldName to lastMessage. Should be able to be done with a JOIN in some way
  chats.map((chat, i) => {
    chats[i].setDataValue(
      "lastMessage",
      chat.messages && chat.messages.length > 0 ? chat.messages[0] : undefined
    );

    chats[i].setDataValue("messages", undefined);
  });
  return { count: res.count, rows: chats };
};
