"use client";

import { useEffect } from "react";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";

import {
  UserController,
  VehicleController,
  PropertyController,
  ReservationController,
  ReviewController,
  ReportController,
} from "@controllers";
import { BrowserService } from "@services";
import { User } from "@classes";

export default function Page() {
  const [propertyHook, loaded, refresh] = useGetPropertyDetails(1, true);

  useEffect(() => {
    const token = BrowserService.getToken();
    const load = async () => {
      const user = await UserController.get(token);
      const vehicle = await VehicleController.get(token);
      const property = await PropertyController.get(token);
      const spots = await PropertyController.getSpots(token, 1);
      const reservations = await ReservationController.get(token);
      const reviews = await ReviewController.get(token);
      const reports = await ReportController.get(token);

      const obj = new User(user);
      console.log(obj);
      console.log(vehicle);
      console.log(property);
      console.log(spots);
      console.log(reservations);
      console.log(reviews);
      console.log(reports);
    };
    load();
  }, []);

  useEffect(() => {
    console.log(propertyHook);
    // refresh();
  }, [propertyHook]);

  return (
    <>
      <div>{propertyHook?.info?.name ?? "something"}</div>
    </>
  );
}
