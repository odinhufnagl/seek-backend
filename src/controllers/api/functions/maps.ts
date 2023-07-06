import { Response } from "express";
import { ApiNoBodyProvidedError } from "../../../classes";

import {
  findAddressDataByCoordinate,
  findAddressDataByPlaceId,
  findLocationsBySearchWord,
} from "../../../services/maps";
import {
  Request,
  Coordinate,
  RequestCitySearch,
  RequestCountry,
  RequestAddress,
} from "../../../types";

const getCountryController = async (req: RequestCountry, res: Response) => {
  const placeId = req.query.place_id;
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);

  if (placeId) {
    const location = await findAddressDataByPlaceId(placeId);
    return res.send(location?.country);
  }
  if (lat === undefined || lng === undefined) {
    throw new ApiNoBodyProvidedError();
  }
  const coord: Coordinate = {
    latitude: lat,
    longitude: lng,
  };

  const location = await findAddressDataByCoordinate(coord);
  res.send(location?.country);
};

const getLocationController = async (req: RequestAddress, res: Response) => {
  const placeId = req.query.place_id;
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);

  if (placeId) {
    const location = await findAddressDataByPlaceId(placeId);
    return res.send(location);
  }
  if (lat === undefined || lng === undefined) {
    throw new ApiNoBodyProvidedError();
  }
  const coord: Coordinate = {
    latitude: lat,
    longitude: lng,
  };

  const location = await findAddressDataByCoordinate(coord);
  res.send(location);
};

const getLocationsBySearchController = async (
  req: RequestCitySearch,
  res: Response
) => {
  const searchInput = req.query.search_query;
  const type = req.query.type;
  if (!searchInput) {
    throw new ApiNoBodyProvidedError();
  }
  if (type) {
    const locations = await findLocationsBySearchWord(searchInput, type);
    return res.send(locations);
  }
  const locations = await findLocationsBySearchWord(searchInput);
  res.send(locations);
};

export default {
  getCountryController,
  getLocationController,
  getLocationsBySearchController,
};
