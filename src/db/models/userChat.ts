import { DataTypes, Model, Sequelize } from "sequelize";
import Chat from "./chat";
import User from "./user";

class UserChat extends Model {
  public userId!: number;
  public chatId!: number;
  public chat!: Chat;
  public isInformed!: boolean;
  public isInvited!: boolean;

  static _init(sequelize: Sequelize): void {
    UserChat.init(
      {
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
