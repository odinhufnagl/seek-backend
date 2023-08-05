import { DataTypes, Model, Sequelize } from "sequelize";
import Chat from "./chat";
import User from "./user";

class UserChat extends Model {
  public id!: number;
  public userId!: number;
  public chatId!: number;
  public chat!: Chat;
  public isInformed!: boolean;
  public isInvited!: boolean;
  public lastRead!: Date;

  static _init(sequelize: Sequelize): void {
    UserChat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        chatId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        isInformed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isInvited: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        lastRead: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        modelName: "userChat",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    UserChat.belongsTo(Chat);
    UserChat.belongsTo(User);
  }
}

export default UserChat;
