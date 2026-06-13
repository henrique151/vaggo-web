"use client";

// import useGetAllProperties from "@/modules/property/hooks/useGetAllProperties";
// import useGetAllUsers from "@/modules/user/hooks/useGetAllUsers";
// import useGetAllVehicles from "@/modules/vehicle/hooks/useGetAllVehicles";
import useGenericDataFetch from "@/hooks/useGenericDataFetch";
import { createContext, useContext } from "react";
import { Property, ReportData, Review, User, Vehicle } from "@classes";
import {
  PropertyController,
  ReportController,
  ReservationController,
  ReviewController,
  UserController,
  VehicleController,
} from "@controllers";
import { BrowserService } from "@services";
import reportMapper from "@/modules/report/mappers/report.class.mapper";
import userMapper from "@/modules/user/mappers/user.class.mapper";
import { map as vehicleMapper } from "@/modules/vehicle/mappers/vehicle.class.mapper";
import propertyMapper from "@/modules/property/mapper/property.class.mapper";
import reservationMapper from "@/modules/reservation/mappers/reservation.class.mapper";
import reviewMapper from "@/modules/review/mappers/review.class.mapper";

export const Context = createContext<any>({
  users: undefined,
  refreshUsers: () => {},
  vehicles: undefined,
  refreshVehicles: () => {},
  properties: undefined,
  refreshProperties: () => {},
});

export const usePageContext = () => useContext(Context);

export default function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [users, loadedUsers, refreshUsers] = useGetAllUsers();
  const [users, loadedUsers, refreshUsers] = useGenericDataFetch<User>(
    async () => {
      return await UserController.get(BrowserService.getToken(), true);
    },
    userMapper,
  );
  // const [vehicles, loadedVehicles, refreshVehicles] = useGetAllVehicles();
  const [vehicles, loadedVehicles, refreshVehicles] =
    useGenericDataFetch<Vehicle>(async () => {
      return await VehicleController.get(BrowserService.getToken(), true);
    }, vehicleMapper);

  const [properties, loadedProperties, refreshProperties] =
    useGenericDataFetch<Property>(async () => {
      return await PropertyController.get(BrowserService.getToken(), {
        all: true,
      });
    }, propertyMapper);

  const [reports, loadedReports, refreshReports] =
    useGenericDataFetch<ReportData>(async () => {
      return await ReportController.get(BrowserService.getToken(), true);
    }, reportMapper);

  const [reservations, loadedReservations, refreshReservations] =
    useGenericDataFetch<ReportData>(async () => {
      return await ReservationController.getAll(BrowserService.getToken());
    }, reservationMapper);

  const [reviews, loadedReviews, refreshReviews] = useGenericDataFetch<Review>(
    async () => {
      return await ReviewController.getAll(BrowserService.getToken());
    },
    reviewMapper,
  );

  return (
    <>
      <Context.Provider
        value={{
          users,
          refreshUsers,

          vehicles,
          refreshVehicles,

          properties,
          refreshProperties,

          reports,
          refreshReports,

          reservations,
          refreshReservations,

          reviews,
          refreshReviews,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}
