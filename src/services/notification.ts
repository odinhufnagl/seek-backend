import * as admin from "firebase-admin";

import { INotification, NotificationData } from "../types";

const sendNotification = async (
  notification: INotification
): Promise<boolean> => {
  try {
    const res = await admin
      .messaging()
      .send(notification as admin.messaging.Message);
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
export { sendNotification, subscribeToTopic, unsubscribeFromTopic };
