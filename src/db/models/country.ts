import { Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";

class Country extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  static _init(sequelize: Sequelize) {
    Country.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        code: {
          type: DataTypes.STRING,
        },
      },
      {
        modelName: "country",
        timestamps: true,
        sequelize,
      }
    );
  }
}

export default Country;
