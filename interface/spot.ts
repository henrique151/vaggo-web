import { VehicleTypes } from "./vehicle";

export interface Spot {
  id: number;
  size: string;
  status: string;
  identifier: string;
  isCovered: boolean;
  approvalStatus: string;
  allowedVehicles: VehicleTypes[];
  operatingHours: OperatingHours;
  isActive: boolean;
  propertyId: number;
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
