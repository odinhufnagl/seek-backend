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
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../../classes");
const maps_1 = require("../../../services/maps");
const getCountryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.query.place_id;
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    if (placeId) {
        const location = yield (0, maps_1.findAddressDataByPlaceId)(placeId);
        return res.send(location === null || location === void 0 ? void 0 : location.country);
    }
    if (lat === undefined || lng === undefined) {
        throw new classes_1.ApiNoBodyProvidedError();
    }
    const coord = {
        latitude: lat,
        longitude: lng,
    };
    const location = yield (0, maps_1.findAddressDataByCoordinate)(coord);
    res.send(location === null || location === void 0 ? void 0 : location.country);
});
const getLocationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.query.place_id;
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    if (placeId) {
        const location = yield (0, maps_1.findAddressDataByPlaceId)(placeId);
        return res.send(location);
    }
    if (lat === undefined || lng === undefined) {
        throw new classes_1.ApiNoBodyProvidedError();
    }
    const coord = {
        latitude: lat,
        longitude: lng,
    };
    const location = yield (0, maps_1.findAddressDataByCoordinate)(coord);
    res.send(location);
});
const getLocationsBySearchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchInput = req.query.search_query;
    const type = req.query.type;
    if (!searchInput) {
        throw new classes_1.ApiQueryParamsError();
    }
    if (type) {
        const locations = yield (0, maps_1.findLocationsBySearchWord)(searchInput, type);
        return res.send(locations);
    }
    const locations = yield (0, maps_1.findLocationsBySearchWord)(searchInput);
    res.send(locations);
});
exports.default = {
    getCountryController,
    getLocationController,
    getLocationsBySearchController,
};
