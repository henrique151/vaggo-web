"use client";
import { useGetUserById } from "@/hooks/api/user/useGetUserById";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
import { getToken } from "@/services/user.service";
import { useState } from "react";
import { PageContext } from "./page.context";
import useGetMyReports from "@/hooks/api/report/useGetMyReports";

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

  console.log("from context page");
  // console.log(user);
  console.log(reports);

  const provider = { token, user, vehicles, reports };
  return (
    <>
      <PageContext.Provider value={provider}>{children}</PageContext.Provider>
    </>
  );
}
