import { Coordinate, LocationSearchType } from "../types";

const GOOGLE_API_PATH = `https://maps.googleapis.com/maps/api`;
const MACHINE_LEARNING_PATH = `http://127.0.0.1:5000`;
const APP_PATH = "blip://";

const endpointsCoogleMaps = {
  reverseGeocodeByCoordinate: ({ latitude, longitude }: Coordinate) =>
    `${GOOGLE_API_PATH}/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  reverseGeocodeByPlaceId: (placeId: string) =>
    `${GOOGLE_API_PATH}/geocode/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  findPlacesBySearchword: ({
    input,
    types,
  }: {
    input: string;
    types?: string;
  }) =>
    //TODO: just lazy, makes this nicer
    types
      ? `${GOOGLE_API_PATH}/place/autocomplete/json?input=${input}&inputtype=textquery&types=${types}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      : `${GOOGLE_API_PATH}/place/autocomplete/json?input=${input}&inputtype=textquery&key=${process.env.GOOGLE_MAPS_API_KEY}`,
};

const endpointsMachineLearning = {
  sentenceToVec: `${MACHINE_LEARNING_PATH}/sentence_to_vec`,
  updatePredictions: (userId: number) =>
    `${MACHINE_LEARNING_PATH}/update_predictions/${userId}`,
};

const endpointsFileStorage = {
  uploadFile: (destination: string, token: string) =>
    `https://firebasestorage.googleapis.com/v0/b/${
      process.env.FIREBASE_STORAGE_BUCKET
    }/o/${encodeURIComponent(destination)}?alt=media&token=${token}`,
};

interface QueryParams {
  googleMaps: {
    SEARCH_TYPE: Record<LocationSearchType, string>;
  };
}

const queryParams: QueryParams = {
  googleMaps: {
    SEARCH_TYPE: {
      cities: "(cities)",
      regions: "(regions)",
      address: "address",
    },
  },
};

const endpointsApp = {
  albumLink: (code: string) => `${APP_PATH}albumScan/${code}`,
};

export class ExternalApisConstants {
  public static queryParams = queryParams;
}

export class Endpoints {
  public static googleMaps = endpointsCoogleMaps;
  public static machineLearning = endpointsMachineLearning;
  public static firebaseFileStorage = endpointsFileStorage;
  public static app = endpointsApp;
}
