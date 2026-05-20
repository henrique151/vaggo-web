import { DataResponse } from "./api";
import { VehicleTypes } from "./vehicle";

export interface ParkingSpotResponse extends DataResponse {
    id: number
    size: string
    status: string
    identifier: string
    isCovered: boolean
    approvalStatus: string
    allowedVehicles: VehicleTypes[]
    operatingHours: OperatingHours
    isActive: boolean
    propertyId: number
}

interface OperatingHours {
    segunda_a_sexta?: OperatingPeriod
    sabado?: OperatingPeriod
    domingo?: OperatingPeriod
}

interface OperatingPeriod {
    start: string // "HH:MM"
    end: string   // "HH:MM"
}


