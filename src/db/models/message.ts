import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import Chat from "./chat";
import ReadMessage from "./readMessage";
import User from "./user";

class Message extends Model {
  public id!: number;
  public text!: string;
  public userId!: number;
  public chatId!: number;
  public chat?: Chat;

  static _init(sequelize: Sequelize): void {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: DataTypes.TEXT("long"),
          allowNull: true,
        },
      },
      {
        modelName: "message",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    Message.belongsTo(Chat);
    Message.belongsTo(User);
    Message.belongsToMany(User, { through: ReadMessage });
    Message.hasMany(ReadMessage);
  }
}

export default Message;
