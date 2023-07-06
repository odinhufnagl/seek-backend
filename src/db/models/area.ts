import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import CountryArea from "./countryArea";
import RadiusArea from "./radiusArea";

class Area extends Model {
  public id!: number;
  public type!: string;
  public subTypeId?: number;

  static _init(sequelize: Sequelize): void {
    Area.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: DBConstants.fieldTypes.area.type.WORLD,
        },
      },
      {
        modelName: "area",
        timestamps: true,
        sequelize,
      }
    );
    Area.addHook("afterFind", (findResult: any) => {
      if (!Array.isArray(findResult)) findResult = [findResult];
      for (const instance of findResult) {
        if (
          instance.type === DBConstants.fieldTypes.area.type.RADIUS &&
          instance.radiusArea !== undefined
        ) {
          instance.subType = instance.radiusArea;
        } else if (
          instance.type === DBConstants.fieldTypes.area.type.COUNTRY &&
          instance.countryArea !== undefined
        ) {
          instance.subType = instance.countryArea;
        }
        // To prevent mistakes:
        delete instance.radiusArea;
        delete instance.dataValues.radiusArea;
        delete instance.countryArea;
        delete instance.dataValues.countryArea;
      }
    });
  }

  static associate() {
    Area.belongsTo(CountryArea, {
      foreignKey: DBConstants.fields.area.SUB_TYPE_ID,
      constraints: false,
    });

    Area.belongsTo(RadiusArea, {
      foreignKey: DBConstants.fields.area.SUB_TYPE_ID,
      constraints: false,
    });
  }
}

export default Area;
