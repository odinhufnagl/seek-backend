import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";

class Country extends Model {
  public name!: string;
  public code!: string;
  static _init(sequelize: Sequelize) {
    Country.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
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
