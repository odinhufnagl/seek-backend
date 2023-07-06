import { Association, Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";

class Coordinate extends Model {
  public id!: number;
  public latitude!: number;
  public longitude!: number;
  static _init(sequelize: Sequelize) {
    Coordinate.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        latitude: {
          type: DataTypes.FLOAT,
        },
        longitude: {
          type: DataTypes.FLOAT,
        },
      },
      {
        modelName: "coordinate",
        timestamps: true,
        sequelize,
      }
    );
  }
}

export default Coordinate;
