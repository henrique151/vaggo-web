import { Image } from "./data/Image";

export class SearchResult {
  public origin: {
    latitude: string;
    longitude: string;
    query: string;
    source: string;
  };
  public results: {
    // property: Property;
    property: {
      id: number;
      name: string;
      image: Image;
      owner: {
        id: number;
        name: string;
        phone: string;
        avatar: Image;
      };
    };
    // spots: {
    //   id: number;
    //   identifier: string;
    //   covered: string;
    //   price: string;
    //   allowedVehicles: string[];
    //   status: string;
    // }[];
    spot: {
      id: number;
      price: string;
      size: string;
      allowedVehicles: string[];
      status: string;
    };
    // latitude: string;
    // longitude: string;
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
    for (const result of data.data) {
      console.log(result);

      const newResult = {
        property: {
          id: result.property.id,
          name: result.property.name,
          image: new Image(result.property.image),
          owner: {
            id: result.owner.id,
            name: result.owner.name,
            phone: result.owner.phone,
            avatar: new Image(result.owner.avatarUrl),
          },
        },
        spot: {
          id: result.spot.id,
          price: result.spot.price,
          size: result.spot.size,
          allowedVehicles: result.spot.allowedVehicles,
          status: result.spot.currentStatus,
        },
        // latitude: result.propertyLat,
        // longitude: result.propertyLng,
        route: {
          duration: result.route?.durationText ?? "N/A",
          distance: result.route?.distanceText ?? "N/A",
          durationNum: result.route?.durationMinutes ?? 0,
          distanceMeters: result.route?.distanceMeters ?? 0,
        },
      };

      this.results.push(newResult);

      // const newResult = {
      //   propertyId: result.propertyId,
      //   spots: [],
      //   latitude: result.propertyLat,
      //   longitude: result.propertyLng,
      //   route: {
      //     duration: result.route.durationText,
      //     distance: result.route.distanceText,
      //     durationNum: result.route.durationMinutes,
      //     distanceMeters: result.route.distanceMeters,
      //   },
      // };

      // if (
      //   !this.results.find(
      //     (element) => element.propertyId == newResult.propertyId,
      //   )
      // ) {
      //   this.results.push(newResult);
      // }
    }

    // TODO POSSIBLY convert to mapper
    // for (const property of this.results) {
    //   for (const result of data.results) {
    //     const spotObj = {
    //       id: result.spotId,
    //       identifier: result.identifier,
    //       covered: result.isCovered,
    //       price: result.price,
    //       allowedVehicles: result.allowedVehicles,
    //       status: result.currentStatus,
    //     };

    //     if (result.propertyId == property.propertyId) {
    //       property.spots.push(spotObj);
    //     }
    //   }
    // }
  }
}
