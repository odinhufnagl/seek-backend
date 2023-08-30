"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const sequelize_1 = require("sequelize");
const _1 = require(".");
const classes_1 = require("../../classes");
const constants_1 = require("../../constants");
const db_1 = require("../../services/db/db");
const maps_1 = require("../../services/maps");
const coordinate_1 = __importDefault(require("./coordinate"));
const country_1 = __importDefault(require("./country"));
class Location extends sequelize_1.Model {
    static _init(sequelize) {
        Location.init({
            id: {
                type: core_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            address: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            cityName: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
            postalCode: {
                type: core_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            modelName: "location",
            timestamps: true,
            sequelize,
        });
        Location.beforeCreate((instance, options) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { address, postalCode, cityName, countryCode, coordinate } = instance;
            //if there exists a coordinate and any of these fields are empty we will fetch them ourselves based on the coordinate
            if (coordinate &&
                [address, postalCode, countryCode, cityName].some((p) => !p)) {
                const addressData = yield (0, maps_1.findAddressDataByCoordinate)(coordinate);
                console.log(addressData);
                if (!addressData) {
                    throw new classes_1.ExternalError();
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
                if (countryCode === undefined) {
                    if (!addressData.country) {
                        throw Error();
                    }
                    const foundCountryCode = 
                    //TODO: Maybe do mapping because right now the code used in googleMaps has to be used in the database aswell
                    //should be enough with something like AddressDataCountryCodeToDBCode or something like that and it could probably just be in this model
                    (_a = (yield (0, db_1.dbFindOne)(_1.models.Country, {
                        where: {
                            code: constants_1.CountryCodeConstants.Alpha2CodeToDB(addressData.country.code),
                        },
                    }))) === null || _a === void 0 ? void 0 : _a.code;
                    console.log("foundCountry", foundCountryCode);
                    if (foundCountryCode === undefined) {
                        //country does not exist error
                        throw Error();
                    }
                    instance.countryCode = foundCountryCode;
                }
            }
        }));
    }
    static associate() {
        Location.belongsTo(country_1.default);
        Location.belongsTo(coordinate_1.default);
    }
}
exports.default = Location;
