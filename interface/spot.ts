import Property from "@/entity/property";
import { VehicleTypes } from "./vehicle";

export interface Spot {
  id: number;
  size: string;
  status: string;
  identifier: string;
  isCovered: boolean;
  approvalStatus: string;
  allowedVehicles: VehicleTypes[];
  // operatingHours: OperatingHours;
  isActive: boolean;
  propertyId?: number;
  property?: Property;
}

export interface OperatingHours {
  segunda_a_sexta?: OperatingPeriod;
  sabado?: OperatingPeriod;
  domingo?: OperatingPeriod;
}

export interface OperatingPeriod {
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

export interface SpotAvailability {
  id: number;
  spotId?: number;
  weekdays: number; //TODO check with back-end dev with this one
  startDate: string; //merge into one object
  endDate: string; //merge into one object
  startTime: string; //merge into one object
  endTime: string; //merge into one object
  VAG_INT_ID?: number;
}
