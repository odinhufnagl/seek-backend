import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { DBConstants } from "../../constants";
import FileType from "./fileType";

class File extends Model {
  public id!: number;
  public name?: string;
  public url!: string;
  public type!: FileType;
  static _init(sequelize: Sequelize) {
    File.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        typeName: {
          type: DataTypes.STRING,
          defaultValue: DBConstants.defaultValues.file.TYPE_NAME_PK,
        },
      },
      {
        modelName: "file",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    File.belongsTo(FileType, {
      as: DBConstants.fields.file.TYPE,
    });
  }
}

export default File;
