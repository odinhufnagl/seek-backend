import { DataTypes, Model, Sequelize } from "sequelize";
import Question from "./question";
import User from "./user";

class UserQuestion extends Model {
  public userId!: number;
  public questionId!: number;
  public isInformed!: boolean;
  public isInvited!: boolean;

  static _init(sequelize: Sequelize): void {
    UserQuestion.init(
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
        modelName: "userQuestion",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    UserQuestion.belongsTo(Question);
    UserQuestion.belongsTo(User);
  }
}

export default UserQuestion;
