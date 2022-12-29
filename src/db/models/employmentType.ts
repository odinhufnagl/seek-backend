import { Model, Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";
import Job from "./job";
import User from "./user";

class EmploymentType extends Model {
  public id!: number;
  public name!: number;
  static _init(sequelize: Sequelize) {
    EmploymentType.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        modelName: "employmentType",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    EmploymentType.belongsToMany(Job, { through: "Job_EmploymentTypes" });
    EmploymentType.belongsToMany(User, { through: "User_EmploymentTypes" });
  }
}

export default EmploymentType;
