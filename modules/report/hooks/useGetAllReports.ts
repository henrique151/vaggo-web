"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { User, Property, ReportData } from "@classes";
import { BrowserService } from "@services";
import {
  PropertyController,
  ReportController,
  UserController,
  VehicleController,
} from "@controllers";
import map from "../mappers/report.class.mapper";
// import { useRouter } from "next/navigation";

export default function useGetAllReports(): [
  properties: ReportData[],
  loaded: boolean,
  refresh: CallableFunction,
] {
  const [reports, setReports] = useState<ReportData[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  async function loadData() {
    setLoaded(false);
    const data = await ReportController.get(BrowserService.getToken(), true);
    const reports: ReportData[] = data.map(map);
    console.log(data);
    setReports(reports);
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
    console.log(reports);
  };

  return [reports, loaded, refresh];
}
