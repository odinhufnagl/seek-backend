import { Request, Response } from "express";

import axios from "axios";
import { GOOGLE_MAPS_ENDPOINT } from "../constants";
import { sendServerErrorMessage } from "../utils";
import { findCitiesBySearchWord, findCityByCoordinate } from "../services/maps";

export const searchCities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { input } = req.query;

    const cities = await findCitiesBySearchWord(input as string);
    console.log("cities", cities);
    res.send();
    return;
  } catch (e) {
    sendServerErrorMessage(res, e);
  }
};

export const getCityByCoordinate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { latitude, longitude } = req.query;
    const city = await findCityByCoordinate({
      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,
    });
    console.log("city", city);
    res.send();
    return;
  } catch (e) {
    console.log(e);
    sendServerErrorMessage(res, e);
  }
};

export default { searchCities, getCityByCoordinate };
