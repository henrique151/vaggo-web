import Property from "./property";
import { VehicleTypes } from "./vehicle";

export class Spot {
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
}
