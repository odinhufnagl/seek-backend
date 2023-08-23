import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import File from "./file";

class QuestionContent extends Model {
  public id!: number;
  public title!: string;
  public coverImage?: File;
  public coverImageId?: number;
  public used!: boolean;

  static _init(sequelize: Sequelize): void {
    QuestionContent.init(
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
        used: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        modelName: "questionContent",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    QuestionContent.belongsTo(File, {
      as: DBConstants.fields.questionContent.COVER_IMAGE,
    });
  }
}

export default QuestionContent;
