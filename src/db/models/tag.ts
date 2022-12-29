import { Association, Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";
import WordVector from "./wordVector";
import Job from "./job";
import User from "./user";

class Tag extends Model {
  public id!: number;
  public addTag!: (tag: Tag) => Promise<void>;
  static _init(sequelize: Sequelize) {
    Tag.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        modelName: "tag",
        timestamps: true,
        sequelize,
      }
    );
  }
  public static associations: {
    name: Association<Tag, WordVector>;
  };
  static associate() {
    Tag.belongsTo(WordVector, {
      foreignKey: "nameId",
      targetKey: "id",
      as: "name",
    });
    Tag.belongsToMany(User, { through: "user_tags" });
  }
}

export default Tag;
