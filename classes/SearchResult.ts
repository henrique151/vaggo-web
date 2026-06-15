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
    // Proteção: se o backend não encontrou o endereço, searchOrigin vem undefined
    if (!data || !data.searchOrigin) {
      this.origin = { latitude: "", longitude: "", query: "", source: "" };
      this.results = [];
      return;
    }

    this.origin = {
      latitude: data.searchOrigin?.lat ?? data.searchOrigin?.latitude ?? "",
      longitude: data.searchOrigin?.lng ?? data.searchOrigin?.longitude ?? "",
      query: data.searchOrigin?.query ?? "",
      source: data.searchOrigin?.source ?? "",
    };

    // TODO convert to mapper
    const dataArray = Array.isArray(data.data) ? data.data : [];
    for (const result of dataArray) {
      console.log(result);

      try {
        const newResult = {
          property: {
            id: result.property?.id,
            name: result.property?.name,
            image: new Image(result.property?.image),
            owner: {
              id: result.owner?.id,
              name: result.owner?.name,
              phone: result.owner?.phone,
              avatar: new Image(result.owner?.avatarUrl),
            },
          },
          spot: {
            id: result.spot?.id,
            price: result.spot?.price,
            size: result.spot?.size,
            allowedVehicles: result.spot?.allowedVehicles,
            status: result.spot?.currentStatus,
          },
          route: {
            duration: result.route?.durationText ?? "N/A",
            distance: result.route?.distanceText ?? "N/A",
            durationNum: result.route?.durationMinutes ?? 0,
            distanceMeters: result.route?.distanceMeters ?? 0,
          },
        };

        this.results.push(newResult);
      } catch (err) {
        console.warn("[SearchResult] Erro ao mapear resultado:", err, result);
      }
    }
  }
}
