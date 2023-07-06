export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type FindPlaceReturn = {
  title: string;
  placeId: string;
};

export type LocationSearchType = "cities" | "regions" | "address";
