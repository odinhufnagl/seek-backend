import { GOOGLE_MAPS_ENDPOINT } from "../constants";
import axios from "axios";
import { Coordinate, FindPlaceReturn } from "../types";

export const findCityByCoordinate = async (
  coord: Coordinate
): Promise<FindPlaceReturn | undefined> => {
  try {
    console.log(GOOGLE_MAPS_ENDPOINT.REVERSE_GEOCODE_URL(coord));
    const url = GOOGLE_MAPS_ENDPOINT.REVERSE_GEOCODE_URL(coord);

    const r = await axios(url);
    console.log("r", r, r.data);
    const data = r.data.results[0];
    return { placeId: data.place_id, title: data.formatted_address };
  } catch (e) {
    console.log("e", e);
    return;
  }
};

export const findCitiesBySearchWord = async (
  input: string
): Promise<FindPlaceReturn[] | undefined> => {
  try {
    const types = "(cities)";
    const url = GOOGLE_MAPS_ENDPOINT.FIND_PLACES_BY_SEARCHWORD_URL({
      input,
      types,
    });
    const r = await axios(url);
    const cities: FindPlaceReturn[] = r.data.predictions.map(
      (prediction: { description: string; place_id: string }) => ({
        title: prediction.description,
        placeId: prediction.place_id,
      })
    );
    return cities;
  } catch (e) {
    console.log(e);
    return;
  }
};
