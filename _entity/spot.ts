// import { User as IUser } from "@/interface/user";
import { Spot as ISpot, OperatingHours } from "@/interface/spot";
import * as api from "@/entity/api";
// import { UserResponse } from "@/interface/api/user";
import { VehicleTypes } from "@/interface/vehicle";
import { Property } from "@/interface/property";
import { PropertyDAO } from "./property";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/api/useApi";

export class Spot implements ISpot {
  public id: number;
  public size: string;
  public status: string;
  public identifier: string;
  public isCovered: boolean;
  public approvalStatus: string;
  public allowedVehicles: VehicleTypes[];
  // public operatingHours: OperatingHours
  public isActive: boolean;
  public property?: Property;
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    //TODO insert Availability properties here, and check an efficient way of putting mass variables in a single way
  ) {
    this.id = data.id;
    this.size = data.size;
    this.status = data.status;
    this.identifier = data.identifier;
    this.isCovered = data.isCovered;
    this.approvalStatus = data.approvalStatus;
    this.allowedVehicles = data.allowedVehicles;
    this.isActive = data.isActive;
    this.property = data.property;
  }

  // public static create(data: ISpot): Spot;
  // public static create(data: ISpot, property?: Property): Spot {
  //   let spot: Spot | undefined;

  //   if (property) {
  //     spot = new Spot(
  //       data.id,
  //       data.size,
  //       data.status,
  //       data.identifier,
  //       data.isCovered,
  //       data.approvalStatus,
  //       data.allowedVehicles,
  //       // data.operatingHours,
  //       data.isActive,
  //       property,
  //     );
  //   } else {
  //     spot = new Spot(
  //       data.id,
  //       data.size,
  //       data.status,
  //       data.identifier,
  //       data.isCovered,
  //       data.approvalStatus,
  //       data.allowedVehicles,
  //       // data.operatingHours,
  //       data.isActive,
  //     );
  //   }

  //   return spot;
  // }
}

export class SpotDAO {
  static async get(id: number | string): Promise<Spot | undefined> {
    const res = (await api.call(`spots/${id}`, true, {
      dataOnly: true,
    })) as ISpot & { propertyId: number };

    if (res) {
      console.log("from entity/spot.ts.");
      console.log(res);

      const property = await PropertyDAO.get(res.propertyId);

      if (!property) return undefined;

      const spot = Spot.create(res, property);
      // const spot = new Spot(
      //   res.id,
      //   res.size,
      //   res.status,
      //   res.identifier,
      //   res.isCovered,
      //   res.approvalStatus,
      //   res.allowedVehicles,
      //   res.operatingHours,
      //   res.isActive,
      //   property,
      // );

      // let user = new User(
      //   res.id,
      //   res.email,
      //   res.password,
      //   res.lastLogin,
      //   res.isBlocked,
      //   res.isAdmin,
      //   res.permissionLevel,
      //   person, // convert to Person Object
      // );

      // console.log("below here, this is the user it created:");
      // console.log(user);

      return spot;
    }

    return undefined;
  }

  static async listFromProperty(
    id: number,
    withProperty?: boolean,
  ): Promise<Spot[]> {
    const res = (await api.call(`spots/properties/${id}/spots`, true, {
      dataOnly: true,
    })) as ISpot[] & { propertyId: number };

    const spots: Spot[] = [];
    if (!res) return spots;

    console.log("from entity/spot.ts.");
    console.log(res);
    let property: Property | undefined;

    if (withProperty) property = await PropertyDAO.get(res.propertyId);
    // error by api://properties/undefined may be lying around somewhere here
    // find fix if withProperty on true returns that error again

    // if (!property) return spots;

    for (const spot of res) {
      spots.push(Spot.create(spot, property));
    }

    return spots;
  }

  static register(obj: Spot) {}

  static list() {}
}

export function useFetchSpotsFromProperty({
  id,
}: {
  id: number;
}): [spots: Spot[] | undefined, loading: boolean] {
  const [data, dataLoading] = useApi({
    uri: `spots/properties/${id}/spots`,
    dataOnly: true,
    useToken: true,
    req: { method: "GET" },
  });

  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const instances = data.map((spot: any) => {
        spot.image = new Image(spot.imageUrl);

        return new Spot(spot);
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSpots(instances);
      setLoading(false);
    }
  }, [data]);

  return [spots, loading];
}
