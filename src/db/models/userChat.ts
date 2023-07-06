import { DataTypes, Model, Sequelize } from "sequelize";
import Chat from "./chat";

class UserChat extends Model {
  public userId!: number;
  public chatId!: number;
  public isInformed!: boolean;

  static _init(sequelize: Sequelize): void {
    UserChat.init(
      {
        isInformed: {
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
  }
}

export default UserChat;
