import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import User from "./user";

//TODO: maybe make this many-to-many with user so it is not tied to user
class NotificationToken extends Model {
  public name!: string;
  public userId!: number;
  static _init(sequelize: Sequelize) {
    NotificationToken.init(
      {
        name: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
      },
      {
        modelName: "notificationToken",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    NotificationToken.belongsTo(User);
  }
}

export default NotificationToken;
