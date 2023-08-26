import { DataTypes, Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import User from "./user";

class UserBlocking extends Model {
  public blockerId!: number;
  public blocker!: User;
  public blockedId!: number;
  public blocked!: User;

  static _init(sequelize: Sequelize): void {
    UserBlocking.init(
      {
        blockerId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        blockedId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        modelName: "userBlocking",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    UserBlocking.belongsTo(User, {
      as: DBConstants.fields.userBlocking.BLOCKED,
      foreignKey: DBConstants.fields.userBlocking.BLOCKED_ID,
    });
    UserBlocking.belongsTo(User, {
      as: DBConstants.fields.userBlocking.BLOCKER,
      foreignKey: DBConstants.fields.userBlocking.BLOCKER_ID,
    });
  }
}

export default UserBlocking;
