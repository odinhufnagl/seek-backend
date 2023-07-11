import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import Answer from "./answer";
import File from "./file";
import User from "./user";
import UserQuestion from "./userQuestion";

class Question extends Model {
  public id!: number;
  public title!: string;
  public coverImage?: File;
  public coverImageId?: number;
  public isFinished!: boolean;
  public timeToStart!: string;

  static _init(sequelize: Sequelize): void {
    Question.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isFinished: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        timeToStart: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        modelName: "question",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    Question.belongsTo(File, {
      as: DBConstants.fields.question.COVER_IMAGE,
    });
    Question.belongsToMany(User, {
      through: Answer,
      as: DBConstants.fields.question.ANSWERS,
    });
    Question.belongsToMany(User, { through: UserQuestion });
    Question.hasMany(Answer);
  }
}

export default Question;
