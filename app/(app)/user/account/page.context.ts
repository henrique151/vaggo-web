"use client";
import AccessToken from "@/classes/AccessToken";
import { Property, User, Vehicle } from "@classes";
import { Report } from "@/classes/Report";
// import { User } from "@classes";
// import { Vehicle } from "@/classes/vehicle";
import { createContext, useContext } from "react";

type PageContextProps = {
  token: AccessToken | undefined;
  user: User | undefined;
  refreshUser: CallableFunction | undefined;
  vehicles: Vehicle[] | undefined;
  reports: Report[] | undefined;
  properties: Property[] | undefined;
  refresh: () => void;
};

export const PageContext = createContext<any>({
  token: undefined,
  user: undefined,
  refreshUser: undefined,
  vehicles: undefined,
  reports: undefined,
  properties: undefined,
  refresh: undefined,
});

export const usePageContext = () => useContext(PageContext);
