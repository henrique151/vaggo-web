"use client";
import { useGetUserById } from "@/hooks/api/user/useGetUserById";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
import { getToken } from "@/services/user.service";
import { useState } from "react";
import { PageContext } from "./page.context";
import useGetMyReports from "@/hooks/api/report/useGetMyReports";
import { useGetMyProperties } from "@/hooks/api/property/useGetMyProperties";

export default function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getToken();
  const [activeTab, setActiveTab] = useState("Perfil");
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useGetUserById({
    id: token?.id || 1,
  });
  const [vehicles] = useGetMyVehicles();
  const [reports] = useGetMyReports();
  const [properties] = useGetMyProperties();

  console.log("from context page");
  // console.log(user);
  // console.log(reports);
  console.log(properties);

  const provider = { token, user, vehicles, reports, properties };
  return (
    <>
      <PageContext.Provider value={provider}>{children}</PageContext.Provider>
    </>
  );
}
