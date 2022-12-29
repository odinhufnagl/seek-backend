import {
  Model,
  Sequelize,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from "sequelize";
import { DataTypes } from "@sequelize/core";
import Company from "./company";
import Tag from "./tag";
import EmploymentType from "./employmentType";
import WordVector from "./wordVector";
import User from "./user";
import UserJobRating from "./userJobRating";
import PredictedUserJobRating from "./predictedUserJobRating";

class Job extends Model {
  public id!: number;
  public title!: string;
  public companyId!: string;
  public getCompany!: BelongsToGetAssociationMixin<Company>;
  public setCompany!: BelongsToSetAssociationMixin<Company, number>;
  public addTag!: (tag: Tag) => Promise<void>;
  static _init(sequelize: Sequelize): void {
    Job.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        modelName: "job",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    Job.belongsTo(Company, { foreignKey: "companyId", targetKey: "id" });
    Job.belongsTo(WordVector, {
      foreignKey: "titleId",
      targetKey: "id",
      as: "title",
    });
    Job.belongsToMany(Tag, { through: "job_tags" });
    Job.belongsToMany(EmploymentType, { through: "job_employmentTypes" });
    Job.belongsToMany(User, { through: UserJobRating });
    Job.belongsToMany(User, { through: PredictedUserJobRating });
  }
}

export default Job;
