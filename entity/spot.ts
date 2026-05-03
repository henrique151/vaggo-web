// import { User as IUser } from "@/interface/user";
import { Spot as ISpot, OperatingHours } from "@/interface/spot";
import * as api from "@/entity/api";
// import { UserResponse } from "@/interface/api/user";
import { VehicleTypes } from "@/interface/vehicle";

export class Spot implements ISpot {
  constructor(
    public id: number,
    public size: string,
    public status: string,
    public identifier: string,
    public isCovered: boolean,
    public approvalStatus: string,
    public allowedVehicles: VehicleTypes[],
    public operatingHours: OperatingHours,
    public isActive: boolean,
    public propertyId: number,
  ) {}
}

export class SpotDAO {
  static async get(id: number | string): Promise<Spot | undefined> {
    const res = (await api.call(`spots/${id}`, true, {
      dataOnly: true,
    })) as ISpot;

    if (res) {
      console.log("from entity/spot.ts.");
      console.log(res);

      const spot = new Spot(
        res.id,
        res.size,
        res.status,
        res.identifier,
        res.isCovered,
        res.approvalStatus,
        res.allowedVehicles,
        res.operatingHours,
        res.isActive,
        res.propertyId,
      );

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

  static register(obj: Spot) {}

  static list() {}
}
