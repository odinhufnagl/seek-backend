import * as admin from "firebase-admin";

import { Op } from "sequelize";
import { NotificationToken, User } from "../db/models";
import { Notification } from "../types";
import { dbFindAll } from "./db/db";

const sendNotification = async (
  tokens: string[] | string,
  notification: Notification
): Promise<boolean> => {
  try {
    const res = await admin
      .messaging()
      .sendToDevice(tokens, notification.payLoad, notification.options);
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
    const tokens = user.notificationTokens.map((t) => t.name);
    sendNotification(tokens, notification(user));
  }
  return true;
};

export {
  sendNotification,
  subscribeToTopic,
  unsubscribeFromTopic,
  sendNotificationToUsers,
};
