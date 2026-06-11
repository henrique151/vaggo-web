"use client";
import { useGetUserById } from "@/hooks/api/user/useGetUserById";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
import { getToken } from "@/services/user.service";
import { startTransition, useEffect, useMemo, useState } from "react";
import { PageContext } from "./page.context";
import useGetMyReports from "@/hooks/api/report/useGetMyReports";
import { useGetMyProperties } from "@/hooks/api/property/useGetMyProperties";
import useGetVehicleDetails from "@/modules/vehicle/hooks/useGetVehicleDetails";
import useGetUserDetails from "@/modules/user/hooks/useGetUserDetails";
import { BrowserService } from "@services";
import useGetPropertyDetails from "@/modules/property/hooks/useGetPropertyDetails";
import Router, { useRouter } from "next/navigation";

export default function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = BrowserService.getToken();
  const [activeTab, setActiveTab] = useState("Perfil");
  const [isEditing, setIsEditing] = useState(false);
  // const [user] = useGetUserById({
  //   id: token?.id || 1,
  // });
  const [user, loaded, refreshUser] = useGetUserDetails();
  const [vehicles] = useGetVehicleDetails();
  const [reports] = useGetMyReports();
  const [properties] = useGetPropertyDetails();
  const router = useRouter();

  // console.log("from context page");
  // console.log(user);
  // console.log(reports);
  // console.log(properties);

  // const refreshUser = () => {
  //   console.log("page reloaded?");
  //   router.refresh();
  // };
  // const provider = {
  //   token,
  //   user,
  //   vehicles,
  //   reports,
  //   properties,
  //   refreshUser,
  // };

  // useEffect(() => {
  // setProvider({ token, user, vehicles, reports, properties, refreshUser });
  // router.refresh();
  // }, []);

  return (
    <>
      <PageContext.Provider
        value={{
          token: token,
          user: user,
          vehicles: vehicles,
          reports: reports,
          properties: properties,
          refreshUser: refreshUser,
          refresh: () => {
            console.log("refreshing?");
            // Router
            router.refresh();
          },
        }}
      >
        {children}
      </PageContext.Provider>
    </>
  );
}
