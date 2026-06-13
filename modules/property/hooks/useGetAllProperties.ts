"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { User, Property } from "@classes";
import { BrowserService } from "@services";
import {
  PropertyController,
  UserController,
  VehicleController,
} from "@controllers";
import map from "../mapper/property.class.mapper";
// import { useRouter } from "next/navigation";

export default function useGetAllProperties(): [
  properties: Property[],
  loaded: boolean,
  refresh: CallableFunction,
] {
  const [properties, setProperties] = useState<Property[] | undefined>(
    undefined,
  );
  const [loaded, setLoaded] = useState<boolean>(false);

  async function loadData() {
    setLoaded(false);
    const data = await PropertyController.get(BrowserService.getToken(), {
      all: true,
    });
    const properties: Property[] = data.map(map);
    console.log(data);
    setProperties(properties);
    setLoaded(true);
  }

  // startTransition(loadUser);
  useEffect(() => {
    const load = () => {
      // console.log("loading user?");
      loadData();
    };
    load();
  }, []);

  const refresh = () => {
    // router.refresh();
    loadData();
    // console.log("refreshing user?");
    console.log(properties);
  };

  return [properties, loaded, refresh];
}
