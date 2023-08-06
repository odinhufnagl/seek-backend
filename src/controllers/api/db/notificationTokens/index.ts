import { BaseController } from "../../../../classes";
import { NotificationToken } from "../../../../db/models";

const controller = new BaseController(NotificationToken, "notificationToken");
const getNotificationTokens = controller.getPlural();
const getNotificationTokenByPK = controller.get();
const postNotificationToken = controller.post();
const deleteNotificationTokens = controller.delete();

export default {
  postNotificationToken,
  getNotificationTokens,
  getNotificationTokenByPK,
  deleteNotificationTokens,
};
