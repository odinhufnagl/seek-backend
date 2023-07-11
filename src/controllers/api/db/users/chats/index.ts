import { Response } from "express";
import { Op, literal } from "sequelize";
import { BaseController } from "../../../../../classes";
import { DBConstants } from "../../../../../constants";
import {
  Chat,
  File,
  Message,
  Question,
  User,
  UserChat,
} from "../../../../../db/models";
import { dbFindOne } from "../../../../../services";
import { Request, ResponseBodyChat } from "../../../../../types";
const controller = new BaseController<User, Chat>(User, "user");
//TODO: check places where we use SQL and check so there is no injections available
const getChats = controller.getNtoM(async (user) => {
  const chats: ResponseBodyChat = await user.getChats({
    replacements: { userId: user.id },
    attributes: {
      include: [
        [
          literal(`(
                    SELECT COUNT(*)
                    FROM messages AS message
                    LEFT JOIN "readMessages" AS readmessage ON message.id = readmessage."messageId" AND readmessage."userId" = :userId
                    WHERE message."chatId" = chat.id AND message."userId" != :userId AND (readmessage IS NULL)
                )`),
          "unreadMessagesCount",
        ],
      ],
    },
    include: [
      {
        model: User,
        where: { id: { [Op.not]: user.id } },
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
  });

  //TODO: do this in the query, but here we manually update the fieldName to lastMessage. Should be able to be done with a JOIN in some way
  chats.map((chat, i) => {
    chats[i].setDataValue(
      "lastMessage",
      chat.messages && chat.messages.length > 0 ? chat.messages[0] : undefined
    );

    chats[i].setDataValue("messages", undefined);
  });
  return chats;
});

const getNewChat = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  const userChat = await dbFindOne(UserChat, {
    where: { isInformed: false, isInvited: true, userId },
    order: ["createdAt", "DESC"],
    include: [{ model: Chat }],
  });
  res.send(userChat?.chat);
};

export default { getChats, getNewChat };
