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
exports.findLocationsBySearchWord = exports.findAddressDataByPlaceId = exports.findAddressDataByCoordinate = exports.findCityByCoordinate = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const findCityByCoordinate = (coord) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = constants_1.Endpoints.googleMaps.reverseGeocodeByCoordinate(coord);
        const r = yield (0, axios_1.default)(url);
        console.log("r", r, r.data);
        const data = r.data.results[0];
        return { placeId: data.place_id, title: data.formatted_address };
    }
    catch (e) {
        console.log("e", e);
        return;
    }
});
exports.findCityByCoordinate = findCityByCoordinate;
const findGoogleAddressComponentByType = (addressComponents, type) => {
    return addressComponents.find((component) => component.types.includes(type));
};
const findAddressDataByCoordinate = (coord) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const url = constants_1.Endpoints.googleMaps.reverseGeocodeByCoordinate(coord);
        const r = yield (0, axios_1.default)(url);
        const data = r.data.results[0];
        const addressComponents = data.address_components;
        console.log("addressComponents", addressComponents);
        addressComponents.forEach((c) => console.log(c.types));
        const address = (_a = findGoogleAddressComponentByType(addressComponents, "route")) === null || _a === void 0 ? void 0 : _a.long_name;
        const addressNumber = (_b = findGoogleAddressComponentByType(addressComponents, "street_number")) === null || _b === void 0 ? void 0 : _b.long_name;
        const countryCode = (_c = findGoogleAddressComponentByType(addressComponents, "country")) === null || _c === void 0 ? void 0 : _c.short_name;
        const countryName = (_d = findGoogleAddressComponentByType(addressComponents, "country")) === null || _d === void 0 ? void 0 : _d.long_name;
        return {
            address: address && addressNumber ? `${address} ${addressNumber}` : undefined,
            city: ((_e = findGoogleAddressComponentByType(addressComponents, "locality")) === null || _e === void 0 ? void 0 : _e.long_name) ||
                ((_f = findGoogleAddressComponentByType(addressComponents, "postal_town")) === null || _f === void 0 ? void 0 : _f.long_name) ||
                ((_g = findGoogleAddressComponentByType(addressComponents, "sublocality_level_1")) === null || _g === void 0 ? void 0 : _g.long_name),
            postalCode: (_h = findGoogleAddressComponentByType(addressComponents, "postal_code")) === null || _h === void 0 ? void 0 : _h.long_name,
            country: countryCode && countryName
                ? {
                    code: countryCode,
                    name: countryName,
                }
                : undefined,
            coordinate: {
                latitude: data.geometry.location.lat,
                longitude: data.geometry.location.lng,
            },
        };
    }
    catch (e) {
        console.log("e", e);
        return;
    }
});
exports.findAddressDataByCoordinate = findAddressDataByCoordinate;
const findAddressDataByPlaceId = (placeId) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o, _p, _q, _r;
    try {
        const url = constants_1.Endpoints.googleMaps.reverseGeocodeByPlaceId(placeId);
        const r = yield (0, axios_1.default)(url);
        const data = r.data.results[0];
        const addressComponents = data.address_components;
        const address = (_j = findGoogleAddressComponentByType(addressComponents, "route")) === null || _j === void 0 ? void 0 : _j.long_name;
        const addressNumber = (_k = findGoogleAddressComponentByType(addressComponents, "street_number")) === null || _k === void 0 ? void 0 : _k.long_name;
        const countryCode = (_l = findGoogleAddressComponentByType(addressComponents, "country")) === null || _l === void 0 ? void 0 : _l.short_name;
        const countryName = (_m = findGoogleAddressComponentByType(addressComponents, "country")) === null || _m === void 0 ? void 0 : _m.long_name;
        return {
            address: address && addressNumber ? `${address} ${addressNumber}` : undefined,
            city: ((_o = findGoogleAddressComponentByType(addressComponents, "locality")) === null || _o === void 0 ? void 0 : _o.long_name) ||
                ((_p = findGoogleAddressComponentByType(addressComponents, "postal_town")) === null || _p === void 0 ? void 0 : _p.long_name) ||
                ((_q = findGoogleAddressComponentByType(addressComponents, "sublocality_level_1")) === null || _q === void 0 ? void 0 : _q.long_name),
            postalCode: (_r = findGoogleAddressComponentByType(addressComponents, "postal_code")) === null || _r === void 0 ? void 0 : _r.long_name,
            country: countryCode && countryName
                ? {
                    code: countryCode,
                    name: countryName,
                }
                : undefined,
            coordinate: {
                latitude: data.geometry.location.lat,
                longitude: data.geometry.location.lng,
            },
        };
    }
    catch (e) {
        console.log("e", e);
        return;
    }
});
exports.findAddressDataByPlaceId = findAddressDataByPlaceId;
const findLocationsBySearchWord = (input, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = constants_1.Endpoints.googleMaps.findPlacesBySearchword({
            input,
            types: type && constants_1.ExternalApisConstants.queryParams.googleMaps.SEARCH_TYPE[type],
        });
        const r = yield (0, axios_1.default)(url);
        const locations = r.data.predictions.map((prediction) => ({
            title: prediction.description,
            placeId: prediction.place_id,
        }));
        return locations;
    }
    catch (e) {
        console.log(e);
        return;
    }
});
exports.findLocationsBySearchWord = findLocationsBySearchWord;
