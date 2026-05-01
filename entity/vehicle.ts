import { Vehicle as IVehicle, VehicleSizes, VehicleTypes } from "@/interface/vehicle"
import * as api from "@/entity/api"
import { User, UserDAO } from "./user"

export class Vehicle implements IVehicle {
    constructor(
        public id: number,
        public brand: string,
        public model: string,
        public color: string,
        public licensePlate: string,
        public manufactureYear: string,
        public type: VehicleTypes,
        public size: VehicleSizes,
        public user: User
    ) {}
}

export class VehicleDAO {
    static async get(id:number | string): Promise<Vehicle | undefined> {
        let res = await api.call(`vehicles/${id}`, true, {dataOnly:true}) as IVehicle
        
        if (res) {
            console.log("<OMEGA> from entity/vehicle.ts.")
            console.log(res)
            let user = await UserDAO.get(Number(res.userId))
            
            if (!user) return undefined //throw error instead of undefined?

            let obj = new Vehicle(
                res.id,
                res.brand,
                res.model,
                res.color,
                res.licensePlate,
                res.manufactureYear,
                res.type,
                res.size,
                user
            )

            console.log("<OMEGA> below here, this is the vehicle it created:")
            console.log(obj)

            return obj

        }

        return undefined
    }

    static register(obj:Vehicle) {
    }

    static list() {

    }

}