"use client";

import PageContextProvider from "./page.provider";
import PageComponent from "./page.component";
// import { connection } from "next/server";

export default function Page() {
  // await connection();
  return (
    <PageContextProvider>
      <PageComponent />
    </PageContextProvider>
  );
}
