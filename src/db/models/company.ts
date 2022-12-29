import {
  Model,
  Sequelize,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";
import { DataTypes } from "@sequelize/core";
import { models, sequelize } from ".";
import Job from "./job";

class Company extends Model {
  public id!: number;
  public title!: string;
  public companyId!: string;
  public getJobs!: HasManyGetAssociationsMixin<Job>;
  public setJobs!: HasManySetAssociationsMixin<Job, number>;
  static _init(sequelize: Sequelize) {
    Company.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        companyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        modelName: "company",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    Company.hasMany(Job);
  }
}

export default Company;
