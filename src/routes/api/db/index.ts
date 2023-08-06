import { Router } from "express";
import answersRoutes from "./answers";
import chatsRoutes from "./chats";
import messagesRoutes from "./messages";
import notificationTokensRoutes from "./notificationTokens";
import questionsRoutes from "./questions";
import readMessagesRoutes from "./readMessages";
import userChatsRoutes from "./userChats";
import usersRoutes from "./users";
const dbRouter = Router({ mergeParams: true });

dbRouter.use("/users", usersRoutes);
dbRouter.use("/questions", questionsRoutes);
dbRouter.use("/answers", answersRoutes);
dbRouter.use("/messages", messagesRoutes);
dbRouter.use("/chats", chatsRoutes);
dbRouter.use("/userChats", userChatsRoutes);
dbRouter.use("/readMessages", readMessagesRoutes);
dbRouter.use("/notificationTokens", notificationTokensRoutes);

export default dbRouter;
