export class SearchResult {
  public origin: {
    latitude: string;
    longitude: string;
    query: string;
    source: string;
  };
  public results: {
    // property: Property;
    propertyId: number;
    spots: {
      id: number;
      identifier: string;
      covered: string;
      price: string;
      allowedVehicles: string[];
      status: string;
    }[];
    latitude: string;
    longitude: string;
    route: {
      duration: string;
      distance: string;
      durationNum: number;
      distanceMeters: number;
    };
  }[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    this.origin = {
      latitude: data.searchOrigin.lat,
      longitude: data.searchOrigin.lng,
      query: data.searchOrigin.query,
      source: data.searchOrigin.source,
    };

    // TODO convert to mapper
    for (const result of data.results) {
      console.log(result);

      const newResult = {
        propertyId: result.propertyId,
        spots: [],
        latitude: result.propertyLat,
        longitude: result.propertyLng,
        route: {
          duration: result.route.durationText,
          distance: result.route.distanceText,
          durationNum: result.route.durationMinutes,
          distanceMeters: result.route.distanceMeters,
        },
      };

      if (
        !this.results.find(
          (element) => element.propertyId == newResult.propertyId,
        )
      ) {
        this.results.push(newResult);
      }
    }

    // TODO POSSIBLY convert to mapper
    for (const property of this.results) {
      for (const result of data.results) {
        const spotObj = {
          id: result.spotId,
          identifier: result.identifier,
          covered: result.isCovered,
          price: result.price,
          allowedVehicles: result.allowedVehicles,
          status: result.currentStatus,
        };

        if (result.propertyId == property.propertyId) {
          property.spots.push(spotObj);
        }
      }
    }
  }
}
