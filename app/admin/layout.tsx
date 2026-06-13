"use client";
// import { PageContext } from "../(app)/user/account/page.context";

import { UserController } from "@controllers";
import PageContextProvider, { Context } from "./_context/page.context";
import { BrowserService } from "@services";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Header from "@/component/header";

// security check once if user is admin
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function checkAdmin() {
    const user = await UserController.get(BrowserService.getToken());
    const isAdmin =
      user.permissionLevel === "3"
        ? true
        : user.permissionLevel === "2"
          ? true
          : false;
    if (!isAdmin) {
      redirect("/user/dashboard");
    } else {
      console.log("you're admin!");
    }
  }

  useEffect(() => {
    checkAdmin();
  }, []);
  return (
    <>
      <Header />
      <PageContextProvider>{children}</PageContextProvider>
    </>
  );
}
