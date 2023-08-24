"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = exports.ExternalApisConstants = void 0;
const GOOGLE_API_PATH = `https://maps.googleapis.com/maps/api`;
const MACHINE_LEARNING_PATH = `http://127.0.0.1:5000`;
const APP_PATH = "blip://";
const endpointsCoogleMaps = {
    reverseGeocodeByCoordinate: ({ latitude, longitude }) => `${GOOGLE_API_PATH}/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    reverseGeocodeByPlaceId: (placeId) => `${GOOGLE_API_PATH}/geocode/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    findPlacesBySearchword: ({ input, types, }) => 
    //TODO: just lazy, makes this nicer
    types
        ? `${GOOGLE_API_PATH}/place/autocomplete/json?input=${input}&inputtype=textquery&types=${types}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        : `${GOOGLE_API_PATH}/place/autocomplete/json?input=${input}&inputtype=textquery&key=${process.env.GOOGLE_MAPS_API_KEY}`,
};
const endpointsMachineLearning = {
    sentenceToVec: `${MACHINE_LEARNING_PATH}/sentence_to_vec`,
    updatePredictions: (userId) => `${MACHINE_LEARNING_PATH}/update_predictions/${userId}`,
};
const endpointsFileStorage = {
    uploadFile: (destination, token) => `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(destination)}?alt=media&token=${token}`,
};
const queryParams = {
    googleMaps: {
        SEARCH_TYPE: {
            cities: "(cities)",
            regions: "(regions)",
            address: "address",
        },
    },
};
const endpointsApp = {
    albumLink: (code) => `${APP_PATH}albumScan/${code}`,
};
class ExternalApisConstants {
}
exports.ExternalApisConstants = ExternalApisConstants;
ExternalApisConstants.queryParams = queryParams;
class Endpoints {
}
exports.Endpoints = Endpoints;
Endpoints.googleMaps = endpointsCoogleMaps;
Endpoints.machineLearning = endpointsMachineLearning;
Endpoints.firebaseFileStorage = endpointsFileStorage;
Endpoints.app = endpointsApp;
