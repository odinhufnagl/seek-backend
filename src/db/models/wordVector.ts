import { Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";
import { sentenceToVec } from "../../services";

class WordVector extends Model {
  public id!: number;
  public word!: string;
  public vector!: number[];
  static _init(sequelize: Sequelize): void {
    WordVector.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        word: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        vector: {
          type: DataTypes.ARRAY(DataTypes.DECIMAL),
          allowNull: true,
        },
      },
      {
        modelName: "wordVector",
        timestamps: true,
        sequelize,
      }
    );
    WordVector.beforeCreate(async (instance, options) => {
      const vector = await sentenceToVec(instance.word);
      if (!vector) {
        throw new Error();
      }
      instance.vector = vector;
    });
  }
}

export default WordVector;
