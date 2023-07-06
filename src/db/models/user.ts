import { DataTypes } from "@sequelize/core";
import { HasManyGetAssociationsMixin, Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import Answer from "./answer";
import Chat from "./chat";
import File from "./file";
import Message from "./message";
import Question from "./question";
import ReadMessage from "./readMessage";
import UserChat from "./userChat";

class User extends Model {
  public id!: number;
  public email!: string;
  public password?: string;
  public name!: string;
  public profileImage?: File;
  public profileImageId?: number;
  public bio?: string;
  public instagramName?: string;
  public snapchatName?: string;
  public isActive!: boolean;
  public lastActive!: Date;
  public getChats!: HasManyGetAssociationsMixin<Chat>;

  public static fields = DBConstants.fields.user;

  static _init(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [7, 100],
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        instagramName: {
          type: DataTypes.STRING,
        },
        snapchatName: {
          type: DataTypes.STRING,
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        lastActive: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn("now"),
        },
      },
      {
        modelName: "user",
        timestamps: true,
        sequelize,
        defaultScope: {
          attributes: { exclude: ["password"] },
        },
      }
    );
  }
  static associate() {
    User.belongsTo(File, {
      as: this.fields.PROFILE_IMAGE,
    });
    User.belongsToMany(Chat, { through: UserChat });
    User.belongsToMany(Message, { through: ReadMessage });
    User.belongsToMany(Question, { through: Answer });
  }
}

export default User;
