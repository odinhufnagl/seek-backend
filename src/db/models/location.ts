import { DataTypes } from "@sequelize/core";
import { Model, Sequelize } from "sequelize";
import { models } from ".";
import { ExternalError } from "../../classes";
import { dbFindOne } from "../../services/db/db";
import { findAddressDataByCoordinate } from "../../services/maps";
import Coordinate from "./coordinate";
import Country from "./country";

class Location extends Model {
  public id!: number;
  public address?: string;
  public cityName?: string;
  public postalCode?: string;
  public countryId!: number;
  public coordinateId?: number;
  public coordinate?: Coordinate;

  static _init(sequelize: Sequelize): void {
    Location.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cityName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        postalCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        modelName: "location",
        timestamps: true,
        sequelize,
      }
    );
    Location.beforeCreate(async (instance, options) => {
      const { address, postalCode, cityName, countryId, coordinate } = instance;

      //if there exists a coordinate and any of these fields are empty we will fetch them ourselves based on the coordinate
      if (
        coordinate &&
        [address, postalCode, countryId, cityName].some((p) => !p)
      ) {
        const addressData = await findAddressDataByCoordinate(coordinate);
        console.log(addressData);
        if (!addressData) {
          throw new ExternalError();
        }
        if (!address) {
          instance.address = addressData.address;
        }
        if (!postalCode) {
          instance.postalCode = addressData.postalCode;
        }
        if (!cityName) {
          instance.cityName = addressData.city;
        }
        if (countryId === undefined) {
          if (!addressData.country) {
            throw Error();
          }
          const foundCountryId =
            //TODO: Maybe do mapping because right now the code used in googleMaps has to be used in the database aswell
            //should be enough with something like AddressDataCountryCodeToDBCode or something like that and it could probably just be in this model
            (
              await dbFindOne(models.Country, {
                where: { code: addressData.country.code },
              })
            )?.id;
          console.log("foundCountry", foundCountryId);
          if (foundCountryId === undefined) {
            //country does not exist error
            throw Error();
          }
          instance.countryId = foundCountryId;
        }
      }
    });
  }
  static associate() {
    Location.belongsTo(Country);
    Location.belongsTo(Coordinate);
  }
}

export default Location;
