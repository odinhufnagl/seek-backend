import { Coordinate } from "../types";

const GOOGLE_API_PATH = `https://maps.googleapis.com/maps/api`;
const MACHINE_LEARNING_PATH = `http://127.0.0.1:5000`;

export const GOOGLE_MAPS_ENDPOINT = {
  REVERSE_GEOCODE_URL: ({ latitude, longitude }: Coordinate) =>
    `${GOOGLE_API_PATH}/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  FIND_PLACES_BY_SEARCHWORD_URL: ({
    input,
    types,
  }: {
    input: string;
    types: string;
  }) =>
    `${GOOGLE_API_PATH}/place/autocomplete/json?input=${input}&inputtype=textquery&types=${types}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
};

export const MACHINE_LEARNING_ENDPOINT = {
  SENTENCE_TO_VEC: (sentence: string) =>
    `${MACHINE_LEARNING_PATH}/sentence_to_vec/${sentence}`,
};
