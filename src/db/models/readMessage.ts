import { Model, Sequelize } from "sequelize";

class ReadMessage extends Model {
  public userId!: number;
  public messageId!: number;

  static _init(sequelize: Sequelize): void {
    ReadMessage.init(
      {},
      {
        modelName: "readMessage",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {}
}

export default ReadMessage;
