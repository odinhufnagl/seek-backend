import { Sequelize } from "sequelize";
import { DataTypes } from "@sequelize/core";

const user = (sequelize: Sequelize) => {
  const User = sequelize.define(
    "user",
    {
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
      timestamps: true,
    }
  );

  return User;
};

export default user;
