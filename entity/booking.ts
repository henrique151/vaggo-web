/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePeriod } from "@/interface/entity";
import { Spot } from "./spot";
import { User, UserDAO } from "./user";
import { Vehicle } from "./vehicle";
import * as api from "@/app/api";

export class Booking {
  id: number;
  spot: Spot;
  vehicle: object;
  user?: User;
  datePeriod: DatePeriod;
  status: string;
  code: string;

  constructor(data: any) {
    this.id = data.id;
    this.datePeriod = data.datePeriod;
    this.status = data.status;
    this.code = data.code;
    this.spot = data.spot;
    this.vehicle = data.vehicle;
    this.user = data.user;
  }

  // isActive(): boolean {
  //   const now = new Date();
  //   return now >= this.startDate && now <= this.endDate;
  // }

  // getFormattedPrice(): string {
  //   return `$${parseFloat(this.spot.price).toFixed(2)}`;
  // }
}

export class BookingDAO {
  public static async reserve(
    spotId: number,
    vehicleId: number,
    datePeriod: DatePeriod,
  ): Promise<any | undefined> {
    const query = {
      spotId: spotId,
      vehicleId: vehicleId,
      // startDate: `${datePeriod.start.getFullYear()}-${datePeriod.start.getMonth()}-${datePeriod.start.getDay()}`,
      startDate: `2026-01-01`,
      endDate: `2026-12-31`,
      // endDate: `${datePeriod.end.getFullYear()}-${datePeriod.end.getMonth()}-${datePeriod.end.getDay()}`,
    };

    console.log(query);
    // const res = await api.call("reservations", true, {
    //   body: query,
    //   method: "POST",
    //   dataOnly: true,
    //   contentType: "json",
    //   header: {
    //     mode: "no-cors",
    //   },
    // });

    const res = await fetch("http://localhost:3000/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(query),
      method: "POST",
      // mode: "no-cors",
    });

    if (res.ok) {
      const data = await res.json();

      return data;
    }
  }

  public static async list(): Promise<Booking[] | undefined> {
    type apiResponse = {
      success: boolean;
      total: number;
      data: [
        {
          id: number;
          spotId: number;
          vehicleId: number;
          userId: number;
          startDate: string;
          endDate: string;
          status: string;
          code: string;
          VAG_INT_ID: number;
          VEI_INT_ID: number;
          USU_INT_ID: number;
          spot: {
            id: number;
            identifier: string;
            price: string;
            propertyId: number;
            property: {
              id: number;
              name: string;
            };
          };
          vehicle: {
            id: number;
            brand: string;
            model: string;
            licensePlate: string;
          };
        },
      ];
    };
    const bookings: Booking[] = [];

    const res = await fetch("http://localhost:3000/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      const apiData = (await res.json()) as apiResponse[];

      console.log(apiData);

      for (const data of apiData.data) {
        const vehicle = data.vehicle;
        const spot = data.spot;
        const datePeriod = new DatePeriod(
          new Date(data.startDate),
          new Date(data.endDate),
        );

        const bookingData = {
          id: data.id,
          spot: spot,
          vehicle: vehicle,
          datePeriod: datePeriod,
          status: data.status,
          code: data.code,
        };

        const booking = new Booking(bookingData);
        bookings.push(booking);
      }

      return bookings;
    }
  }

  public static async listSolicitations(): Promise<Booking[] | undefined> {
    type apiResponse = {
      success: boolean;
      total: number;
      data: [
        {
          id: number;
          spotId: number;
          vehicleId: number;
          userId: number;
          startDate: string;
          endDate: string;
          status: string;
          code: string;
          VAG_INT_ID: number;
          VEI_INT_ID: number;
          USU_INT_ID: number;
          spot: {
            id: number;
            identifier: string;
            price: string;
            propertyId: number;
            property: {
              id: number;
              name: string;
            };
          };
          user: {
            id: number;
            email: string;
          };
          vehicle: {
            id: number;
            brand: string;
            model: string;
            licensePlate: string;
          };
        },
      ];
    };
    const bookings: Booking[] = [];

    const res = await fetch("http://localhost:3000/reservations/owner", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      const apiData = (await res.json()) as apiResponse[];

      console.log(apiData);

      for (const data of apiData.data) {
        const user = await UserDAO.get(data.user.id);
        const vehicle = data.vehicle;
        const spot = data.spot;
        const datePeriod = new DatePeriod(
          new Date(data.startDate),
          new Date(data.endDate),
        );

        const bookingData = {
          id: data.id,
          spot: spot,
          vehicle: vehicle,
          user: user,
          datePeriod: datePeriod,
          status: data.status,
          code: data.code,
        };

        const booking = new Booking(bookingData);
        bookings.push(booking);
      }

      return bookings;
    }
  }
}
