"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { User, Property as T } from "@classes";
import { BrowserService } from "@services";
import {
  PropertyController,
  UserController,
  VehicleController,
} from "@controllers";
// import map from "../mapper/property.class.mapper";
// import { useRouter } from "next/navigation";

export default function useGenericDataFetch<T>(
  loadFunction: () => Promise<any>,
  mapper: (d: any) => any,
): [data: T, loaded: boolean, refresh: CallableFunction] {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  async function loadData() {
    setLoaded(false);
    const data = await loadFunction();
    const mappedData: T = Array.isArray(data) ? data.map(mapper) : mapper(data);

    console.log(data);
    setData(mappedData);
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
    console.log(data);
  };

  return [data, loaded, refresh];
}
