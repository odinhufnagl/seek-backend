import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";

class Language extends Model {
  public name!: string;

  static _init(sequelize: Sequelize): void {
    Language.init(
      {
        name: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
      },
      {
        modelName: "language",
        timestamps: true,
        sequelize,
      }
    );
  }
}

export default Language;
