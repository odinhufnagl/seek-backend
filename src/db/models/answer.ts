import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import Area from "./area";
import Question from "./question";
import User from "./user";

class Answer extends Model {
  public id!: number;
  public questionId!: number;
  public userId!: number;
  public text!: string;
  public locationId?: number;
  public areaId!: number;
  public isPrivate!: boolean;

  static _init(sequelize: Sequelize): void {
    Answer.init(
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
        questionId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        text: {
          type: DataTypes.TEXT("long"),
          allowNull: true,
        },
        isPrivate: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "answer",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    Answer.belongsTo(Question);
    Answer.belongsTo(User);
    Answer.belongsTo(Area);
  }
}

export default Answer;
