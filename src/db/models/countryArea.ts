import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import Area from "./area";
import Country from "./country";

class CountryArea extends Model {
  public id!: number;
  public countryId!: number;

  static _init(sequelize: Sequelize): void {
    CountryArea.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        modelName: "countryArea",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    CountryArea.hasMany(Area, {
      foreignKey: DBConstants.fields.area.SUB_TYPE_ID,
      constraints: false,
      scope: {
        type: DBConstants.fieldTypes.area.type.COUNTRY,
      },
    });
    CountryArea.belongsTo(Country);
  }
}

export default CountryArea;
