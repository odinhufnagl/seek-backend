import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import Answer from "./answer";
import File from "./file";
import User from "./user";

class Question extends Model {
  public id!: number;
  public title!: string;
  public coverImage?: File;
  public coverImageId?: number;

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
    Question.belongsToMany(User, { through: Answer });
    Question.hasMany(Answer);
  }
}

export default Question;
