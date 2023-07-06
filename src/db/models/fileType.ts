import { Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";

class FileType extends Model {
  public name!: string;

  static _init(sequelize: Sequelize) {
    FileType.init(
      {
        name: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
      },
      {
        modelName: "fileType",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {}
}

export default FileType;
