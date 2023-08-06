import * as admin from "firebase-admin";

import { Op } from "sequelize";
import { NotificationToken, User } from "../db/models";
import { Notification } from "../types";
import { dbFindAll } from "./db/db";

const sendNotification = async (
  tokens: string[],
  notification: Notification
): Promise<boolean> => {
  try {
    console.log("hello world");
    const res = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: notification.payLoad.notification,
      data: notification.payLoad.data,
    });
    console.log("res", res.responses[0].error);
    return Boolean(res);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const subscribeToTopic = async (
  token: string | string[],
  topic: string
): Promise<boolean> => {
  try {
    const res = await admin.messaging().subscribeToTopic(token, topic);
    return Boolean(res);
  } catch (e) {
    console.log(e);
    return false;
  }
};
const unsubscribeFromTopic = async (
  token: string | string[],
  topic: string
): Promise<boolean> => {
  try {
    const res = await admin.messaging().unsubscribeFromTopic(token, topic);
    return Boolean(res);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const sendNotificationToUsers = async (
  userIds: number[],
  notification: (user: User) => Notification
): Promise<boolean> => {
  const users = await dbFindAll(User, {
    where: { id: { [Op.in]: userIds } },
    include: [{ model: NotificationToken }],
  });
  if (!users) {
    return false;
  }
  //TODO: make this more effective, like grouping the ones with same language etc...
  for (const user of users) {
    console.log("user", user);
    const tokens = user.notificationTokens.map((t) => t.name);
    console.log("tokens", tokens);
    sendNotification(tokens, notification(user));
  }
  return true;
};

export {
  sendNotification,
  sendNotificationToUsers,
  subscribeToTopic,
  unsubscribeFromTopic,
};
