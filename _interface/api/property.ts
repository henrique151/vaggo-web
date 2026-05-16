import { DataResponse } from "./api";
import { Address } from "./location";

export interface PropertyResponse extends DataResponse {
    id: number
    name: string
    type: string // e.g. "Residencial"
    description: string
    isActive: boolean
    totalCapacity: number
    addressId: number
    zipCode: string
    address: Address
}