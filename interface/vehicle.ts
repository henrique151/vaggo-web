import { User } from "@/entity/user"

export interface Vehicle {
    id: number
    brand: string
    model: string
    color: string
    licensePlate: string
    manufactureYear: string // ISO date string (e.g. "2023-01-01")
    type: VehicleTypes
    size: VehicleSizes,
    user: User
    userId?: number
}

export type VehicleTypes = "CARRO" | "MOTO"
export type VehicleSizes = "PEQUENO" | "MEDIO" | "GRANDE"


// OLD
// export interface VehicleResponse extends DataResponse {
//     brand: string,
//     model: string,
//     color: string,
//     licensePlate: string,
//     manufactureYear: string,
//     isActive: boolean,
//     userId?: number,
//     USU_INT_ID?: number,
// }
