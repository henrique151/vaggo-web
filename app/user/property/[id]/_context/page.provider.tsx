"use client";
import { useGetUserById } from "@/hooks/api/user/useGetUserById";
import { useGetMyVehicles } from "@/hooks/api/vehicles/useGetMyrVehicles";
import { getToken } from "@/services/user.service";
import { useState } from "react";
import { PageContext } from "./page.context";
import useGetMyReports from "@/hooks/api/report/useGetMyReports";
import { useGetMyProperties } from "@/hooks/api/property/useGetMyProperties";
import { Image } from "@/classes/data/Image";

export default function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getToken();
  const [activeTab, setActiveTab] = useState("Perfil");
  const [isEditing, setIsEditing] = useState(false);
  const [user] = [{}];
  const [vehicles] = [{}];
  const [reports] = [{}];
  const [property] = [
    {
      name: "Residência de tal",
      description: "Descrição da residência aq",
      isActive: true,
      images: [new Image("https://google.com")],
      totalCapacity: 67,
    },
  ];

  console.log("from context page");
  // console.log(user);
  // console.log(reports);
  console.log(property);

  const provider = { token, user, vehicles, reports, property };
  return (
    <>
      <PageContext.Provider value={provider}>{children}</PageContext.Provider>
    </>
  );
}
