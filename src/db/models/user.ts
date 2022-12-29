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
import Job from "./job";
import UserJobRating from "./userJobRating";
import PredictedUserJobRating from "./predictedUserJobRating";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public tags!: Tag[];
  public addTag!: (tag: Tag) => Promise<void>;

  static _init(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [7, 100],
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        modelName: "user",
        timestamps: true,
        sequelize,
      }
    );
  }
  static associate() {
    User.belongsToMany(Tag, { through: "user_tags" });
    User.belongsToMany(EmploymentType, {
      through: "User_EmploymentTypes",
    });
    User.belongsToMany(Job, { through: UserJobRating });
    User.belongsToMany(PredictedUserJobRating, {
      through: Job,
      as: "predictedRatings",
    });
  }
}

export default User;
