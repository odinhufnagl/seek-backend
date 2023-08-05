import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import Message from "./message";
import Question from "./question";
import User from "./user";
import UserChat from "./userChat";

class Chat extends Model {
  public id!: number;
  public questionId!: number;
  public question!: Question;
  public messages?: Message[];
  public userChats!: UserChat[];
  public users!: User[];
  public timeToStart!: string;

  static _init(sequelize: Sequelize): void {
    Chat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        timeToStart: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        modelName: "chat",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    Chat.belongsTo(Question);
    Chat.belongsToMany(User, { through: UserChat });
    Chat.hasMany(UserChat);
    Chat.hasMany(Message);
  }
}

export default Chat;
