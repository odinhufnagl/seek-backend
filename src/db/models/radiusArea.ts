import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import Area from "./area";

class RadiusArea extends Model {
  public id!: number;
  public coordinateId!: number;
  public radius?: number;

  static _init(sequelize: Sequelize): void {
    RadiusArea.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        radius: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
      },
      {
        modelName: "radiusArea",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    RadiusArea.hasMany(Area, {
      foreignKey: DBConstants.fields.area.SUB_TYPE_ID,
      constraints: false,
      scope: { type: DBConstants.fieldTypes.area.type.RADIUS },
    });
  }
}

export default RadiusArea;
