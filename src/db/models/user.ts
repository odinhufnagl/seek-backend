import { DataTypes } from "@sequelize/core";
import { compareSync, hashSync } from "bcryptjs";
import { HasManyGetAssociationsMixin, Model, Sequelize } from "sequelize";
import { DBConstants, FIRST_TIME_ZONE } from "../../constants";
import Answer from "./answer";
import Chat from "./chat";
import File from "./file";
import Language from "./language";
import Location from "./location";
import Message from "./message";
import NotificationToken from "./notificationToken";
import Question from "./question";
import ReadMessage from "./readMessage";
import UserBlocking from "./userBlocking";
import UserChat from "./userChat";
import UserQuestion from "./userQuestion";

class User extends Model {
  public id!: number;
  public email!: string;
  public password?: string;
  public name!: string;
  public profileImage?: File;
  public profileImageId?: number;
  public bio?: string;
  public resetPasswordToken?: string;
  public instagramName?: string;
  public snapchatName?: string;
  public isActive!: boolean;
  public lastActive!: string;
  public timeZone!: string;
  public answers!: Answer[];
  public currentLocation?: Location;
  public location?: Location;
  public locationId?: number;
  public notificationTokens!: NotificationToken[];
  public language!: Language;
  public languageName!: string;
  public isBlockedBy!: User[];
  public hasBlocked!: User[];
  public userChat?: UserChat;

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
            len: [5, 100],
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
        timeZone: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: FIRST_TIME_ZONE,
        },
        languageName: {
          type: DataTypes.STRING,
          defaultValue: "en",
        },
        resetPasswordToken: {
          type: DataTypes.STRING,
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
    User.beforeCreate(async (user) => {
      if (user.password) {
        user.password = await user.hashPassword(user.password);
      }
    });
  }
  validatePassword = async (password: string, encryptedPassword: string) => {
    return await compareSync(password, encryptedPassword);
  };
  hashPassword = async (newPassword: string) => {
    return await hashSync(newPassword);
  };

  static associate() {
    User.belongsTo(File, {
      as: this.fields.PROFILE_IMAGE,
    });
    User.belongsToMany(Chat, { through: UserChat });
    User.belongsToMany(Message, { through: ReadMessage });
    User.belongsToMany(Question, { through: UserQuestion });
    User.belongsToMany(Question, { through: Answer, as: this.fields.ANSWERS });
    User.belongsTo(Location, { as: this.fields.CURRENT_LOCATION });
    User.belongsTo(Location);
    User.hasMany(Answer);
    User.hasMany(NotificationToken);
    User.belongsTo(Language);
    User.belongsToMany(User, {
      through: UserBlocking,
      as: this.fields.IS_BLOCKED_BY,
      foreignKey: DBConstants.fields.userBlocking.BLOCKED_ID,
    });
    User.belongsToMany(User, {
      through: UserBlocking,
      as: this.fields.HAS_BLOCKED,
      foreignKey: DBConstants.fields.userBlocking.BLOCKER_ID,
    });
  }
}

export default User;
