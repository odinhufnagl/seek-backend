import axios from "axios";
import {
  Endpoints,
  ExternalApisConstants,
  GoogleAddressComponentType,
} from "../constants";
import { Coordinate, FindPlaceReturn, LocationSearchType } from "../types";

export const findCityByCoordinate = async (
  coord: Coordinate
): Promise<FindPlaceReturn | undefined> => {
  try {
    const url = Endpoints.googleMaps.reverseGeocodeByCoordinate(coord);

    const r = await axios(url);
    console.log("r", r, r.data);
    const data = r.data.results[0];
    return { placeId: data.place_id, title: data.formatted_address };
  } catch (e) {
    console.log("e", e);
    return;
  }
};

type AddressData = {
  country?: { code: string; name: string };
  address?: string;
  city?: string;
  postalCode?: string;
  coordinate: Coordinate;
};

type GoogleAddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

const findGoogleAddressComponentByType = (
  addressComponents: GoogleAddressComponent[],
  type: GoogleAddressComponentType
): GoogleAddressComponent | undefined => {
  return addressComponents.find((component) => component.types.includes(type));
};

export const findAddressDataByCoordinate = async (
  coord: Coordinate
): Promise<AddressData | undefined> => {
  try {
    const url = Endpoints.googleMaps.reverseGeocodeByCoordinate(coord);
    const r = await axios(url);
    const data = r.data.results[0];
    const addressComponents = data.address_components;
    addressComponents.forEach((c: any) => console.log(c.types));
    const address = findGoogleAddressComponentByType(
      addressComponents,
      "route"
    )?.long_name;
    const addressNumber = findGoogleAddressComponentByType(
      addressComponents,
      "street_number"
    )?.long_name;
    const countryCode = findGoogleAddressComponentByType(
      addressComponents,
      "country"
    )?.short_name;
    const countryName = findGoogleAddressComponentByType(
      addressComponents,
      "country"
    )?.long_name;
    return {
      address:
        address && addressNumber ? `${address} ${addressNumber}` : undefined,
      city: findGoogleAddressComponentByType(
        addressComponents,
        "administrative_area_level_1"
      )?.long_name,
      postalCode: findGoogleAddressComponentByType(
        addressComponents,
        "postal_code"
      )?.long_name,
      country:
        countryCode && countryName
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
  } catch (e) {
    console.log("e", e);
    return;
  }
};

export const findAddressDataByPlaceId = async (
  placeId: string
): Promise<AddressData | undefined> => {
  try {
    const url = Endpoints.googleMaps.reverseGeocodeByPlaceId(placeId);
    const r = await axios(url);
    const data = r.data.results[0];
    const addressComponents = data.address_components;
    const address = findGoogleAddressComponentByType(
      addressComponents,
      "route"
    )?.long_name;
    const addressNumber = findGoogleAddressComponentByType(
      addressComponents,
      "street_number"
    )?.long_name;
    const countryCode = findGoogleAddressComponentByType(
      addressComponents,
      "country"
    )?.short_name;
    const countryName = findGoogleAddressComponentByType(
      addressComponents,
      "country"
    )?.long_name;
    return {
      address:
        address && addressNumber ? `${address} ${addressNumber}` : undefined,
      city: findGoogleAddressComponentByType(
        addressComponents,
        "administrative_area_level_1"
      )?.long_name,
      postalCode: findGoogleAddressComponentByType(
        addressComponents,
        "postal_code"
      )?.long_name,
      country:
        countryCode && countryName
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
  } catch (e) {
    console.log("e", e);
    return;
  }
};

export const findLocationsBySearchWord = async (
  input: string,
  type?: LocationSearchType
): Promise<FindPlaceReturn[] | undefined> => {
  try {
    const url = Endpoints.googleMaps.findPlacesBySearchword({
      input,
      types:
        type && ExternalApisConstants.queryParams.googleMaps.SEARCH_TYPE[type],
    });
    const r = await axios(url);
    const locations: FindPlaceReturn[] = r.data.predictions.map(
      (prediction: { description: string; place_id: string }) => ({
        title: prediction.description,
        placeId: prediction.place_id,
      })
    );
    return locations;
  } catch (e) {
    console.log(e);
    return;
  }
};
