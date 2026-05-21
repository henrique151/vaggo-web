"use client";
import AccessToken from "@/classes/AccessToken";
import User from "@/classes/user";
import { Vehicle } from "@/classes/vehicle";
import { createContext, useContext } from "react";

type PageContextProps = {
  token: AccessToken | undefined;
  user: User | undefined;
  vehicles: Vehicle[] | undefined;
};

export const PageContext = createContext<PageContextProps>({
  token: undefined,
  user: undefined,
  vehicles: undefined,
});

export const usePageContext = () => useContext(PageContext);
