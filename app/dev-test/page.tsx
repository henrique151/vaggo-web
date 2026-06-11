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
import { BrowserService, ReviewService } from "@services";
import { User } from "@classes";
import { FormUtils } from "@utils";

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
      console.log("reservations");
      console.log(reservations);
      console.log("reviews");
      console.log(reviews);
      console.log("reports");
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
      <button
        onClick={async () => {
          const data = FormUtils.toForm({
            rating: "4",
            comment: "sla nn achei muito bom nn",
          });

          const res = await ReviewController.edit(
            BrowserService.getToken(),
            data,
            1,
          );

          console.log(res);
        }}
      >
        Editar Avaliação
      </button>

      <button
        onClick={async () => {
          const data = FormUtils.toForm({
            rating: "4",
            comment: "sla nn achei muito bom nn",
          });

          const res = await ReviewController.deleteById(
            BrowserService.getToken(),
            1,
          );

          console.log(res);
        }}
      >
        Deletar Avaliação
      </button>
    </>
  );
}
